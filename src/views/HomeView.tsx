import type { ContentEntry, ContentManifest, DashboardListItem } from "../../shared/content";
import type { SiteRoute } from "../filesystem/path";
import { OrgRenderer } from "../renderers/OrgRenderer";

interface HomeViewProps {
  manifest: ContentManifest;
  navigate: (route: SiteRoute) => void;
}

interface TreeRowProps {
  item: DashboardListItem;
  entry?: ContentEntry;
  connector: string;
  navigate: (route: SiteRoute) => void;
}

function TreeRow({ item, entry, connector, navigate }: TreeRowProps) {
  const folder = entry?.kind === "directory" || item.label.endsWith("/");
  const label = folder && !item.label.endsWith("/") ? `${item.label}/` : item.label;
  return (
    <button
      className={`dashboard-tree-row${folder ? " is-folder" : ""}`}
      onClick={() => navigate({ path: item.path })}
      data-dired-entry
      data-entry-path={item.path}
    >
      <span className="dashboard-tree-connector" aria-hidden="true">{connector}</span>
      <strong>{label}</strong>
      {item.description ? <small>{item.description}</small> : null}
    </button>
  );
}

function hasNextSibling(items: DashboardListItem[], index: number): boolean {
  const depth = items[index].depth;
  for (let next = index + 1; next < items.length; next += 1) {
    if (items[next].depth < depth) return false;
    if (items[next].depth === depth) return true;
  }
  return false;
}

function treeConnector(items: DashboardListItem[], index: number): string {
  const item = items[index];
  let prefix = "";
  for (let depth = 0; depth < item.depth; depth += 1) {
    let ancestor = -1;
    for (let previous = index - 1; previous >= 0; previous -= 1) {
      if (items[previous].depth === depth) {
        ancestor = previous;
        break;
      }
    }
    prefix += ancestor >= 0 && hasNextSibling(items, ancestor) ? "│   " : "    ";
  }
  return `${prefix}${hasNextSibling(items, index) ? "├──" : "└──"}`;
}

export function HomeView({ manifest, navigate }: HomeViewProps) {
  const welcome = manifest.entries["/welcome.org"];
  const dashboard = welcome?.dashboard;
  const items = dashboard?.items ?? [];
  const introHtml = welcome?.dashboardIntroHtml ?? welcome?.renderedHtml ?? "";

  return (
    <div className="home-view home-dashboard">
      {welcome?.kind === "org" && introHtml ? (
        <div className="dashboard-welcome">
          <OrgRenderer
            path={welcome.path}
            html={introHtml}
            navigate={navigate}
          />
        </div>
      ) : null}

      {dashboard ? (
        <section className="dashboard-listing" aria-labelledby="dashboard-listing-title">
          <h2 id="dashboard-listing-title" className="dashboard-command">
            <span className="dashboard-prompt">$</span>
            <span>{dashboard.command}</span>
          </h2>
          <div className="dashboard-tree">
            {items.map((item, index) => (
              <TreeRow
                key={`${item.path}-${index}`}
                item={item}
                entry={manifest.entries[item.path]}
                connector={treeConnector(items, index)}
                navigate={navigate}
              />
            ))}
          </div>
        </section>
      ) : null}

      {welcome?.kind === "org" && welcome.dashboardAfterHtml ? (
        <div className="dashboard-welcome dashboard-after">
          <OrgRenderer path={welcome.path} html={welcome.dashboardAfterHtml} navigate={navigate} />
        </div>
      ) : null}
    </div>
  );
}
