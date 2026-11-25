import { writeFile } from "node:fs/promises";
import path from "node:path";
import type { ContentManifest } from "../shared/content";
import { recentEntries } from "../shared/display";
import { escapeXml, pageUrl, siteDescription, siteTitle, siteUrl } from "./site";

export function atomFeed(manifest: ContentManifest): string {
  const entries = recentEntries(manifest).slice(0, 30);
  const updated = entries[0]?.metadata.date ?? manifest.generatedAt.slice(0, 10);
  const items = entries.map((entry) => {
    const landing = entry.landingPath ? manifest.entries[entry.landingPath] : entry;
    const html = landing?.renderedHtml;
    return [
      "  <entry>",
      `    <title>${escapeXml(entry.metadata.title ?? entry.name)}</title>`,
      `    <link href="${escapeXml(pageUrl(entry.path))}"/>`,
      `    <id>${escapeXml(pageUrl(entry.path))}</id>`,
      `    <updated>${entry.metadata.date}T00:00:00Z</updated>`,
      entry.metadata.description ? `    <summary>${escapeXml(entry.metadata.description)}</summary>` : "",
      html ? `    <content type="html">${escapeXml(html)}</content>` : "",
      ...(entry.metadata.tags ?? []).map((tag) => `    <category term="${escapeXml(tag)}"/>`),
      "  </entry>",
    ].filter(Boolean).join("\n");
  });
  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    `<feed xmlns="http://www.w3.org/2005/Atom" xml:base="${siteUrl}/">`,
    `  <title>${escapeXml(siteTitle)}</title>`,
    `  <subtitle>${escapeXml(siteDescription)}</subtitle>`,
    `  <link href="${siteUrl}/"/>`,
    `  <link rel="self" href="${siteUrl}/feed.xml"/>`,
    `  <id>${siteUrl}/</id>`,
    `  <updated>${updated}T00:00:00Z</updated>`,
    `  <author><name>${escapeXml(siteTitle)}</name></author>`,
    ...items,
    "</feed>",
    "",
  ].join("\n");
}

/** `toolNames` are folders under tools/ with an index.html; each is listed at /tools/<name>/. */
export function sitemap(manifest: ContentManifest, toolNames: string[] = []): string {
  const urls = Object.values(manifest.entries)
    .filter((entry) => {
      const parent = entry.parent ? manifest.entries[entry.parent] : undefined;
      return parent?.landingPath !== entry.path;
    })
    .map((entry) => entry.path)
    .sort()
    .map((virtualPath) => `  <url><loc>${escapeXml(pageUrl(virtualPath))}</loc></url>`);
  const toolUrls = [...toolNames]
    .sort()
    .map((name) => `  <url><loc>${escapeXml(`${siteUrl}/tools/${encodeURIComponent(name)}/`)}</loc></url>`);
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    ...toolUrls,
    "</urlset>",
    "",
  ].join("\n");
}

export function robotsTxt(): string {
  return ["User-agent: *", "Allow: /", "", `Sitemap: ${siteUrl}/sitemap.xml`, ""].join("\n");
}

export async function writeFeeds(manifest: ContentManifest, outputRoot: string, toolNames: string[] = []): Promise<void> {
  await writeFile(path.join(outputRoot, "feed.xml"), atomFeed(manifest));
  await writeFile(path.join(outputRoot, "sitemap.xml"), sitemap(manifest, toolNames));
  await writeFile(path.join(outputRoot, "robots.txt"), robotsTxt());
}
