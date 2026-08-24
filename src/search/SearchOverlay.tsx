import { ArrowDown, ArrowUp, FileMagnifyingGlass, KeyReturn, MagnifyingGlass, X } from "@phosphor-icons/react";
import MiniSearch from "minisearch";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ContentManifest, SearchDocument } from "../../shared/content";
import { FileIcon } from "../components/FileIcon";
import { loadSearchDocuments } from "./searchIndex";
import type { SiteRoute } from "../filesystem/path";

export type SearchMode = "files" | "content";

interface SearchOverlayProps {
  mode: SearchMode;
  manifest: ContentManifest;
  navigate: (route: SiteRoute) => void;
  onClose: () => void;
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "ig"));
  return <>{parts.map((part, index) => part.toLowerCase() === query.trim().toLowerCase() ? <mark key={index}>{part}</mark> : part)}</>;
}

export function SearchOverlay({ mode, manifest, navigate, onClose }: SearchOverlayProps) {
  const [documents, setDocuments] = useState<SearchDocument[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    let cancelled = false;
    loadSearchDocuments()
      .then((loaded) => { if (!cancelled) setDocuments(loaded); })
      .catch((caught: unknown) => {
        if (!cancelled) setLoadError(caught instanceof Error ? caught.message : "The search index could not be loaded.");
      });
    return () => { cancelled = true; };
  }, []);

  const indexedDocuments = useMemo(
    () => !documents ? [] : mode === "content" ? documents.filter((document) => document.kind !== "pdf") : documents,
    [documents, mode],
  );
  const documentById = useMemo(
    () => new Map(indexedDocuments.map((document) => [document.id, document])),
    [indexedDocuments],
  );
  const engine = useMemo(() => {
    const miniSearch = new MiniSearch<SearchDocument>({
      fields: ["filename", "title", "heading", "tags", "path", "body"],
      storeFields: ["id"],
      idField: "id",
    });
    miniSearch.addAll(indexedDocuments);
    return miniSearch;
  }, [indexedDocuments]);

  const results = useMemo(() => {
    if (!query.trim()) {
      return indexedDocuments
        .filter((document) => !document.headingId && !document.page && !/README\./i.test(document.filename))
        .slice(0, 9);
    }
    const fields = mode === "files" ? ["filename", "title", "path", "tags"] : undefined;
    const seen = new Set<string>();
    return engine
      .search(query, {
        fields,
        prefix: true,
        fuzzy: 0.23,
        combineWith: "AND",
        boost: {
          filename: 12,
          title: 9,
          heading: 7,
          tags: 5,
          path: 3,
          body: 1,
        },
      })
      .map((result) => documentById.get(String(result.id)))
      .filter((document): document is SearchDocument => Boolean(document))
      .filter((document) => {
        const label = document.heading || document.title || document.filename;
        const key = `${document.path}::${label.toLowerCase()}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 14);
  }, [documentById, engine, indexedDocuments, mode, query]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelected(0);
  }, [query, mode]);

  const openResult = (document: SearchDocument | undefined) => {
    if (!document) return;
    navigate({ path: document.path, heading: document.headingId, page: document.page });
    onClose();
  };

  const selectedDocument = results[selected];
  const selectedEntry = selectedDocument ? manifest.entries[selectedDocument.path] : undefined;

  return (
    <div className="search-layer" role="dialog" aria-modal="true" aria-label={mode === "files" ? "Find a file" : "Search file contents"}>
      <button className="search-scrim" onClick={onClose} aria-label="Close search" />
      <section className="search-panel">
        <header className="search-header">
          {mode === "files" ? <MagnifyingGlass size={22} /> : <FileMagnifyingGlass size={22} />}
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              const key = event.key.toLowerCase();
              const next = event.key === "ArrowDown" || (event.ctrlKey && (key === "n" || key === "j"));
              const previous = event.key === "ArrowUp" || (event.ctrlKey && (key === "p" || key === "k"));
              if (next || previous) {
                // Keep C-p from reaching the global "find file" binding.
                event.stopPropagation();
              }
              if (next) {
                event.preventDefault();
                setSelected((value) => Math.min(value + 1, results.length - 1));
              } else if (previous) {
                event.preventDefault();
                setSelected((value) => Math.max(value - 1, 0));
              } else if (event.key === "Enter") {
                event.preventDefault();
                openResult(selectedDocument);
              } else if (event.key === "Escape") {
                onClose();
              }
            }}
            placeholder={mode === "files" ? "Find a file by name or path…" : "Search headings, tags, and document text…"}
            aria-label={mode === "files" ? "Find a file" : "Search contents"}
          />
          <button className="icon-button" onClick={onClose} aria-label="Close search"><X size={22} /></button>
        </header>
        <div className="search-context">
          <span>{mode === "files" ? "files" : "contents"}</span>
          <span>{results.length} result{results.length === 1 ? "" : "s"}</span>
        </div>
        <div className="search-body">
          <div className="search-results" role="listbox">
            {results.length ? results.map((document, index) => {
              const entry = manifest.entries[document.path];
              if (!entry) return null;
              return (
                <button
                  key={document.id}
                  className={`search-result${selected === index ? " is-selected" : ""}`}
                  onMouseEnter={() => setSelected(index)}
                  onClick={() => openResult(document)}
                  role="option"
                  aria-selected={selected === index}
                >
                  <FileIcon kind={entry.kind} active={selected === index} />
                  <span className="search-result-copy">
                    <strong><Highlight text={document.heading || document.title || document.filename} query={query} /></strong>
                    <span>{document.path}{document.page ? ` · page ${document.page}` : ""}</span>
                    <small><Highlight text={document.snippet.slice(0, 180)} query={query} /></small>
                  </span>
                </button>
              );
            }) : (
              <div className="search-empty">
                {loadError ?? (documents ? `No exposed files match “${query}”.` : "Reading the index…")}
              </div>
            )}
          </div>
          <aside className="search-preview">
            {selectedDocument && selectedEntry ? (
              <>
                <FileIcon kind={selectedEntry.kind} size={28} active />
                <p className="preview-path">{selectedDocument.path}</p>
                <h2>{selectedDocument.heading || selectedDocument.title}</h2>
                <p>{selectedDocument.snippet}</p>
                {selectedEntry.metadata.tags?.length ? (
                  <div className="tag-list">{selectedEntry.metadata.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
                ) : null}
              </>
            ) : null}
          </aside>
        </div>
        <footer className="search-footer">
          <span><ArrowUp size={14} /><ArrowDown size={14} /> C-n C-p navigate</span>
          <span><KeyReturn size={14} /> open</span>
          <span>esc close</span>
        </footer>
      </section>
    </div>
  );
}
