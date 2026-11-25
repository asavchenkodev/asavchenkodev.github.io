(function exposeTextFormat(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.SyncReaderTextFormat = api;
})(typeof globalThis === "object" ? globalThis : null, () => {
  function validateDocument(doc) {
    const result = { errors: [], warnings: [] };
    const paragraphs = doc?.p || doc?.paragraphs;
    if (!doc || !Array.isArray(paragraphs)) {
      result.errors.push(issue("document", "Document must have a p array."));
      return result;
    }

    paragraphs.forEach((paragraph, paragraphIndex) => validateParagraph(paragraph, paragraphIndex, result));
    return result;
  }

  function validateDocuments(docs) {
    return (Array.isArray(docs) ? docs : [docs]).map((doc) => ({ doc, ...validateDocument(doc) }));
  }

  function validateParagraph(paragraph, paragraphIndex, result) {
    const path = `p[${paragraphIndex}]`;
    const sentences = getParagraphSentences(paragraph);
    if (!sentences.length) {
      result.errors.push(issue(path, "Paragraph must contain sentence rows."));
      return;
    }
    if (!isSentenceParagraph(paragraph)) {
      result.warnings.push(issue(path, "Legacy paragraph-level mapping is ambiguous. Use [id, [[RU sentence, DE sentence, pairs], ...]]."));
    }
    sentences.forEach((sentence, sentenceIndex) => validateSentence(sentence, `${path}.s[${sentenceIndex}]`, result));
  }

  function validateSentence(sentence, path, result) {
    if (!sentence.left || !sentence.right) {
      result.errors.push(issue(path, "Sentence row must contain RU and DE text."));
      return;
    }
    if (!Array.isArray(sentence.pairs)) {
      result.errors.push(issue(path, "Sentence row must contain a pairs array."));
      return;
    }
    validateSentenceSide(sentence.left, sentence.pairs, "left", "RU", path, result);
    validateSentenceSide(sentence.right, sentence.pairs, "right", "DE", path, result);
  }

  function validateSentenceSide(text, pairs, side, label, path, result) {
    const placements = [];
    pairs.forEach((pair, pairIndex) => {
      const parts = getPairParts(pair, side);
      parts.forEach((part) => {
        const placement = findPlacement(text, part, placements);
        if (!placement) {
          result.warnings.push(issue(`${path}.pairs[${pairIndex}]`, `${label} fragment is not a visible word or phrase in this sentence: "${part}".`));
          return;
        }
        placements.push(placement);
      });
    });

    const uncovered = uncoveredWords(text, placements);
    if (uncovered.length) {
      result.warnings.push(issue(path, `${label} has unconnected words: ${previewWords(uncovered)}.`));
    }
  }

  function getParagraphSentences(paragraph) {
    if (isSentenceParagraph(paragraph)) {
      const rows = Array.isArray(paragraph) ? paragraph[1] : (paragraph.s || paragraph.sentences);
      return rows.map(normalizeSentenceRow).filter(Boolean);
    }
    const fromArray = Array.isArray(paragraph);
    const left = fromArray ? paragraph[1] : (paragraph?.ru || paragraph?.left || "");
    const right = fromArray ? paragraph[2] : (paragraph?.de || paragraph?.right || "");
    const pairs = fromArray ? paragraph[3] : (paragraph?.pairs || paragraph?.a || []);
    return left && right ? [{ left: String(left), right: String(right), pairs: Array.isArray(pairs) ? pairs : [] }] : [];
  }

  function isSentenceParagraph(paragraph) {
    if (Array.isArray(paragraph)) return Array.isArray(paragraph[1]) && paragraph.length <= 2;
    return Array.isArray(paragraph?.s) || Array.isArray(paragraph?.sentences);
  }

  function normalizeSentenceRow(sentence) {
    if (Array.isArray(sentence)) {
      return { left: String(sentence[0] || ""), right: String(sentence[1] || ""), pairs: Array.isArray(sentence[2]) ? sentence[2] : [] };
    }
    if (!sentence || typeof sentence !== "object") return null;
    return {
      left: String(sentence.ru || sentence.left || ""),
      right: String(sentence.de || sentence.right || ""),
      pairs: Array.isArray(sentence.pairs || sentence.a) ? (sentence.pairs || sentence.a) : []
    };
  }

  function getPairParts(pair, side) {
    const fromArray = Array.isArray(pair);
    const value = side === "left"
      ? (fromArray ? pair[1] : (pair?.ru || pair?.left || ""))
      : (fromArray ? pair[0] : (pair?.de || pair?.right || ""));
    return visibleParts(value);
  }

  function visibleParts(value) {
    if (Array.isArray(value)) return value.flatMap(visibleParts).filter(Boolean);
    return value ? [String(value)] : [];
  }

  function findPlacement(text, phrase, placements) {
    const free = findFreePlacement(text, phrase, placements);
    if (free) return free;
    return placements.find((placement) => placement.value === phrase && text.slice(placement.index, placement.end) === phrase) || null;
  }

  function findFreePlacement(text, phrase, placements) {
    let start = 0;
    while (start < text.length) {
      const index = text.indexOf(phrase, start);
      if (index < 0) return null;
      const end = index + phrase.length;
      const overlaps = placements.some((placement) => index < placement.end && end > placement.index);
      if (!overlaps && hasPhraseBoundary(text, index, end)) return { value: phrase, index, end };
      start = index + 1;
    }
    return null;
  }

  function uncoveredWords(text, placements) {
    return Array.from(String(text || "").matchAll(/[\p{L}\p{N}-]+/gu))
      .filter((match) => {
        const start = match.index;
        const end = start + match[0].length;
        return !placements.some((placement) => start >= placement.index && end <= placement.end);
      })
      .map((match) => match[0]);
  }

  function hasPhraseBoundary(text, start, end) {
    return !isWordChar(text[start - 1]) && !isWordChar(text[end]);
  }

  function isWordChar(char) {
    return !!char && /[\p{L}\p{N}-]/u.test(char);
  }

  function previewWords(words) {
    const unique = [];
    words.forEach((word) => {
      if (!unique.includes(word)) unique.push(word);
    });
    const shown = unique.slice(0, 8).map((word) => `"${word}"`).join(", ");
    return unique.length > 8 ? `${shown} and ${unique.length - 8} more` : shown;
  }

  function issue(path, message) {
    return { path, message };
  }

  // Inline-link format: each sentence is written once per language and linked words
  // are marked in place, e.g. "DE: [Am Morgen]1 [öffnet]2 ..." / "RU: [Утром]1 [открывает]2 ...".
  // See FORMAT.md. Parsed into the sentence-scoped JSON document used everywhere else.
  const INLINE_META_KEYS = ["id", "title", "level", "topic", "source", "hintLanguage", "folderId"];
  const INLINE_NOTE_KINDS = { note: 2, tip: 2, form: 3, formtip: 3, sent: 4, sentence: 4, sentencetip: 4 };
  const INLINE_LINK = /\[([^\[\]]*)\](\d+(?:\s*,\s*\d+)*)?/g;

  function looksLikeJson(text) {
    return /^[\[{]/.test(stripCodeFences(text).trim());
  }

  function stripCodeFences(text) {
    return String(text || "").replace(/^﻿/, "").replace(/^\s*```[\w-]*\s*$/gm, "");
  }

  function parseInline(source) {
    const result = { doc: { p: [] }, errors: [], warnings: [] };
    const doc = result.doc;
    const lines = stripCodeFences(source).split(/\r?\n/);
    const paragraphIds = new Set();
    let paragraph = null;
    let row = null;

    const finishRow = () => {
      if (!row) return;
      const current = row;
      row = null;
      if (!current.de || !current.ru) {
        const missing = current.de ? "RU" : "DE";
        result.warnings.push(issue(`line ${current.line}`, `Sentence skipped: the ${missing} line is missing.`));
        return;
      }
      if (!paragraph) startParagraph("", current.line);
      paragraph.rows.push(current);
    };
    const startParagraph = (rawId, lineNumber) => {
      let id = rawId || `p${doc.p.length + 1}`;
      if (paragraphIds.has(id)) {
        const renamed = `${id}-${doc.p.length + 1}`;
        result.warnings.push(issue(`line ${lineNumber}`, `Paragraph id "${id}" is used twice; renamed to "${renamed}".`));
        id = renamed;
      }
      paragraphIds.add(id);
      paragraph = { id, rows: [] };
      doc.p.push(paragraph);
    };

    lines.forEach((rawLine, index) => {
      const lineNumber = index + 1;
      const line = cleanInlineLine(rawLine);
      if (!line) return;
      let match = line.match(/^==+\s*(.*?)\s*=*$/);
      if (match) {
        finishRow();
        startParagraph(match[1].replace(/\s+/g, "-"), lineNumber);
        return;
      }
      match = line.match(/^(DE|RU)\s*:\s*(.*)$/i);
      if (match) {
        const side = match[1].toLowerCase();
        if (row && row[side]) finishRow();
        if (!row) row = { line: lineNumber, notes: new Map() };
        row[side] = parseInlineSentence(match[2], lineNumber, side.toUpperCase(), result);
        return;
      }
      match = line.match(/^(\d+)\s*(note|tip|form|formtip|sent|sentence|sentencetip)\s*:\s*(.*)$/i);
      if (match) {
        if (!row) {
          result.warnings.push(issue(`line ${lineNumber}`, "Note has no sentence above it."));
          return;
        }
        const linkId = Number(match[1]);
        const notes = row.notes.get(linkId) || { line: lineNumber };
        const slot = INLINE_NOTE_KINDS[match[2].toLowerCase()];
        notes[slot] = notes[slot] ? `${notes[slot]} ${match[3].trim()}` : match[3].trim();
        row.notes.set(linkId, notes);
        return;
      }
      match = line.match(/^([A-Za-z]+)\s*:\s*(.*)$/);
      if (match && !doc.p.length && !row) {
        const key = INLINE_META_KEYS.find((item) => item.toLowerCase() === match[1].toLowerCase());
        if (key) doc[key] = match[2].trim();
        else result.warnings.push(issue(`line ${lineNumber}`, `Unknown header field "${match[1]}".`));
        return;
      }
      result.warnings.push(issue(`line ${lineNumber}`, `Line not understood: "${preview(line)}".`));
    });
    finishRow();

    const paragraphs = doc.p.filter((item) => item.rows.length).map((item) => [item.id, item.rows.map((current) => buildInlineRow(current, result))]);
    delete doc.p;
    doc.p = paragraphs;
    if (!doc.p.length) result.errors.push(issue("document", "No sentences found. Each sentence needs a DE: line and an RU: line."));
    result.warnings.sort((a, b) => lineOf(a) - lineOf(b));
    return result;
  }

  function cleanInlineLine(line) {
    return String(line || "")
      .replace(/ /g, " ")
      .trim()
      .replace(/^(?:[-*•>]\s+)+/, "")
      .replace(/^\*\*([^*]+?)\*\*\s*/, "$1 ")
      .replace(/^\*\*(DE|RU)\s*:\s*\*\*/i, "$1:")
      .trim();
  }

  function parseInlineSentence(body, lineNumber, label, result) {
    const sentence = { text: "", links: new Map(), line: lineNumber };
    let last = 0;
    let match;
    INLINE_LINK.lastIndex = 0;
    while ((match = INLINE_LINK.exec(body))) {
      sentence.text += stray(body.slice(last, match.index), lineNumber, label, result);
      const start = sentence.text.length;
      const fragment = match[1].trim();
      sentence.text += match[1];
      last = INLINE_LINK.lastIndex;
      if (!fragment) continue;
      if (!match[2]) {
        result.warnings.push(issue(`line ${lineNumber}`, `${label} [${fragment}] has no link number.`));
        continue;
      }
      const index = start + match[1].indexOf(fragment);
      match[2].split(",").map((item) => Number(item.trim())).forEach((linkId) => {
        const key = linkId === 0 ? `0:${index}` : linkId;
        const spans = sentence.links.get(key) || [];
        spans.push({ value: fragment, index });
        sentence.links.set(key, spans);
      });
    }
    sentence.text += stray(body.slice(last), lineNumber, label, result);
    const leading = sentence.text.length - sentence.text.trimStart().length;
    sentence.text = sentence.text.trim();
    sentence.links.forEach((spans) => spans.forEach((span) => {
      span.index -= leading;
    }));
    return sentence;
  }

  function stray(text, lineNumber, label, result) {
    if (/[\[\]]/.test(text)) {
      result.warnings.push(issue(`line ${lineNumber}`, `${label} has an unclosed or stray bracket near "${preview(text.trim())}".`));
      return text.replace(/[\[\]]/g, "");
    }
    return text;
  }

  function buildInlineRow(row, result) {
    const numbered = new Set();
    [row.de, row.ru].forEach((sentence) => sentence.links.forEach((_, key) => {
      if (typeof key === "number") numbered.add(key);
    }));
    const entries = [];
    Array.from(numbered).sort((a, b) => a - b).forEach((linkId) => {
      const de = row.de.links.get(linkId) || [];
      const ru = row.ru.links.get(linkId) || [];
      if (!de.length || !ru.length) {
        const known = (de.length ? de : ru).map((span) => span.value).join(" ");
        result.warnings.push(issue(`line ${row.line}`, `Link ${linkId} has no ${de.length ? "RU" : "DE"} side ("${known}").`));
      }
      const pair = [packParts(de), packParts(ru)];
      const notes = row.notes.get(linkId) || {};
      [2, 3, 4].forEach((slot) => {
        pair[slot] = notes[slot] || "";
      });
      while (pair.length > 2 && !pair[pair.length - 1]) pair.pop();
      entries.push({ pair, de, ru });
    });
    row.de.links.forEach((spans, key) => {
      if (typeof key !== "number") entries.push({ pair: [packParts(spans), ""], de: spans, ru: [] });
    });
    row.ru.links.forEach((spans, key) => {
      if (typeof key !== "number") entries.push({ pair: ["", packParts(spans)], de: [], ru: spans });
    });
    row.notes.forEach((notes, linkId) => {
      if (!numbered.has(linkId)) result.warnings.push(issue(`line ${notes.line}`, `Note for link ${linkId}, but no word has that number.`));
    });

    // The JSON document stores fragments, not positions: the reader re-finds each fragment in pair order.
    // When a word repeats in a sentence, order the pairs so it is re-found where it was marked.
    let ordered = entries;
    if (!placementsMatch(row, ordered)) {
      ordered = entries.slice().sort((a, b) => firstIndex(a.de) - firstIndex(b.de));
      if (!placementsMatch(row, ordered)) {
        result.warnings.push(issue(`line ${row.line}`, "A repeated word may highlight the wrong occurrence; check the link numbers."));
      }
    }
    const pairs = ordered.map((entry) => entry.pair);
    validateSentenceSide(row.de.text, pairs, "right", "DE", `line ${row.de.line}`, result);
    validateSentenceSide(row.ru.text, pairs, "left", "RU", `line ${row.ru.line}`, result);
    return [row.ru.text, row.de.text, pairs];
  }

  function placementsMatch(row, entries) {
    return [["de", row.de.text], ["ru", row.ru.text]].every(([side, text]) => {
      const placements = [];
      return entries.every((entry) => entry[side].every((span) => {
        const placement = findPlacement(text, span.value, placements);
        if (!placement) return false;
        placements.push(placement);
        return placement.index === span.index;
      }));
    });
  }

  function firstIndex(spans) {
    return spans.length ? spans[0].index : Number.MAX_SAFE_INTEGER;
  }

  function packParts(spans) {
    if (!spans.length) return "";
    return spans.length === 1 ? spans[0].value : spans.map((span) => span.value);
  }

  function serializeInline(doc) {
    const problems = [];
    const lines = [];
    INLINE_META_KEYS.forEach((key) => {
      if (doc[key] !== undefined && doc[key] !== null && doc[key] !== "") lines.push(`${key}: ${String(doc[key]).replace(/\s*\n\s*/g, " ")}`);
    });
    (doc.p || doc.paragraphs || []).forEach((paragraph, paragraphIndex) => {
      const id = (Array.isArray(paragraph) ? paragraph[0] : paragraph.id) || `p${paragraphIndex + 1}`;
      lines.push("", `== ${id}`);
      getParagraphSentences(paragraph).forEach((sentence, sentenceIndex) => {
        const where = `${id} sentence ${sentenceIndex + 1}`;
        if (sentenceIndex) lines.push("");
        lines.push(`DE: ${markSentence(sentence.right, sentence.pairs, "right", where, problems)}`);
        lines.push(`RU: ${markSentence(sentence.left, sentence.pairs, "left", where, problems)}`);
        sentence.pairs.forEach((pair, pairIndex) => {
          const notes = Array.isArray(pair) ? pair.slice(2) : [pair.tip || pair.note, pair.formTip, pair.sentenceTip || pair.sentenceNote];
          ["note", "form", "sent"].forEach((kind, slot) => {
            const value = String(notes[slot] || "").replace(/\s*\n\s*/g, " ").trim();
            if (value) lines.push(`${pairIndex + 1} ${kind}: ${value}`);
          });
        });
      });
    });
    return { text: `${lines.join("\n").trim()}\n`, problems };
  }

  function markSentence(text, pairs, side, where, problems) {
    const spans = [];
    pairs.forEach((pair, pairIndex) => {
      const otherSide = getPairParts(pair, side === "left" ? "right" : "left");
      const linkId = otherSide.length ? pairIndex + 1 : 0;
      getPairParts(pair, side).forEach((part) => {
        const free = findFreePlacement(text, part, spans);
        if (free) {
          spans.push({ ...free, ids: [linkId] });
          return;
        }
        const shared = spans.find((span) => span.value === part);
        if (shared) shared.ids.push(linkId);
        else problems.push(`${where}: "${part}" is not in the sentence and was dropped.`);
      });
    });
    if (/[\[\]]/.test(text)) problems.push(`${where}: sentence contains [ or ], which the inline format cannot store.`);
    spans.sort((a, b) => a.index - b.index);
    let out = "";
    let position = 0;
    spans.forEach((span) => {
      out += `${text.slice(position, span.index)}[${span.value}]${span.ids.join(",")}`;
      position = span.end;
    });
    return out + text.slice(position);
  }

  function parseTextSource(source) {
    if (!looksLikeJson(source)) return parseInline(source);
    let data;
    try {
      data = JSON.parse(stripCodeFences(source).trim());
    } catch (error) {
      return { doc: null, errors: [issue("JSON", error.message)], warnings: [] };
    }
    const doc = Array.isArray(data) ? data[0] : data;
    return { doc, ...validateDocument(doc) };
  }

  function lineOf(entry) {
    const match = String(entry.path).match(/^line (\d+)/);
    return match ? Number(match[1]) : 0;
  }

  function preview(text) {
    const value = String(text || "");
    return value.length > 40 ? `${value.slice(0, 40)}…` : value;
  }

  return {
    getParagraphSentences,
    isSentenceParagraph,
    looksLikeJson,
    parseInline,
    parseTextSource,
    serializeInline,
    validateDocument,
    validateDocuments,
    visibleParts
  };
});
