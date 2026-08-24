import { describe, expect, it } from "vitest";
import { normalizePath, parseHash, parentRoute, resolveLocalPath, routeHref } from "./path";

describe("filesystem routes", () => {
  it("normalizes root and nested paths", () => {
    expect(normalizePath("projects/demo/")).toBe("/projects/demo");
    expect(normalizePath("/")).toBe("/");
  });

  it("round trips heading and PDF page targets", () => {
    expect(parseHash(routeHref({ path: "/posts/note.org", heading: "details" }))).toEqual({
      path: "/posts/note.org",
      heading: "details",
      page: undefined,
    });
    expect(parseHash("#/CV-Savchenko_Aleksandr.pdf?page=2").page).toBe(2);
  });

  it("resolves relative content links", () => {
    expect(resolveLocalPath("/projects/demo/README.md", "../other/report.pdf#page")).toEqual({
      path: "/projects/other/report.pdf",
      heading: "page",
    });
    expect(resolveLocalPath("/about.org", "https://example.com")).toBeNull();
  });

  it("finds the parent folder", () => {
    expect(parentRoute("/projects/demo/readme.md")).toBe("/projects/demo");
    expect(parentRoute("/about.org")).toBe("/");
  });
});
