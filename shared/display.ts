import type { ContentEntry, ContentManifest } from "./content";

// Short names shown in listings, the path bar and the window title.
const displayAliases: Record<string, string> = {
  "/CV-Savchenko_Aleksandr.pdf": "CV.pdf",
};

const topLevelOrder: Record<string, number> = {
  "/posts": 0,
  "/projects": 1,
  "/notes": 2,
  "/CV-Savchenko_Aleksandr.pdf": 3,
  "/about.org": 4,
};

// The homepage source stays routable (the path bar links to it) but is not listed.
const hiddenFromListings = new Set(["/welcome.org"]);

export function visibleChildren(entry: ContentEntry, entries: Record<string, ContentEntry>): ContentEntry[] {
  return (entry.children ?? [])
    .map((path) => entries[path])
    .filter(Boolean)
    .filter((child) => child.path !== entry.landingPath && !hiddenFromListings.has(child.path));
}

export function displayName(entry: Pick<ContentEntry, "path" | "name">): string {
  return displayAliases[entry.path] ?? entry.name;
}

export function displayPath(path: string): string {
  if (path === "/") return "~";
  const segments = path.split("/").filter(Boolean);
  const last = displayAliases[path];
  if (last) segments[segments.length - 1] = last;
  return `~/${segments.join("/")}`;
}

/** Keeps the end of a long path readable: `~/a/b/c` becomes `…/b/c`. */
export function shortenPath(path: string, maxLength: number): string {
  if (path.length <= maxLength) return path;
  const segments = path.split("/");
  let tail = segments.pop() ?? "";
  while (segments.length && `…/${segments.at(-1)}/${tail}`.length <= maxLength) {
    tail = `${segments.pop()}/${tail}`;
  }
  return `…/${tail}`;
}

export function sortedChildren(entry: ContentEntry, manifest: ContentManifest): ContentEntry[] {
  const sectionOrder = (child: ContentEntry) => {
    const section = child.metadata.section;
    if (!section) return -1;
    const index = entry.metadata.sections?.indexOf(section) ?? -1;
    return index < 0 ? Number.MAX_SAFE_INTEGER : index;
  };
  return visibleChildren(entry, manifest.entries).sort((left, right) => {
    const leftOrder = topLevelOrder[left.path] ?? 99;
    const rightOrder = topLevelOrder[right.path] ?? 99;
    return leftOrder - rightOrder
      || sectionOrder(left) - sectionOrder(right)
      || (left.metadata.section ?? "").localeCompare(right.metadata.section ?? "")
      || left.name.localeCompare(right.name);
  });
}

export interface ChildGroup {
  section?: string;
  entries: ContentEntry[];
}

/** Sorted children split into runs that share a section; unsectioned entries come first. */
export function groupedChildren(entry: ContentEntry, manifest: ContentManifest): ChildGroup[] {
  const groups: ChildGroup[] = [];
  for (const child of sortedChildren(entry, manifest)) {
    const last = groups.at(-1);
    if (last && last.section === child.metadata.section) last.entries.push(child);
    else groups.push({ section: child.metadata.section, entries: [child] });
  }
  return groups;
}

/** Reference notes read better by title than by their slug filename. */
export function entryLabel(entry: ContentEntry): string {
  if ((entry.metadata.url || entry.metadata.source) && entry.metadata.title) return entry.metadata.title;
  return `${displayName(entry)}${entry.kind === "directory" ? "/" : ""}`;
}

/** `https://www.example.com/a/b` becomes `example.com`. */
export function urlHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function formatSize(bytes: number | undefined): string | undefined {
  if (bytes === undefined) return undefined;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/** A dired-style detail line: the description when there is one, otherwise counts and sizes. */
export function entryDetail(entry: ContentEntry, manifest: ContentManifest): string {
  if (entry.metadata.description) return entry.metadata.description;
  if (entry.kind === "directory") {
    const count = visibleChildren(entry, manifest.entries).length;
    return count === 1 ? "1 item" : `${count} items`;
  }
  return fileDetail(entry);
}

export function fileDetail(entry: ContentEntry): string {
  return [
    entry.pageCount ? `${entry.pageCount} page${entry.pageCount === 1 ? "" : "s"}` : undefined,
    formatSize(entry.size),
  ].filter(Boolean).join(" · ");
}

/** Dated entries for the feed. A directory stands in for its README. */
export function recentEntries(manifest: ContentManifest): ContentEntry[] {
  return Object.values(manifest.entries)
    .filter((entry) => entry.metadata.date && entry.path !== "/")
    .filter((entry) => {
      if (!/^README\./i.test(entry.name)) return true;
      const parent = entry.parent ? manifest.entries[entry.parent] : undefined;
      return parent?.landingPath !== entry.path;
    })
    .sort((left, right) =>
      (right.metadata.date ?? "").localeCompare(left.metadata.date ?? "") || left.path.localeCompare(right.path));
}
