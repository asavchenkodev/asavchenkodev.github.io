import { WarningCircle } from "@phosphor-icons/react";
import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { SiteRoute } from "./filesystem/path";
import { parentRoute, parseHash, routeHref } from "./filesystem/path";
import { displayPath } from "../shared/display";
import { useContent } from "./filesystem/useContent";
import { countPageview } from "./analytics";
import { HelpOverlay } from "./layout/HelpOverlay";
import { MobileDrawer } from "./layout/MobileDrawer";
import { PathBar } from "./layout/PathBar";
import { Sidebar } from "./layout/Sidebar";
import type { SearchMode } from "./search/SearchOverlay";
import { DirectoryView } from "./views/DirectoryView";
import { FileView } from "./views/FileView";
import { HomeView } from "./views/HomeView";

const loadSearch = () => import("./search/SearchOverlay");
const SearchOverlay = lazy(() => loadSearch().then((module) => ({ default: module.SearchOverlay })));

type Panel = "sidebar" | "content";

interface FocusTarget {
  panel: Panel;
  path?: string;
}

const desktopQuery = "(min-width: 761px)";
const isDesktop = () => window.matchMedia(desktopQuery).matches;

function panelForElement(element: Element | null): Panel | null {
  if (element?.closest('[data-panel="sidebar"]')) return "sidebar";
  if (element?.closest('[data-panel="content"]')) return "content";
  return null;
}

function panelEntries(panel: Panel): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(`[data-panel="${panel}"] [data-dired-entry]`))
    .filter((entry) => entry.offsetParent !== null);
}

function focusPanel(panel: Panel, preventScroll = false) {
  const entries = panelEntries(panel);
  const selected = entries.find((entry) => entry.dataset.routeSelected === "true") ?? entries[0];
  if (selected) {
    selected.focus({ preventScroll });
  } else if (panel === "content") {
    document.querySelector<HTMLElement>("#main-content")?.focus({ preventScroll });
  }
}

function focusEntryPath(target: FocusTarget): boolean {
  if (!target.path) return false;
  const entry = document.querySelector<HTMLElement>(
    `[data-panel="${target.panel}"] [data-entry-path="${CSS.escape(target.path)}"]`,
  );
  if (!entry || entry.offsetParent === null) return false;
  entry.focus({ preventScroll: true });
  entry.scrollIntoView({ block: "nearest" });
  return true;
}

