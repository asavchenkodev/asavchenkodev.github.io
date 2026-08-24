import { ArrowSquareOut, DownloadSimple, FilePdf } from "@phosphor-icons/react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { ContentEntry } from "../../shared/content";
import { displayName, fileDetail } from "../../shared/display";
import type { SiteRoute } from "../filesystem/path";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { OrgRenderer } from "./OrgRenderer";

// The syntax highlighter is only needed for source files, which are rare here.
const PlainTextRenderer = lazy(() =>
  import("./PlainTextRenderer").then((module) => ({ default: module.PlainTextRenderer })));

interface FileRendererProps {
  entry: ContentEntry;
  navigate: (route: SiteRoute) => void;
  page?: number;
}

function PdfRenderer({ entry, page }: Pick<FileRendererProps, "entry" | "page">) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [frameHeight, setFrameHeight] = useState(900);
  const url = `${entry.publicUrl}${page ? `#page=${page}` : ""}`;
  // Chrome's viewer otherwise opens with the thumbnail pane at a small zoom.
  const frameUrl = `${entry.publicUrl}#${page ? `page=${page}&` : ""}navpanes=0&view=FitH`;

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    const updateHeight = () => {
      const pageAspect = entry.pageAspect ?? Math.SQRT2;
      setFrameHeight(Math.ceil(viewer.clientWidth * pageAspect + 64));
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(viewer);
    return () => observer.disconnect();
  }, [entry.pageAspect]);

  return (
    <div className="pdf-viewer" ref={viewerRef}>
      <header className="pdf-summary">
        <FilePdf size={34} />
        <span>
          <strong>{displayName(entry)}</strong>
          <small>{fileDetail(entry)}</small>
        </span>
      </header>
      <div className="pdf-actions">
        <a href={url} target="_blank" rel="noreferrer">
          <FilePdf size={20} /> Open in new tab <ArrowSquareOut size={16} />
        </a>
        <a href={entry.publicUrl} download={entry.name}>
          <DownloadSimple size={19} /> Download PDF
        </a>
      </div>
      <iframe src={frameUrl} title={entry.metadata.title ?? entry.name} style={{ height: `${frameHeight}px` }} />
    </div>
  );
}

export function FileRenderer({ entry, navigate, page }: FileRendererProps) {
  if (!entry.publicUrl) return null;

  if (entry.kind === "org") {
    return <OrgRenderer path={entry.path} html={entry.renderedHtml ?? ""} navigate={navigate} />;
  }
  if (entry.kind === "markdown") {
    return <MarkdownRenderer path={entry.path} html={entry.renderedHtml ?? ""} navigate={navigate} />;
  }
  if (entry.kind === "pdf") {
    return <PdfRenderer entry={entry} page={page} />;
  }
  if (entry.kind === "image") {
    return (
      <figure className="image-viewer">
        <img src={entry.publicUrl} alt={entry.metadata.description ?? entry.metadata.title ?? entry.name} />
        <figcaption>{entry.name}</figcaption>
      </figure>
    );
  }
  if (entry.kind === "code" || entry.kind === "text") {
    return (
      <Suspense fallback={<div className="document-loading">Reading file…</div>}>
        <PlainTextRenderer sourceUrl={entry.publicUrl} language={entry.extension} />
      </Suspense>
    );
  }
  return (
    <div className="unsupported-file">
      <p>This file is available to download, but it does not have an inline viewer yet.</p>
      <a href={entry.publicUrl} download>Download {entry.name}</a>
    </div>
  );
}
