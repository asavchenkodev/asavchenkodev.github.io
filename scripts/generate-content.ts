import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import type { Dirent } from "node:fs";
import path from "node:path";
import { unified } from "unified";
import uniorgParse from "uniorg-parse";
import uniorgRehype from "uniorg-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import type {
  ContentEntry,
  DashboardConfig,
  ContentHeading,
  ContentKind,
  ContentManifest,
  ContentMetadata,
  SearchDocument,
} from "../shared/content";
import {
  isDraftMetadata,
  parseMarkdownDocument,
  parseOrgMetadata,
} from "./content-metadata";
import rehypeHighlight from "./rehype-highlight";
import { writeFeeds } from "./feeds";

const projectRoot = process.cwd();
const contentRoot = path.join(projectRoot, "content");
const publicRoot = path.join(projectRoot, "public");
const publicContentRoot = path.join(publicRoot, "content");
const toolsRoot = path.join(projectRoot, "tools");
const publicToolsRoot = path.join(publicRoot, "tools");

const entries: Record<string, ContentEntry> = {};
const searchDocuments: SearchDocument[] = [];

const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);
const codeExtensions = new Set([
  ".c", ".cc", ".cpp", ".css", ".go", ".h", ".hpp", ".html", ".java", ".js", ".json",
  ".jsx", ".py", ".rb", ".rs", ".sh", ".sql", ".toml", ".ts", ".tsx", ".xml", ".yaml", ".yml",
]);
const textExtensions = new Set([".csv", ".log", ".txt"]);

function normalizeVirtualPath(relativePath: string): string {
  const normalized = relativePath.split(path.sep).filter(Boolean).join("/");
  return normalized ? `/${normalized}` : "/";
}

function publicUrl(relativePath: string): string {
  return `/content/${relativePath.split(path.sep).map(encodeURIComponent).join("/")}`;
}

function parentPath(virtualPath: string): string | undefined {
  if (virtualPath === "/") return undefined;
  const parent = path.posix.dirname(virtualPath);
  return parent === "." ? "/" : parent;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/&[a-z]+;/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";
}

function uniqueHeadings(headings: Omit<ContentHeading, "id">[]): ContentHeading[] {
  const used = new Map<string, number>();
  return headings.map((heading) => {
    const base = slugify(heading.text);
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    return { ...heading, id: count === 0 ? base : `${base}-${count + 1}` };
  });
}

function cleanInlineMarkup(value: string): string {
  return value
    .replace(/\[\[[^\]]+\]\[([^\]]+)\]\]/g, "$1")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/[`*_~=]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanBodyText(value: string): string {
  return cleanInlineMarkup(
    value
      .replace(/^---[\s\S]*?---\s*/m, "")
      .replace(/^#\+[A-Z_]+:.*$/gim, "")
      .replace(/^\*+\s+/gm, "")
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/^[-+]\s+/gm, "")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1"),
  );
}

/** The opening prose paragraph, used as a listing description when a file sets none. */
function leadParagraph(source: string): string | undefined {
  const blocks = source
    .replace(/^---[\s\S]*?---\s*/, "")
    .replace(/^#\+[A-Z_]+:.*$/gim, "")
    .split(/\n\s*\n/)
    .map((block) => block.trim());
  const lead = blocks.find((block) => block && !/^(\*|#|[-+]\s|\||```|<)/.test(block));
  if (!lead) return undefined;
  const text = cleanInlineMarkup(lead);
  return text.length > 200 ? `${text.slice(0, 199).trimEnd()}…` : text;
}

