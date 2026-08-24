import { ArrowSquareOut, FolderOpen } from "@phosphor-icons/react";
import { useMemo } from "react";
import type { ContentEntry, ContentManifest } from "../../shared/content";
import { FileIcon } from "../components/FileIcon";
import { entryDetail, entryLabel, groupedChildren } from "../../shared/display";
import type { SiteRoute } from "../filesystem/path";
import { FileRenderer } from "../renderers/FileRenderer";

interface DirectoryViewProps {
  entry: ContentEntry;
  manifest: ContentManifest;
  navigate: (route: SiteRoute) => void;
}

export function DirectoryView({ entry, manifest, navigate }: DirectoryViewProps) {
  const groups = useMemo(() => groupedChildren(entry, manifest), [entry, manifest]);
  const landing = entry.landingPath ? manifest.entries[entry.landingPath] : undefined;
  const launch = entry.metadata.launch;

  return (
    <div className="directory-view">
      {launch ? (
        <a className="launch-row" href={launch} data-dired-entry data-route-selected="true">
          <ArrowSquareOut size={20} />
          <span>
            <strong>run ./{entry.name}</strong>
            <small>Open the live tool · RET</small>
          </span>
        </a>
      ) : null}

      {landing ? <div className="directory-readme"><FileRenderer entry={landing} navigate={navigate} /></div> : null}

      {groups.length ? (
        <section className="directory-contents">
          <header><FolderOpen size={23} /><h2>./</h2></header>
          {groups.map((group) => (
            <div className="directory-group" key={group.section ?? ""}>
              {group.section ? <h3 className="directory-section">{group.section}</h3> : null}
              <div className="directory-list">
                {group.entries.map((child) => (
                  <button
                    key={child.path}
                    onClick={() => navigate({ path: child.path })}
                    data-dired-entry
                    data-entry-path={child.path}
                  >
                    <FileIcon kind={child.kind} />
                    <span>
                      <strong>
                        {entryLabel(child)}
                        {child.metadata.source ? <em className="source-tag">{child.metadata.source}</em> : null}
                      </strong>
                      <small>{entryDetail(child, manifest)}</small>
                    </span>
                    {child.metadata.date ? <time dateTime={child.metadata.date}>{child.metadata.date}</time> : null}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
}
