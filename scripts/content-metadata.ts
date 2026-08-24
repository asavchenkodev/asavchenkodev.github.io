import matter from "gray-matter";
import type { ContentMetadata } from "../shared/content";

function normalizeTags(value: unknown): string[] | undefined {
  if (Array.isArray(value)) {
    const tags = value.map(String).map((tag) => tag.trim()).filter(Boolean);
    return tags.length ? tags : undefined;
  }
  if (typeof value !== "string") return undefined;
  const tags = value.replace(/^:|:$/g, "").split(/[,\s:]+/).map((tag) => tag.trim()).filter(Boolean);
  return tags.length ? tags : undefined;
}

function normalizeText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function normalizeList(value: unknown): string[] | undefined {
  const items = Array.isArray(value) ? value.map(String) : typeof value === "string" ? value.split("|") : [];
  const list = items.map((item) => item.trim()).filter(Boolean);
  return list.length ? list : undefined;
}

function normalizeDate(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value !== "string" && typeof value !== "number") return undefined;
  const text = String(value).trim().replace(/[<>\[\]]/g, "");
  const match = text.match(/\d{4}-\d{2}-\d{2}/);
  return match?.[0];
}

export function normalizeMetadata(data: Record<string, unknown>): ContentMetadata {
  return {
    title: typeof data.title === "string" ? data.title.trim() : undefined,
    date: normalizeDate(data.date),
    description: typeof data.description === "string" ? data.description.trim() : undefined,
    tags: normalizeTags(data.tags ?? data.filetags ?? data.keywords),
    featured: data.featured === true || String(data.featured).toLowerCase() === "true",
    launch: typeof data.launch === "string" ? data.launch.trim() : undefined,
    source: normalizeText(data.source),
    url: normalizeText(data.url),
    section: normalizeText(data.section),
    sections: normalizeList(data.sections),
  };
}

export function parseOrgMetadata(source: string): ContentMetadata {
  const keywords: Record<string, unknown> = {};
  for (const match of source.matchAll(/^#\+([A-Z_]+):\s*(.*)$/gim)) {
    keywords[match[1].toLowerCase()] = match[2].trim();
  }
  return normalizeMetadata(keywords);
}

export function parseMarkdownDocument(source: string): { content: string; metadata: ContentMetadata } {
  const parsed = matter(source);
  return { content: parsed.content, metadata: normalizeMetadata(parsed.data) };
}

export function isDraftMetadata(metadata: ContentMetadata): boolean {
  return metadata.tags?.some((tag) => tag.toLowerCase() === "draft") ?? false;
}
