// GoatCounter counts the first load itself (index.html adds the hash to the path);
// hash navigation inside the app is counted here.
type GoatCounter = { count?: (vars?: { path?: string }) => void };

let lastPath = window.location.pathname + window.location.hash;

export function countPageview() {
  const path = window.location.pathname + window.location.hash;
  if (path === lastPath) return;
  lastPath = path;
  (window as Window & { goatcounter?: GoatCounter }).goatcounter?.count?.({ path });
}