export default function App() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  const { manifest, loading, error } = useContent();
  const [searchMode, setSearchMode] = useState<SearchMode | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<Panel>("content");
  const pendingFocus = useRef<FocusTarget | null>(null);
  const historyDepth = useRef(0);
  const lastKey = useRef({ key: "", time: 0 });

  useEffect(() => {
    // Back/forward still arrive as hash changes; in-app navigation updates the route directly.
    const onHashChange = () => {
      setRoute(parseHash(window.location.hash));
      countPageview();
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    // Fetch the search chunk while the reader is idle so the first `/` opens instantly.
    const idle = window.requestIdleCallback ?? ((callback: () => void) => window.setTimeout(callback, 1200));
    idle(() => void loadSearch());
  }, []);

  // Rendering synchronously means keys pressed right after a navigation act on the new page.
  const navigate = useCallback((nextRoute: SiteRoute, focus?: FocusTarget) => {
    const href = routeHref(nextRoute);
    if (window.location.hash !== href) {
      window.history.pushState(null, "", href);
      historyDepth.current += 1;
    }
    pendingFocus.current = focus ?? null;
    flushSync(() => setRoute(parseHash(href)));
    countPageview();
  }, []);

  const goToParent = useCallback((panel: Panel) => {
    if (route.path === "/") return;
    // Like Dired's `^`: land on the parent with point on the directory just left.
    navigate({ path: parentRoute(route.path) }, { panel, path: route.path });
  }, [navigate, route.path]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const modifier = event.ctrlKey || event.metaKey;
      if (modifier && event.key.toLowerCase() === "p") {
        event.preventDefault();
        setHelpOpen(false);
        setSearchMode("files");
        return;
      }
      if (modifier && event.shiftKey && event.key.toLowerCase() === "f") {
        event.preventDefault();
        setHelpOpen(false);
        setSearchMode("content");
        return;
      }
      if (event.key === "Escape") {
        setSearchMode(null);
        setHelpOpen(false);
        setDrawerOpen(false);
        return;
      }
      if (searchMode || event.altKey || target.closest("input, textarea, select, [contenteditable=true]")) return;
      if (helpOpen) {
        if (event.key === "?" || event.key === "q") {
          event.preventDefault();
          setHelpOpen(false);
        }
        return;
      }

      if (event.ctrlKey && !event.metaKey && (event.key === "d" || event.key === "u")) {
        event.preventDefault();
        const half = Math.round(window.innerHeight / 2);
        window.scrollBy({ top: event.key === "d" ? half : -half, behavior: "instant" });
        return;
      }
      if (modifier) return;

      const focusedPanel = panelForElement(document.activeElement);
      const keyboardPanel = focusedPanel ?? activePanel;
      const focused = document.activeElement as HTMLElement | null;
      const previousKey = lastKey.current;
      lastKey.current = { key: event.key, time: event.timeStamp };

      if (event.key === "s" || event.key === "/") {
        event.preventDefault();
        setSearchMode("content");
      } else if (event.key === "?") {
        event.preventDefault();
        setHelpOpen(true);
      } else if ((event.key === "h" || event.key === "ArrowLeft") && isDesktop()) {
        event.preventDefault();
        if (keyboardPanel === "content") {
          setActivePanel("sidebar");
          focusPanel("sidebar");
        } else {
          goToParent("sidebar");
        }
      } else if (event.key === "-" || event.key === "^") {
        event.preventDefault();
        goToParent(isDesktop() ? keyboardPanel : "content");
      } else if (event.key === "q") {
        event.preventDefault();
        if (historyDepth.current > 0) {
          historyDepth.current -= 1;
          window.history.back();
        } else {
          goToParent(keyboardPanel);
        }
      } else if (event.key === "j" || event.key === "k") {
        event.preventDefault();
        const entries = panelEntries(keyboardPanel);
        if (!entries.length) {
          window.scrollBy({ top: event.key === "j" ? 76 : -76, behavior: "instant" });
          return;
        }
        const focusedIndex = entries.indexOf(focused as HTMLElement);
        const selectedIndex = entries.findIndex((entry) => entry.dataset.routeSelected === "true");
        const currentIndex = focusedIndex >= 0 ? focusedIndex : selectedIndex;
        const nextIndex = event.key === "j"
          ? Math.min(currentIndex + 1, entries.length - 1)
          : Math.max(currentIndex < 0 ? entries.length - 1 : currentIndex - 1, 0);
        entries[nextIndex]?.focus();
      } else if (event.key === "G" || (event.key === "g" && previousKey.key === "g" && event.timeStamp - previousKey.time < 600)) {
        event.preventDefault();
        lastKey.current = { key: "", time: 0 };
        const toEnd = event.key === "G";
        const entries = panelEntries(keyboardPanel);
        if (keyboardPanel === "content" || !entries.length) {
          window.scrollTo({ top: toEnd ? document.documentElement.scrollHeight : 0, behavior: "instant" });
        }
        const entry = toEnd ? entries.at(-1) : entries[0];
        entry?.focus({ preventScroll: keyboardPanel === "content" });
      } else if (event.key === "l" || event.key === "ArrowRight" || event.key === "Enter") {
        const onEntry = focused?.matches("[data-dired-entry]");
        const alreadyOpen = keyboardPanel === "sidebar" && focused?.dataset.routeSelected === "true";
        if (event.key !== "Enter" && isDesktop() && (alreadyOpen || (keyboardPanel === "sidebar" && !onEntry))) {
          event.preventDefault();
          setActivePanel("content");
          focusPanel("content");
        } else if (onEntry) {
          event.preventDefault();
          focused?.click();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePanel, goToParent, helpOpen, searchMode]);

  useEffect(() => {
    const onFocusIn = (event: FocusEvent) => {
      const panel = panelForElement(event.target instanceof Element ? event.target : null);
      if (panel) setActivePanel(panel);
    };
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, []);

  useEffect(() => {
    document.title = `Aleksandr Savchenko · ${route.path === "/" ? "/home/asv" : displayPath(route.path)}`;
  }, [route.path]);

  useLayoutEffect(() => {
    if (loading) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    const pending = pendingFocus.current;
    pendingFocus.current = null;
    if (pending && focusEntryPath(pending)) return;
    // Touch layouts get no keyboard cursor: an outlined first row reads as a stray selection.
    if (!isDesktop()) return;
    focusPanel(pending?.panel ?? activePanel, true);
    // Keep focus in the chosen panel when route rendering replaces its focused node.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, route.path]);

  if (loading) {
    return <div className="app-status"><span className="status-cursor" /> Mounting /home/asv…</div>;
  }

  if (error || !manifest) {
    return (
      <div className="app-status app-error">
        <WarningCircle size={24} />
        <div><strong>The site content did not mount.</strong><p>{error}</p></div>
      </div>
    );
  }

  const entry = manifest.entries[route.path];
  const renderView = () => {
    if (route.path === "/") return <HomeView manifest={manifest} navigate={navigate} />;
    if (!entry) {
      return (
        <div className="not-found">
          <p className="eyebrow">404 · path not found</p>
          <h1>{route.path}</h1>
          <p>This file is not exposed in the public filesystem.</p>
          <button className="text-link" onClick={() => navigate({ path: "/" })}>Return to /home/asv</button>
        </div>
      );
    }
    if (entry.kind === "directory") {
      return <DirectoryView entry={entry} manifest={manifest} navigate={navigate} />;
    }
    return <FileView entry={entry} navigate={navigate} heading={route.heading} page={route.page} />;
  };

  return (
    <div className="site-shell">
      <Sidebar
        manifest={manifest}
        currentPath={route.path}
        navigate={navigate}
        active={activePanel === "sidebar"}
        onActivate={() => setActivePanel("sidebar")}
      />
      <div
        className={`content-shell${activePanel === "content" ? " is-active-panel" : ""}`}
        data-panel="content"
        onPointerDown={(event) => {
          setActivePanel("content");
          const target = event.target instanceof Element ? event.target : null;
          const interactive = target?.closest("a, button, input, textarea, select, summary, [contenteditable=true], [data-dired-entry]");
          if (!interactive) {
            window.requestAnimationFrame(() => {
              document.querySelector<HTMLElement>("#main-content")?.focus({ preventScroll: true });
            });
          }
        }}
      >
        <PathBar
          path={route.path}
          navigate={navigate}
          onMenu={() => setDrawerOpen(true)}
          onSearch={() => setSearchMode("content")}
        />
        <main id="main-content" key={route.path} tabIndex={-1}>{renderView()}</main>
      </div>
      <MobileDrawer
        open={drawerOpen}
        manifest={manifest}
        currentPath={route.path}
        navigate={navigate}
        onClose={() => setDrawerOpen(false)}
      />
      {searchMode ? (
        <Suspense fallback={null}>
          <SearchOverlay
            mode={searchMode}
            manifest={manifest}
            navigate={navigate}
            onClose={() => setSearchMode(null)}
          />
        </Suspense>
      ) : null}
      {helpOpen ? <HelpOverlay onClose={() => setHelpOpen(false)} /> : null}
    </div>
  );
}
