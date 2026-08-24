import type { SiteRoute } from "../filesystem/path";
import { handleArticleClick } from "./articleEvents";

interface OrgRendererProps {
  path: string;
  html: string;
  navigate: (route: SiteRoute) => void;
}

export function resolveOrgImageSources(currentPath: string, html: string): string {
  const directory = currentPath.slice(0, currentPath.lastIndexOf("/") + 1);
  return html.replace(
    /(<img\b[^>]*\bsrc=)(["'])file:([^"']+)\2/gi,
    (_match, prefix: string, quote: string, href: string) => {
      const resolved = new URL(href, `https://content.local${directory}`);
      return `${prefix}${quote}/content${resolved.pathname}${resolved.search}${resolved.hash}${quote}`;
    },
  );
}

export function OrgRenderer({ path, html, navigate }: OrgRendererProps) {
  return (
    <article
      className="document-article org-body"
      onClick={(event) => handleArticleClick(event, path, navigate)}
      dangerouslySetInnerHTML={{ __html: resolveOrgImageSources(path, html) }}
    />
  );
}
