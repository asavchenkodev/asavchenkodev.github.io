import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import type { ContentEntry, ContentManifest } from "../../shared/content";
import { FileIcon } from "../components/FileIcon";
import type { SiteRoute } from "../filesystem/path";
import { displayName, sortedChildren } from "../../shared/display";

interface SidebarProps {
  manifest: ContentManifest;
  currentPath: string;
  navigate: (route: SiteRoute) => void;
  active?: boolean;
  onActivate?: () => void;
}

interface TreeItemProps extends SidebarProps {
  entry: ContentEntry;
  depth: number;
}

function TreeItem({ entry, depth, manifest, currentPath, navigate }: TreeItemProps) {
  const selected = currentPath === entry.path;
  const inActiveBranch = entry.kind === "directory" && currentPath.startsWith(`${entry.path}/`);
  const children = entry.kind === "directory" ? sortedChildren(entry, manifest) : [];

  return (
    <li>
      <button
        className={`tree-row${selected ? " is-selected" : ""}`}
        style={{ paddingInlineStart: `${18 + depth * 18}px` }}
        onClick={() => navigate({ path: entry.path })}
        aria-current={selected ? "page" : undefined}
        data-dired-entry
        data-entry-path={entry.path}
        data-route-selected={selected ? "true" : undefined}
        data-tree-leaf={children.length === 0 ? "true" : undefined}
      >
        <FileIcon kind={entry.kind} active={selected || inActiveBranch} />
        <span>{displayName(entry)}{entry.kind === "directory" ? "/" : ""}</span>
      </button>
      {children.length > 0 && (selected || inActiveBranch) ? (
        <ul className="tree-children">
          {children.map((child) => (
            <TreeItem
              key={child.path}
              entry={child}
              depth={depth + 1}
              manifest={manifest}
              currentPath={currentPath}
              navigate={navigate}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function Sidebar({ manifest, currentPath, navigate, active = false, onActivate }: SidebarProps) {
  const root = manifest.entries["/"];
  const children = sortedChildren(root, manifest);
  return (
    <aside
      className={`desktop-sidebar${active ? " is-active-panel" : ""}`}
      aria-label="Published filesystem"
      data-panel="sidebar"
      onPointerDown={(event) => {
        onActivate?.();
        const target = event.target instanceof Element ? event.target : null;
        if (!target?.closest("[data-dired-entry], a")) {
          const sidebar = event.currentTarget;
          window.requestAnimationFrame(() => {
            const selected = sidebar.querySelector<HTMLElement>('[data-route-selected="true"]')
              ?? sidebar.querySelector<HTMLElement>("[data-dired-entry]");
            selected?.focus({ preventScroll: true });
          });
        }
      }}
    >
      <button
        className="home-label"
        onClick={() => navigate({ path: "/" })}
        data-dired-entry
        data-entry-path="/"
        data-route-selected={currentPath === "/" ? "true" : undefined}
      >/home/asv</button>
      <div className="sidebar-rule" />
      <nav>
        <ul className="file-tree">
          {children.map((entry) => (
            <TreeItem
              key={entry.path}
              entry={entry}
              depth={0}
              manifest={manifest}
              currentPath={currentPath}
              navigate={navigate}
            />
          ))}
        </ul>
      </nav>
      <footer className="sidebar-footer">
        <div className="sidebar-keybindings">
          <span className="sidebar-footer-heading">Keybindings</span>
          <span className="sidebar-shortcuts">h j k l move · / search · ? help</span>
        </div>
        <div className="sidebar-identity">
          <span>© 2026 Aleksandr Savchenko</span>
          <span className="sidebar-socials">
            <a
              href="https://github.com/asavchenkodev"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              title="GitHub"
            ><GithubLogo size={17} /></a>
            <a
              href="https://www.linkedin.com/in/aleksandr-savchenko-25321b267"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              title="LinkedIn"
            ><LinkedinLogo size={17} /></a>
          </span>
        </div>
      </footer>
    </aside>
  );
}