function withoutFencedCode(source: string): string {
  return source.replace(/^(```|~~~)[^\n]*\n[\s\S]*?^\1\s*$/gm, "");
}

function markdownHeadings(source: string): ContentHeading[] {
  const headings: Omit<ContentHeading, "id">[] = [];
  for (const match of withoutFencedCode(source).matchAll(/^(#{1,6})\s+(.+?)\s*#*$/gm)) {
    headings.push({ depth: match[1].length, text: cleanInlineMarkup(match[2]) });
  }
  return uniqueHeadings(headings);
}

function orgHeadings(source: string): ContentHeading[] {
  const headings: Omit<ContentHeading, "id">[] = [];
  for (const match of source.matchAll(/^(\*+)\s+(.+)$/gm)) {
    headings.push({ depth: match[1].length, text: cleanInlineMarkup(match[2]) });
  }
  return uniqueHeadings(headings);
}

function resolveDashboardPath(currentPath: string, href: string): string | null {
  if (/^(https?:|mailto:|tel:)/i.test(href)) return null;
  const clean = href.replace(/^file:/i, "").split(/[?#]/, 1)[0].trim();
  if (!clean) return null;
  const resolved = clean.startsWith("/")
    ? path.posix.normalize(clean)
    : path.posix.resolve(path.posix.dirname(currentPath), clean);
  return resolved.startsWith("/") ? resolved : `/${resolved}`;
}

function parseOrgDashboard(
  source: string,
  virtualPath: string,
): { dashboard?: DashboardConfig; introSource: string; afterSource: string } {
  const lines = source.split(/\r?\n/);
  const headingIndex = lines.findIndex((line) => /^(\*+)\s+(.+?)\s+:dashboard:\s*$/i.test(line));
  if (headingIndex < 0) return { introSource: source, afterSource: "" };

  const heading = lines[headingIndex].match(/^(\*+)\s+(.+?)\s+:dashboard:\s*$/i);
  if (!heading) return { introSource: source, afterSource: "" };
  const headingDepth = heading[1].length;
  let endIndex = lines.length;
  for (let index = headingIndex + 1; index < lines.length; index += 1) {
    const nextHeading = lines[index].match(/^(\*+)\s+/);
    if (nextHeading && nextHeading[1].length <= headingDepth) {
      endIndex = index;
      break;
    }
  }

  const items: DashboardConfig["items"] = [];
  const indentLevels: number[] = [];
  for (const line of lines.slice(headingIndex + 1, endIndex)) {
    const item = line.match(/^(\s*)[-+]\s+\[\[([^\]]+)\]\[([^\]]+)\]\](?:\s+::\s*(.*?))?\s*$/);
    if (!item) continue;
    const itemPath = resolveDashboardPath(virtualPath, item[2]);
    if (!itemPath) continue;
    const indent = item[1].replace(/\t/g, "  ").length;
    if (indentLevels.length === 0 || indent < indentLevels[0]) {
      indentLevels.splice(0, indentLevels.length, indent);
    } else {
      while (indentLevels.length > 1 && indent < indentLevels.at(-1)!) indentLevels.pop();
      if (indent > indentLevels.at(-1)!) indentLevels.push(indent);
    }
    items.push({
      path: itemPath,
      label: cleanInlineMarkup(item[3]),
      description: item[4]?.trim() || undefined,
      depth: indentLevels.length - 1,
    });
  }

  return {
    dashboard: {
      command: cleanInlineMarkup(heading[2]),
      items,
    },
    introSource: lines.slice(0, headingIndex).join("\n").trimEnd(),
    afterSource: lines.slice(endIndex).join("\n").trim(),
  };
}

function withHeadingIds(html: string, headings: ContentHeading[]): string {
  let index = 0;
  return html.replace(/<h([1-6])(?:\s[^>]*)?>([\s\S]*?)<\/h\1>/g, (match, level, body) => {
    const heading = headings[index++];
    return heading ? `<h${level} id="${heading.id}">${body}</h${level}>` : match;
  });
}

async function renderOrg(source: string, headings: ContentHeading[]): Promise<string> {
  const result = await unified()
    .use(uniorgParse)
    .use(uniorgRehype, { useSections: true })
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(source);
  return withHeadingIds(String(result), headings);
}

// Relative image paths in Markdown point next to the file, which is published under /content.
function resolveMarkdownImages(html: string, virtualPath: string): string {
  const directory = path.posix.dirname(virtualPath);
  return html.replace(/<img\b([^>]*?)\bsrc="([^"]+)"/g, (_match, before: string, src: string) => {
    const resolved = /^(?:[a-z]+:|\/|#)/i.test(src)
      ? src
      : `/content${new URL(src, `https://content.local${directory === "/" ? "" : directory}/`).pathname}`;
    return `<img loading="lazy"${before} src="${resolved}"`;
  });
}

async function renderMarkdown(source: string, headings: ContentHeading[], virtualPath: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(source);
  return resolveMarkdownImages(withHeadingIds(String(result), headings), virtualPath);
}

function fileKind(extension: string): ContentKind {
  if (extension === ".org") return "org";
  if (extension === ".md" || extension === ".markdown") return "markdown";
  if (extension === ".pdf") return "pdf";
  if (imageExtensions.has(extension)) return "image";
  if (codeExtensions.has(extension)) return "code";
  if (textExtensions.has(extension) || extension === "") return "text";
  return "binary";
}

function defaultTitle(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function searchSections(source: string, headings: ContentHeading[], kind: ContentKind): string[] {
  const marker = kind === "org" ? /^(\*+)\s+(.+)$/gm : /^(#{1,6})\s+(.+?)\s*#*$/gm;
  const matches = [...source.matchAll(marker)];
  return headings.map((_, index) => {
    const start = matches[index]?.index ?? 0;
    const end = matches[index + 1]?.index ?? source.length;
    return cleanBodyText(source.slice(start, end)).slice(0, 900);
  });
}

async function pdfPageAspect(filePath: string): Promise<number | undefined> {
  const source = (await readFile(filePath)).toString("latin1");
  const mediaBox = source.match(
    /\/MediaBox\s*\[\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s*\]/,
  );
  if (!mediaBox) return undefined;
  const width = Math.abs(Number(mediaBox[3]) - Number(mediaBox[1]));
  const height = Math.abs(Number(mediaBox[4]) - Number(mediaBox[2]));
  if (!width || !height) return undefined;
  const rotation = Number(source.match(/\/Rotate\s+(\d+)/)?.[1] ?? 0) % 180;
  const aspect = rotation === 90 ? width / height : height / width;
  return aspect >= 0.5 && aspect <= 3 ? Number(aspect.toFixed(4)) : undefined;
}

function pdfPageCount(source: string): number | undefined {
  const counts = [
    ...source.matchAll(/\/Type\s*\/Pages\b[^>]{0,300}?\/Count\s+(\d+)/g),
    ...source.matchAll(/\/Count\s+(\d+)[^>]{0,300}?\/Type\s*\/Pages\b/g),
  ].map((match) => Number(match[1]));
  return counts.length ? Math.max(...counts) : undefined;
}

async function scanFile(absolutePath: string, relativePath: string): Promise<ContentEntry | null> {
  const virtualPath = normalizeVirtualPath(relativePath);
  const extension = path.extname(relativePath).toLowerCase();
  const kind = fileKind(extension);
  const info = await stat(absolutePath);
  let metadata: ContentMetadata = {};
  let headings: ContentHeading[] = [];
  let renderedHtml: string | undefined;
  let dashboardIntroHtml: string | undefined;
  let dashboardAfterHtml: string | undefined;
  let dashboard: DashboardConfig | undefined;
  let body = "";
  let sourceForSections = "";
  let pageAspect: number | undefined;
  let pageCount: number | undefined;

  if (kind === "org" || kind === "markdown" || kind === "code" || kind === "text") {
    const source = await readFile(absolutePath, "utf8");
    if (kind === "markdown") {
      const parsed = parseMarkdownDocument(source);
      metadata = parsed.metadata;
      if (isDraftMetadata(metadata)) return null;
      headings = markdownHeadings(parsed.content);
      body = cleanBodyText(parsed.content);
      renderedHtml = await renderMarkdown(parsed.content, headings, virtualPath);
      sourceForSections = parsed.content;
    } else if (kind === "org") {
      const parsedDashboard = parseOrgDashboard(source, virtualPath);
      metadata = parseOrgMetadata(source);
      if (isDraftMetadata(metadata)) return null;
      headings = orgHeadings(source);
      body = cleanBodyText(source);
      renderedHtml = await renderOrg(source, headings);
      if (parsedDashboard.dashboard) {
        dashboardIntroHtml = await renderOrg(parsedDashboard.introSource, orgHeadings(parsedDashboard.introSource));
        dashboardAfterHtml = await renderOrg(parsedDashboard.afterSource, orgHeadings(parsedDashboard.afterSource));
      }
      dashboard = parsedDashboard.dashboard;
      sourceForSections = source;
    } else {
      body = source.replace(/\s+/g, " ").trim();
    }
  } else if (kind === "pdf") {
    pageAspect = await pdfPageAspect(absolutePath);
    pageCount = pdfPageCount((await readFile(absolutePath)).toString("latin1"));
  }

  if (!metadata.description && (kind === "org" || kind === "markdown")) {
    metadata.description = leadParagraph(sourceForSections);
  }
  const title = metadata.title || defaultTitle(path.basename(relativePath));
  const snippet = metadata.description || body.slice(0, 220);
  const entry: ContentEntry = {
    path: virtualPath,
    name: path.basename(relativePath),
    kind,
    extension: extension.slice(1),
    parent: parentPath(virtualPath),
    publicUrl: publicUrl(relativePath),
    metadata: { ...metadata, title },
    headings,
    renderedHtml,
    dashboardIntroHtml,
    dashboardAfterHtml,
    dashboard,
    size: info.size,
    pageAspect,
    pageCount,
  };

  searchDocuments.push({
    id: virtualPath,
    path: virtualPath,
    filename: entry.name,
    title,
    heading: "",
    tags: metadata.tags?.join(" ") ?? "",
    body,
    snippet,
    kind,
  });

  if (kind === "org" || kind === "markdown") {
    const sections = searchSections(sourceForSections, headings, kind);
    headings.forEach((heading, index) => {
      searchDocuments.push({
        id: `${virtualPath}::${heading.id}`,
        path: virtualPath,
        filename: entry.name,
        title,
        heading: heading.text,
        headingId: heading.id,
        tags: metadata.tags?.join(" ") ?? "",
        body: sections[index] ?? "",
        snippet: sections[index] || snippet,
        kind,
      });
    });
  }

  return entry;
}

async function draftLandingPage(items: Dirent<string>[], absolutePath: string): Promise<boolean> {
  const landing = items.find((item) => item.isFile() && /^README\.(org|md|markdown)$/i.test(item.name));
  if (!landing) return false;
  const source = await readFile(path.join(absolutePath, landing.name), "utf8");
  const metadata = landing.name.toLowerCase().endsWith(".org")
    ? parseOrgMetadata(source)
    : parseMarkdownDocument(source).metadata;
  return isDraftMetadata(metadata);
}

async function scanDirectory(absolutePath: string, relativePath = ""): Promise<ContentEntry | null> {
  const virtualPath = normalizeVirtualPath(relativePath);
  const items = await readdir(absolutePath, { withFileTypes: true });
  if (relativePath && await draftLandingPage(items, absolutePath)) return null;
  const children: ContentEntry[] = [];

  for (const item of items) {
    if (item.name.startsWith(".")) continue;
    const itemRelativePath = path.join(relativePath, item.name);
    const itemAbsolutePath = path.join(absolutePath, item.name);
    const child = item.isDirectory()
      ? await scanDirectory(itemAbsolutePath, itemRelativePath)
      : await scanFile(itemAbsolutePath, itemRelativePath);
    if (!child) continue;
    entries[child.path] = child;
    children.push(child);
  }

  if (relativePath && children.length === 0) return null;

  children.sort((left, right) => {
    if (left.kind === "directory" && right.kind !== "directory") return -1;
    if (left.kind !== "directory" && right.kind === "directory") return 1;
    return left.name.localeCompare(right.name, undefined, { numeric: true });
  });

  const landing = children.find((child) => /^README\.(org|md|markdown)$/i.test(child.name));
  return {
    path: virtualPath,
    name: virtualPath === "/" ? "asv" : path.basename(relativePath),
    kind: "directory",
    parent: parentPath(virtualPath),
    children: children.map((child) => child.path),
    landingPath: landing?.path,
    metadata: landing?.metadata ?? {},
    headings: [],
  };
}

async function preparePublicAssets(): Promise<void> {
  await mkdir(publicRoot, { recursive: true });
  await rm(publicContentRoot, { recursive: true, force: true });
  await rm(publicToolsRoot, { recursive: true, force: true });
  await mkdir(publicContentRoot, { recursive: true });
  await cp(toolsRoot, publicToolsRoot, { recursive: true });
}

/** Tool folders that have an entry page, for the sitemap. */
async function toolNames(): Promise<string[]> {
  const names: string[] = [];
  for (const dirent of await readdir(toolsRoot, { withFileTypes: true })) {
    if (!dirent.isDirectory() || dirent.name.startsWith(".")) continue;
    try {
      await stat(path.join(toolsRoot, dirent.name, "index.html"));
      names.push(dirent.name);
    } catch {
      // no entry page: not a tool
    }
  }
  return names;
}

async function copyPublishedContent(): Promise<void> {
  const files = Object.values(entries).filter((entry) => entry.publicUrl);
  for (const entry of files) {
    const relativePath = entry.path.replace(/^\//, "");
    const source = path.join(contentRoot, ...relativePath.split("/"));
    const destination = path.join(publicContentRoot, ...relativePath.split("/"));
    await mkdir(path.dirname(destination), { recursive: true });
    await cp(source, destination);
  }
}

function removeMissingDashboardItems(): void {
  for (const entry of Object.values(entries)) {
    if (!entry.dashboard) continue;
    entry.dashboard.items = entry.dashboard.items.filter((item) => Boolean(entries[item.path]));
  }
}

async function main(): Promise<void> {
  await preparePublicAssets();
  const rootEntry = await scanDirectory(contentRoot);
  if (!rootEntry) throw new Error("The content root cannot be excluded from publishing.");
  entries[rootEntry.path] = rootEntry;
  removeMissingDashboardItems();
  await copyPublishedContent();

  const manifest: ContentManifest = {
    generatedAt: new Date().toISOString(),
    root: "/home/asv",
    entries,
  };

  await writeFile(path.join(publicRoot, "content-manifest.json"), `${JSON.stringify(manifest)}\n`);
  await writeFile(path.join(publicRoot, "search-index.json"), `${JSON.stringify(searchDocuments)}\n`);
  await writeFeeds(manifest, publicRoot, await toolNames());
  console.log(`Generated ${Object.keys(entries).length} filesystem entries and ${searchDocuments.length} search records.`);
}

await main();
