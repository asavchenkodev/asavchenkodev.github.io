import { CaretLeft, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import type { ContentManifest } from "../../shared/content";
import { FileIcon } from "../components/FileIcon";
import { displayName, entryDetail, sortedChildren } from "../../shared/display";
import { parentRoute, type SiteRoute } from "../filesystem/path";

interface MobileDrawerProps {
  open: boolean;
  manifest: ContentManifest;
  currentPath: string;
  navigate: (route: SiteRoute) => void;
  onClose: () => void;
}

function currentFolder(pathname: string, manifest: ContentManifest): string {
  const entry = manifest.entries[pathname];
  if (entry?.kind === "directory" && sortedChildren(entry, manifest).length) return pathname;
  return entry?.parent ?? "/";
}

export function MobileDrawer({ open, manifest, currentPath, navigate, onClose }: MobileDrawerProps) {
  const [folder, setFolder] = useState(() => currentFolder(currentPath, manifest));

  useEffect(() => {
    if (open) setFolder(currentFolder(currentPath, manifest));
    // Only re-sync when the drawer opens; browsing inside it moves `folder` itself.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;
  const entry = manifest.entries[folder] ?? manifest.entries["/"];
  const children = sortedChildren(entry, manifest);

  const openEntry = (path: string) => {
    const child = manifest.entries[path];
    navigate({ path });
    // A folder with nothing but its README is a page to read, not a folder to browse.
    if (child.kind === "directory" && sortedChildren(child, manifest).length) setFolder(path);
    else onClose();
  };

  return (
    <div className="drawer-layer" role="dialog" aria-modal="true" aria-label="Browse files">
      <button className="drawer-scrim" onClick={onClose} aria-label="Close file browser" />
      <aside className="mobile-drawer">
        <header className="drawer-header">
          <button
            className="icon-button"
            onClick={() => {
              const parent = parentRoute(folder);
              setFolder(parent);
              navigate({ path: parent });
            }}
            disabled={folder === "/"}
            aria-label="Parent folder"
          >
            <CaretLeft size={22} />
          </button>
          <div>
            <small>/home/asv</small>
            <strong>{folder === "/" ? "files" : entry.name}</strong>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close file browser">
            <X size={22} />
          </button>
        </header>
        <div className="drawer-list">
          {children.map((child) => (
            <button key={child.path} className="drawer-file-row" onClick={() => openEntry(child.path)}>
              <FileIcon kind={child.kind} active={currentPath === child.path} />
              <span>
                <strong>{displayName(child)}{child.kind === "directory" ? "/" : ""}</strong>
                <small>{entryDetail(child, manifest)}</small>
              </span>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
