import type { SiteRoute } from "../filesystem/path";
import { handleArticleClick } from "./articleEvents";

interface MarkdownRendererProps {
  path: string;
  html: string;
  navigate: (route: SiteRoute) => void;
}

/** Markdown is rendered and highlighted at build time, like Org. */
export function MarkdownRenderer({ path, html, navigate }: MarkdownRendererProps) {
  return (
    <article
      className="document-article markdown-body"
      onClick={(event) => handleArticleClick(event, path, navigate)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
