export type ContentKind = "directory" | "org" | "markdown" | "pdf" | "image" | "code" | "text" | "binary";

export interface ContentMetadata {
  title?: string;
  date?: string;
  description?: string;
  tags?: string[];
  featured?: boolean;
  launch?: string;
  /** Who published a referenced item, shown as a small inline tag. */
  source?: string;
  /** The external page a reference note is about. */
  url?: string;
  /** Group heading the entry is listed under in its directory. */
  section?: string;
  /** Section order for a directory, from its README. */
  sections?: string[];
}

export interface ContentHeading {
  depth: number;
  id: string;
  text: string;
}

export interface DashboardListItem {
  path: string;
  label: string;
  description?: string;
  depth: number;
}

export interface DashboardConfig {
  command: string;
  items: DashboardListItem[];
}

export interface ContentEntry {
  path: string;
  name: string;
  kind: ContentKind;
  extension?: string;
  parent?: string;
  publicUrl?: string;
  children?: string[];
  landingPath?: string;
  metadata: ContentMetadata;
  headings: ContentHeading[];
  renderedHtml?: string;
  dashboardIntroHtml?: string;
  dashboardAfterHtml?: string;
  dashboard?: DashboardConfig;
  size?: number;
  pageAspect?: number;
  pageCount?: number;
}

export interface ContentManifest {
  generatedAt: string;
  root: string;
  entries: Record<string, ContentEntry>;
}

export interface SearchDocument {
  id: string;
  path: string;
  filename: string;
  title: string;
  heading: string;
  headingId?: string;
  tags: string;
  body: string;
  snippet: string;
  page?: number;
  kind: ContentKind;
}
