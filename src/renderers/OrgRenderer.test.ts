import { describe, expect, it } from "vitest";
import { resolveOrgImageSources } from "./OrgRenderer";

describe("Org image sources", () => {
  it("maps relative file links into published content", () => {
    const html = '<img src="file:images/calibration%20pipeline.png" alt="Calibration pipeline">';
    expect(resolveOrgImageSources("/notes/computer-vision/README.org", html)).toContain(
      'src="/content/notes/computer-vision/images/calibration%20pipeline.png"',
    );
  });

  it("maps root-relative file links into published content", () => {
    const html = '<img src="file:/images/overview.png">';
    expect(resolveOrgImageSources("/notes/README.org", html)).toContain(
      'src="/content/images/overview.png"',
    );
  });

  it("leaves external image sources unchanged", () => {
    const html = '<img src="https://example.com/image.png">';
    expect(resolveOrgImageSources("/notes/README.org", html)).toBe(html);
  });
});
