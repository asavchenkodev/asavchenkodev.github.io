export const siteUrl = "https://asavchenkodev.github.io";
export const siteTitle = "Aleksandr Savchenko";
export const siteDescription = "Aleksandr Savchenko's projects, technical writing, and browser tools.";

/** Every entry also gets a static page at its path (see prerender.ts), which shares and crawls better than #/ routes. */
export function pagePath(virtualPath: string): string {
  if (virtualPath === "/") return "/";
  return `${virtualPath.split("/").map(encodeURIComponent).join("/")}/`;
}

export function pageUrl(virtualPath: string): string {
  return `${siteUrl}${pagePath(virtualPath)}`;
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
