import { describe, expect, it } from "vitest";
import { isDraftMetadata, parseMarkdownDocument, parseOrgMetadata } from "./content-metadata";

describe("draft content metadata", () => {
  it("recognizes draft in Org TAGS metadata", () => {
    const metadata = parseOrgMetadata("#+TITLE: Work in progress\n#+TAGS: notes, computer-vision, draft\n");
    expect(isDraftMetadata(metadata)).toBe(true);
  });

  it("recognizes a case-insensitive Markdown draft tag", () => {
    const { metadata } = parseMarkdownDocument("---\ntitle: Work in progress\ntags: [notes, DRAFT]\n---\n");
    expect(isDraftMetadata(metadata)).toBe(true);
  });

  it("keeps content without the draft tag publishable", () => {
    expect(isDraftMetadata(parseOrgMetadata("#+TAGS: notes, computer-vision\n"))).toBe(false);
  });
});
