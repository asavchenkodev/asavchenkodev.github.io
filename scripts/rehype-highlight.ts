import type { Element, ElementContent, Root } from "hast";
import { refractor } from "refractor";

const aliases: Record<string, string> = { sh: "bash", shell: "bash", emacs_lisp: "lisp", elisp: "lisp", "emacs-lisp": "lisp" };

function textOf(node: ElementContent): string {
  if (node.type === "text") return node.value;
  if (node.type === "element") return node.children.map(textOf).join("");
  return "";
}

function codeLanguage(code: Element): string | undefined {
  const className = code.properties.className;
  const classes = Array.isArray(className) ? className.map(String) : [];
  const language = classes.find((name) => name.startsWith("language-"))?.slice("language-".length).toLowerCase();
  if (!language) return undefined;
  const resolved = aliases[language] ?? language;
  return refractor.registered(resolved) ? resolved : undefined;
}

function visit(node: Root | Element): void {
  for (const child of node.children) {
    if (child.type !== "element") continue;
    if (child.tagName === "pre") {
      const code = child.children.find((item): item is Element => item.type === "element" && item.tagName === "code");
      const language = code ? codeLanguage(code) : undefined;
      if (code && language) {
        code.children = refractor.highlight(code.children.map(textOf).join(""), language).children as ElementContent[];
        continue;
      }
    }
    visit(child);
  }
}

/** Highlights fenced and #+begin_src blocks at build time so the client ships no highlighter for prose. */
export default function rehypeHighlight() {
  return (tree: Root) => visit(tree);
}
