import type { SearchDocument } from "../../shared/content";

let request: Promise<SearchDocument[]> | null = null;

/** The search index is only needed once someone searches, so it loads on first use. */
export function loadSearchDocuments(): Promise<SearchDocument[]> {
  request ??= fetch("/search-index.json").then((response) => {
    if (!response.ok) throw new Error("The search index could not be loaded.");
    return response.json() as Promise<SearchDocument[]>;
  });
  request.catch(() => {
    request = null;
  });
  return request;
}
