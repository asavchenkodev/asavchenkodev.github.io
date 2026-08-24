// Runs after `vite build`: writes a static page per entry (docs/notes/papers/index.html) with
// that entry's title, description and text, so links shared or crawled show real content.
// The page boots the same app, which switches to the matching #/ route (see index.html).
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ContentEntry, ContentManifest } from "../shared/content";
import { displayName, displayPath, sortedChildren } from "../shared/display";
import { escapeXml, pagePath, pageUrl, siteDescription, siteTitle } from "./site";

const outputRoot = path.join(process.cwd(), "docs");

const titleTag = /<title>[\s\S]*?<\/title>/;
const descriptionTag = /<meta\s+name="description"\s+content="[^"]*"\s*\/>/;
const canonicalTag = /<link rel="canonical" href="[^"]*" \/>/;

function withHead(template: string, title: string, description: string, url: string, type: string): string {
  return template
    .replace(titleTag, `<title>${escapeXml(title)}</title>`)
    .replace(descriptionTag, `<meta name="description" content="${escapeXml(description)}" />`)
    .replace(canonicalTag, openGraphTags(title, description, url, type));
}

function openGraphTags(title: string, description: string, url: string, type: string): string {
  return [
    `<link rel="canonical" href="${escapeXml(url)}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${escapeXml(siteTitle)}" />`,
    `<meta property="og:title" content="${escapeXml(title)}" />`,
    `<meta property="og:description" content="${escapeXml(description)}" />`,
    `<meta property="og:url" content="${escapeXml(url)}" />`,
    `<meta name="twitter:card" content="summary" />`,
  ].join("\n    ");
}

function staticBody(entry: ContentEntry, manifest: ContentManifest): string {
  const landing = entry.landingPath ? manifest.entries[entry.landingPath] : undefined;
  const html = (landing ?? entry).renderedHtml ?? "";
  const links = entry.kind === "directory"
    ? sortedChildren(entry, manifest).map((child) =>
      `<li><a href="${escapeXml(pagePath(child.path))}">${escapeXml(displayName(child))}</a></li>`).join("")
    : entry.publicUrl && !html
      ? `<li><a href="${escapeXml(entry.publicUrl)}">${escapeXml(displayName(entry))}</a></li>`
      : "";
  return `<noscript><article><h1>${escapeXml(entry.metadata.title ?? entry.name)}</h1>${html}${links ? `<ul>${links}</ul>` : ""}</article></noscript>`;
}

function isLandingFile(entry: ContentEntry, manifest: ContentManifest): boolean {
  const parent = entry.parent ? manifest.entries[entry.parent] : undefined;
  return parent?.landingPath === entry.path;
}

async function main(): Promise<void> {
  const template = await readFile(path.join(outputRoot, "index.html"), "utf8");
  const manifest = JSON.parse(await readFile(path.join(outputRoot, "content-manifest.json"), "utf8")) as ContentManifest;
  for (const tag of [titleTag, descriptionTag, canonicalTag]) {
    if (!tag.test(template)) throw new Error(`docs/index.html is missing ${tag}; prerendering needs it.`);
  }
  await writeFile(
    path.join(outputRoot, "index.html"),
    withHead(template, `${siteTitle} · /home/asv`, siteDescription, pageUrl("/"), "website"),
  );

  let written = 0;
  for (const entry of Object.values(manifest.entries)) {
    if (entry.path === "/" || isLandingFile(entry, manifest)) continue;
    const title = `${entry.metadata.title ?? displayName(entry)} · ${siteTitle}`;
    const description = entry.metadata.description ?? `${displayPath(entry.path)} · ${siteDescription}`;
    const type = entry.metadata.date ? "article" : "website";
    const page = withHead(template, title, description, pageUrl(entry.path), type)
      .replace('<div id="root"></div>', `<div id="root"></div>\n    ${staticBody(entry, manifest)}`);
    const target = path.join(outputRoot, ...entry.path.split("/").filter(Boolean), "index.html");
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, page);
    written += 1;
  }
  console.log(`Prerendered ${written} static entry pages.`);
}

await main();
