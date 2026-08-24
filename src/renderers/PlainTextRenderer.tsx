import { useEffect, useState } from "react";
import { oneDark, SyntaxHighlighter } from "./highlighter";

interface PlainTextRendererProps {
  sourceUrl: string;
  language?: string;
}

export function PlainTextRenderer({ sourceUrl, language = "text" }: PlainTextRendererProps) {
  const [source, setSource] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(sourceUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("This file could not be loaded.");
        return response.text();
      })
      .then(setSource)
      .catch((caught: unknown) => {
        if ((caught as { name?: string }).name !== "AbortError") {
          setError(caught instanceof Error ? caught.message : "This file could not be loaded.");
        }
      });
    return () => controller.abort();
  }, [sourceUrl]);

  if (error) return <p className="document-error">{error}</p>;
  if (!source) return <div className="document-loading">Reading file…</div>;
  return (
    <div className="source-viewer">
      <SyntaxHighlighter language={language} style={oneDark} showLineNumbers wrapLongLines={false}>
        {source}
      </SyntaxHighlighter>
    </div>
  );
}
