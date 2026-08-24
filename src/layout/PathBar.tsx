import { List, MagnifyingGlass } from "@phosphor-icons/react";
import { displayPath, shortenPath } from "../../shared/display";
import type { SiteRoute } from "../filesystem/path";

interface PathBarProps {
  path: string;
  navigate: (route: SiteRoute) => void;
  onMenu: () => void;
  onSearch: () => void;
}

export function PathBar({ path, navigate, onMenu, onSearch }: PathBarProps) {
  const segments = path.split("/").filter(Boolean);
  const labels = displayPath(path).split("/").slice(1);
  const mobileLabel = shortenPath(displayPath(path), 30);
  return (
    <>
      <header className="mobile-topbar">
        <button className="icon-button" onClick={onMenu} aria-label="Open file browser"><List size={23} /></button>
        <button className="mobile-path" onClick={() => navigate({ path })} title={displayPath(path)}>
          {segments.length === 0
            ? <><span>~ $</span> cat welcome.org</>
            : <><span>{mobileLabel.slice(0, 1)}</span>{mobileLabel.slice(1)}</>}
        </button>
        <button className="icon-button" onClick={onSearch} aria-label="Search all files"><MagnifyingGlass size={22} /></button>
      </header>
      <nav className="desktop-pathbar" aria-label="Current path">
        <span className="pathbar-breadcrumb">
          <button onClick={() => navigate({ path: "/" })}>~</button>
          {segments.length === 0 ? (
            <span className="pathbar-home-command">
              <span>$</span>
              <button onClick={() => navigate({ path: "/welcome.org" })}>cat welcome.org</button>
            </span>
          ) : null}
          {segments.map((segment, index) => {
            const segmentPath = `/${segments.slice(0, index + 1).join("/")}`;
            return (
              <span key={segmentPath}>
                <span>/</span>
                <button onClick={() => navigate({ path: segmentPath })}>{labels[index] ?? segment}</button>
              </span>
            );
          })}
        </span>
      </nav>
    </>
  );
}
