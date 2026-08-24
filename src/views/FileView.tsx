import { ArrowSquareOut } from "@phosphor-icons/react";
import { useEffect } from "react";
import type { ContentEntry } from "../../shared/content";
import { urlHost } from "../../shared/display";
import type { SiteRoute } from "../filesystem/path";
import { FileRenderer } from "../renderers/FileRenderer";

interface FileViewProps {
  entry: ContentEntry;
  navigate: (route: SiteRoute) => void;
  heading?: string;
  page?: number;
}

export function FileView({ entry, navigate, heading, page }: FileViewProps) {
  useEffect(() => {
    if (!heading) return;
    let attempts = 0;
    const timer = window.setInterval(() => {
      const target = document.getElementById(heading);
      attempts += 1;
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        target.classList.add("search-target");
        window.clearInterval(timer);
      } else if (attempts > 20) {
        window.clearInterval(timer);
      }
    }, 80);
    return () => window.clearInterval(timer);
  }, [entry.path, heading]);

  return (
    <div className="file-view">
      {entry.metadata.url ? (
        <a className="note-link" href={entry.metadata.url} target="_blank" rel="noreferrer" data-dired-entry data-route-selected="true">
          <strong>{entry.metadata.title}<ArrowSquareOut size={16} /></strong>
          <small>
            {entry.metadata.source ? <em className="source-tag">{entry.metadata.source}</em> : null}
            {urlHost(entry.metadata.url)}
          </small>
        </a>
      ) : entry.metadata.source ? (
        <header className="note-link">
          <strong>{entry.metadata.title}</strong>
          <small><em className="source-tag">{entry.metadata.source}</em></small>
        </header>
      ) : null}
      <FileRenderer entry={entry} navigate={navigate} page={page} />
    </div>
  );
}
