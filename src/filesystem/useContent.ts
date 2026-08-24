import { useEffect, useState } from "react";
import type { ContentManifest } from "../../shared/content";

interface ContentState {
  manifest: ContentManifest | null;
  loading: boolean;
  error: string | null;
}

export function useContent(): ContentState {
  const [state, setState] = useState<ContentState>({ manifest: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    // index.html preloads the manifest, so this fetch is normally served from that request.
    fetch("/content-manifest.json")
      .then((response) => {
        if (!response.ok) throw new Error("The filesystem manifest could not be loaded.");
        return response.json() as Promise<ContentManifest>;
      })
      .then((manifest) => {
        if (!cancelled) setState({ manifest, loading: false, error: null });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            manifest: null,
            loading: false,
            error: error instanceof Error ? error.message : "Content could not be loaded.",
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
