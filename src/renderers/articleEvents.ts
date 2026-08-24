import type { MouseEvent } from "react";
import type { SiteRoute } from "../filesystem/path";
import { resolveLocalPath } from "../filesystem/path";

function foldHeading(heading: HTMLElement): void {
  if (!window.matchMedia("(max-width: 760px)").matches) return;
  heading.classList.toggle("is-folded");

  const section = heading.parentElement;
  if (section?.tagName.toLowerCase() === "section") {
    section.classList.toggle("is-folded", heading.classList.contains("is-folded"));
    return;
  }

  const depth = Number(heading.tagName.slice(1));
  let sibling = heading.nextElementSibling as HTMLElement | null;
  while (sibling) {
    if (/^H[1-6]$/.test(sibling.tagName) && Number(sibling.tagName.slice(1)) <= depth) break;
    sibling.hidden = heading.classList.contains("is-folded");
    sibling = sibling.nextElementSibling as HTMLElement | null;
  }
}

export function handleArticleClick(
  event: MouseEvent<HTMLElement>,
  currentPath: string,
  navigate: (route: SiteRoute) => void,
): void {
  const element = event.target as HTMLElement;
  const anchor = element.closest("a");
  if (anchor) {
    const href = anchor.getAttribute("href") ?? "";
    const route = resolveLocalPath(currentPath, href);
    if (route) {
      event.preventDefault();
      navigate(route);
    } else if (/^https?:/i.test(href)) {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noreferrer");
    }
    return;
  }

  const heading = element.closest("h1, h2, h3, h4, h5, h6") as HTMLElement | null;
  if (heading) foldHeading(heading);
}
