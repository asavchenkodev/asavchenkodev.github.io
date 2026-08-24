import { describe, expect, it } from "vitest";
import type { ContentEntry, ContentManifest } from "./content";
import { displayPath, groupedChildren, recentEntries, shortenPath, visibleChildren } from "./display";

function entry(path: string, extra: Partial<ContentEntry> = {}): ContentEntry {
  const name = path.split("/").at(-1) || "asv";
  return { path, name, kind: "org", metadata: {}, headings: [], ...extra };
}

const manifest: ContentManifest = {
  generatedAt: "2026-10-08T00:00:00Z",
  root: "/home/asv",
  entries: {
    "/": entry("/", { kind: "directory", children: ["/posts", "/welcome.org", "/about.org"] }),
    "/posts": entry("/posts", { kind: "directory", parent: "/", children: ["/posts/a"] }),
    "/posts/a": entry("/posts/a", {
      kind: "directory",
      parent: "/posts",
      children: ["/posts/a/README.org", "/posts/a/notes.org"],
      landingPath: "/posts/a/README.org",
      metadata: { title: "A", date: "2026-05-01" },
    }),
    "/posts/a/README.org": entry("/posts/a/README.org", { parent: "/posts/a", metadata: { title: "A", date: "2026-05-01" } }),
    "/posts/a/notes.org": entry("/posts/a/notes.org", { parent: "/posts/a", metadata: { title: "Notes", date: "2026-09-01" } }),
    "/welcome.org": entry("/welcome.org", { parent: "/" }),
    "/about.org": entry("/about.org", { parent: "/" }),
  },
};

describe("display helpers", () => {
  it("lists a dated folder once, by its folder path, newest first", () => {
    expect(recentEntries(manifest).map((item) => item.path)).toEqual(["/posts/a/notes.org", "/posts/a"]);
  });

  it("hides landing pages and the homepage source from listings", () => {
    expect(visibleChildren(manifest.entries["/"], manifest.entries).map((item) => item.path)).toEqual(["/posts", "/about.org"]);
    expect(visibleChildren(manifest.entries["/posts/a"], manifest.entries).map((item) => item.path)).toEqual(["/posts/a/notes.org"]);
  });

  it("uses short names and keeps the end of long paths", () => {
    expect(displayPath("/CV-Savchenko_Aleksandr.pdf")).toBe("~/CV.pdf");
    expect(displayPath("/notes/computer-vision")).toBe("~/notes/computer-vision");
    expect(shortenPath("~/notes/computer-vision/calibration/fisheye.org", 30)).toBe("…/calibration/fisheye.org");
    expect(shortenPath("~/notes", 30)).toBe("~/notes");
  });
});

describe("groupedChildren", () => {
  it("groups entries by section in the README's order", () => {
    const sectioned: ContentManifest = {
      ...manifest,
      entries: {
        "/notes": entry("/notes", {
          kind: "directory",
          children: ["/notes/a.org", "/notes/b.org", "/notes/c.org"],
          metadata: { sections: ["Second", "First"] },
        }),
        "/notes/a.org": entry("/notes/a.org", { metadata: { section: "First" } }),
        "/notes/b.org": entry("/notes/b.org", { metadata: { section: "Second" } }),
        "/notes/c.org": entry("/notes/c.org", { metadata: { section: "First" } }),
      },
    };
    const groups = groupedChildren(sectioned.entries["/notes"], sectioned);
    expect(groups.map((group) => [group.section, group.entries.map((child) => child.name)])).toEqual([
      ["Second", ["b.org"]],
      ["First", ["a.org", "c.org"]],
    ]);
  });
});
