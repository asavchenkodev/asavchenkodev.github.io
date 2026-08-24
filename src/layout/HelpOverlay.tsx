import { X } from "@phosphor-icons/react";

const bindings: [string, string][] = [
  ["j / k", "next / previous entry, or scroll"],
  ["h", "to the file tree; again goes up a folder"],
  ["l  RET", "open the entry under the cursor"],
  ["- / ^", "up to the parent folder"],
  ["gg / G", "first / last entry, top / bottom"],
  ["C-d / C-u", "half a page down / up"],
  ["q", "back"],
  ["/  s", "search file contents"],
  ["C-p", "find a file by name"],
  ["C-n / C-p", "next / previous result in search"],
  ["?", "this help"],
  ["Esc", "close"],
];

export function HelpOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="search-layer help-layer" role="dialog" aria-modal="true" aria-label="Keybindings">
      <button className="search-scrim" onClick={onClose} aria-label="Close help" />
      <section className="help-panel">
        <header>
          <span><span className="dashboard-prompt">$</span> describe-bindings</span>
          <button className="icon-button" onClick={onClose} aria-label="Close help"><X size={20} /></button>
        </header>
        <dl>
          {bindings.map(([keys, action]) => (
            <div key={keys + action}>
              <dt>{keys}</dt>
              <dd>{action}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
