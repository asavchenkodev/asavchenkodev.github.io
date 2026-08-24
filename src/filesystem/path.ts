export interface SiteRoute {
  path: string;
  heading?: string;
  page?: number;
}

export function normalizePath(value: string): string {
  const decoded = decodeURIComponent(value || "/");
  const withLeadingSlash = decoded.startsWith("/") ? decoded : `/${decoded}`;
  const normalized = withLeadingSlash.replace(/\/{2,}/g, "/").replace(/\/$/, "");
  return normalized || "/";
}

export function parseHash(hash: string): SiteRoute {
  const raw = hash.replace(/^#/, "") || "/";
  const [pathname, query = ""] = raw.split("?", 2);
  const params = new URLSearchParams(query);
  const page = Number(params.get("page"));
  return {
    path: normalizePath(pathname),
    heading: params.get("heading") || undefined,
    page: Number.isFinite(page) && page > 0 ? page : undefined,
  };
}

export function routeHref(route: SiteRoute): string {
  const params = new URLSearchParams();
  if (route.heading) params.set("heading", route.heading);
  if (route.page) params.set("page", String(route.page));
  const query = params.size ? `?${params.toString()}` : "";
  return `#${normalizePath(route.path)}${query}`;
}

export function resolveLocalPath(currentFile: string, href: string): SiteRoute | null {
  if (!href || /^(https?:|mailto:|tel:)/i.test(href)) return null;
  if (href.startsWith("/tools/")) return null;

  const [rawPath, rawHeading] = href.replace(/^file:/i, "").split("#", 2);
  if (!rawPath && rawHeading) {
    return { path: normalizePath(currentFile), heading: rawHeading };
  }

  const base = currentFile.endsWith("/") ? currentFile : currentFile.slice(0, currentFile.lastIndexOf("/") + 1);
  const resolved = rawPath.startsWith("/")
    ? rawPath
    : new URL(rawPath, `https://content.local${base}`).pathname;
  return { path: normalizePath(resolved), heading: rawHeading || undefined };
}

export function parentRoute(pathname: string): string {
  const normalized = normalizePath(pathname);
  if (normalized === "/") return "/";
  const parent = normalized.slice(0, normalized.lastIndexOf("/"));
  return parent || "/";
}
