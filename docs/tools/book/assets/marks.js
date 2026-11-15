/* Text-selection marks for HTML guides (guides/html/assets/marks.js).
   Select any word, phrase or line inside the guide and a small popover offers
   Unclear / Complex / Note. Marks are stored in localStorage per guide, shown
   as subtle highlights, listed in a side panel, and exported as JSON
   (format "guide-marks/1", documented in plan/HTML_GUIDE_FORMAT.md).
   Load after guide.js: <script src="assets/marks.js" defer></script>. */
(function () {
  'use strict';

  const TAGS = [
    { id: 'unclear', label: 'Unclear', key: '1' },
    { id: 'complex', label: 'Complex', key: '2' },
    { id: 'note', label: 'Note', key: '3' }
  ];
  const FORMAT = 'guide-marks/1';
  const CTX = 40;          // characters of prefix / suffix kept for re-anchoring
  const MAX_QUOTE = 4000;  // longer selections are ignored
  const SKIP = '.gm-ui, script, style, noscript, svg, input, textarea, select, button, [data-no-mark]';
  const SECTION = 'section[id], [data-sid]';
  const BLOCK = 'p, li, td, th, dd, dt, figcaption, blockquote, h1, h2, h3, h4, h5, summary, pre';

  const meta = n => { const m = document.querySelector('meta[name="' + n + '"]'); return m ? m.content : ''; };
  const guideId = meta('guide-id') || decodeURIComponent(location.pathname.split('/').pop()).replace(/\.html?$/i, '') || 'guide';
  const KEY = 'guide-marks:' + guideId;
  const OPT_KEY = 'guide-marks-options';

  let root, marks = [], opts = {}, orphans = new Set();
  let pop, panel, fab, toastEl, pending = null, editing = null, filter = null, lastPointer = 'mouse';

  /* ---------- storage ---------- */
  function load() {
    try { const d = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(d) ? d : (d.marks || []); }
    catch (e) { return []; }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(marks)); }
    catch (e) { toast('Could not save to browser storage. Use Export to keep your marks.'); }
    refreshPanel();
  }
  function loadOpts() {
    try { return Object.assign({ popover: true, show: true }, JSON.parse(localStorage.getItem(OPT_KEY) || '{}')); }
    catch (e) { return { popover: true, show: true }; }
  }
  function saveOpts() { try { localStorage.setItem(OPT_KEY, JSON.stringify(opts)); } catch (e) { /* ignore */ } }

  /* ---------- text model: a section's text is the concatenation of its markable text nodes ---------- */
  function textNodes(scope) {
    const out = [];
    const w = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
      acceptNode: n => (n.parentElement && n.parentElement.closest(SKIP)) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    for (let n = w.nextNode(); n; n = w.nextNode()) out.push(n);
    return out;
  }
  const textOf = scope => textNodes(scope).map(n => n.data).join('');

  function toOffset(scope, node, off) {
    const nodes = textNodes(scope);
    let pos = 0;
    if (node.nodeType === 3) {
      for (const t of nodes) { if (t === node) return pos + off; pos += t.length; }
      pos = 0;
    }
    const r = document.createRange();
    r.setStart(node, off);
    for (const t of nodes) {
      const tr = document.createRange();
      tr.selectNodeContents(t);
      if (r.compareBoundaryPoints(Range.START_TO_START, tr) <= 0) return pos;
      pos += t.length;
    }
    return pos;
  }

  /* whitespace-insensitive view of a text, with a map back to raw offsets */
  function squash(s) {
    let out = '', map = [], sp = false;
    for (let i = 0; i < s.length; i++) {
      if (/\s/.test(s[i])) { if (!sp) { out += ' '; map.push(i); } sp = true; }
      else { out += s[i]; map.push(i); sp = false; }
    }
    map.push(s.length);
    return { out, map };
  }
  function commonSuffix(a, b) { let i = 0; while (i < a.length && i < b.length && a[a.length - 1 - i] === b[b.length - 1 - i]) i++; return i; }
  function commonPrefix(a, b) { let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++; return i; }

  function findIn(scope, m) {
    const raw = textOf(scope);
    if (raw.slice(m.start, m.end) === m.quote) return { start: m.start, end: m.end };
    const T = squash(raw), q = squash(m.quote).out.trim();
    if (!q) return null;
    const pre = squash(m.prefix || '').out, suf = squash(m.suffix || '').out;
    let best = null, bestScore = -Infinity;
    for (let i = T.out.indexOf(q); i >= 0; i = T.out.indexOf(q, i + 1)) {
      const s = T.map[i], e = T.map[i + q.length - 1] + 1;
      const score = commonSuffix(T.out.slice(0, i), pre) + commonPrefix(T.out.slice(i + q.length), suf) -
        Math.abs(s - (m.start || 0)) / 1e4;
      if (score > bestScore) { bestScore = score; best = { start: s, end: e }; }
    }
    return best;
  }

  function locate(m) {
    const sec = (m.section && document.getElementById(m.section)) || null;
    if (sec && root.contains(sec)) { const r = findIn(sec, m); if (r) return Object.assign(r, { scope: sec }); }
    const r = findIn(root, m);
    return r ? Object.assign(r, { scope: root }) : null;
  }

  /* ---------- highlights ---------- */
  const NO_INLINE = /^(SECTION|DIV|UL|OL|DL|TABLE|TBODY|THEAD|TFOOT|TR|FIGURE|MAIN|ARTICLE|DETAILS|HEADER|NAV|ASIDE)$/;
  function wrap(m, loc) {
    const nodes = textNodes(loc.scope);
    let pos = 0;
    for (const t of nodes) {
      const a = pos, b = pos + t.length;
      pos = b;
      if (b <= loc.start || a >= loc.end) continue;
      if (!t.data.trim() && NO_INLINE.test(t.parentNode.nodeName)) continue;
      let s = Math.max(loc.start, a) - a, e = Math.min(loc.end, b) - a, target = t;
      if (e <= s) continue;
      if (s > 0) target = target.splitText(s);
      if (e - s < target.length) target.splitText(e - s);
      const hl = document.createElement('mark');
      hl.className = 'gm-hl gm-' + m.tag + (m.status === 'resolved' ? ' gm-resolved' : '');
      hl.dataset.mid = m.id;
      hl.title = label(m.tag) + (m.comment ? ': ' + m.comment : '');
      target.parentNode.insertBefore(hl, target);
      hl.appendChild(target);
    }
  }
  function unwrap(id) {
    document.querySelectorAll('mark.gm-hl[data-mid="' + id + '"]').forEach(h => {
      const p = h.parentNode;
      while (h.firstChild) p.insertBefore(h.firstChild, h);
      p.removeChild(h);
      p.normalize();
    });
  }
  function restyle(m) {
    document.querySelectorAll('mark.gm-hl[data-mid="' + m.id + '"]').forEach(h => {
      h.className = 'gm-hl gm-' + m.tag + (m.status === 'resolved' ? ' gm-resolved' : '');
      h.title = label(m.tag) + (m.comment ? ': ' + m.comment : '');
    });
  }
  function renderAll() {
    orphans = new Set();
    for (const m of marks) {
      const loc = locate(m);
      if (loc) wrap(m, loc); else orphans.add(m.id);
    }
  }

  /* ---------- selection → pending mark ---------- */
  function readSelection() {
    const sel = getSelection();
    if (!sel || !sel.rangeCount || sel.isCollapsed) return null;
    const r = sel.getRangeAt(0);
    const elOf = n => n.nodeType === 1 ? n : n.parentElement;
    if (!root.contains(r.commonAncestorContainer)) return null;
    if (elOf(r.startContainer).closest(SKIP) && elOf(r.endContainer).closest(SKIP)) return null;
    const scope = elOf(r.commonAncestorContainer).closest(SECTION);
    const sc = scope && root.contains(scope) ? scope : root;
    const text = textOf(sc);
    let start = toOffset(sc, r.startContainer, r.startOffset), end = toOffset(sc, r.endContainer, r.endOffset);
    while (start < end && /\s/.test(text[start])) start++;
    while (end > start && /\s/.test(text[end - 1])) end--;
    if (end <= start || end - start > MAX_QUOTE) return null;
    const rects = r.getClientRects();
    const rect = rects.length ? rects[rects.length - 1] : r.getBoundingClientRect();
    const first = rects.length ? rects[0] : rect;
    const block = elOf(r.startContainer).closest(BLOCK);
    return {
      scope: sc, start, end,
      quote: text.slice(start, end),
      prefix: text.slice(Math.max(0, start - CTX), start),
      suffix: text.slice(end, end + CTX),
      context: block ? block.textContent.replace(/\s+/g, ' ').trim().slice(0, 600) : '',
      rect, first
    };
  }

  function sectionInfo(scope) {
    if (!scope || scope === root) return { id: '', num: '', title: '' };
    const h = scope.querySelector(':scope > h1, :scope > h2, :scope > h3, :scope > h4');
    const num = h && h.querySelector('.num') ? h.querySelector('.num').textContent.trim() : (scope.dataset.num || '');
    let title = scope.dataset.title || scope.id;
    if (h) {
      const c = h.cloneNode(true);
      c.querySelectorAll('.num').forEach(n => n.remove());
      title = c.textContent.replace(/\s+/g, ' ').trim();
    }
    return { id: scope.id || scope.dataset.sid, num, title };
  }

  function createMark(tag) {
    if (!pending) return;
    const now = new Date().toISOString();
    const s = sectionInfo(pending.scope);
    const m = {
      id: 'm' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      tag, comment: '', status: 'open',
      section: s.id, section_num: s.num, section_title: s.title,
      quote: pending.quote, prefix: pending.prefix, suffix: pending.suffix,
      start: pending.start, end: pending.end, context: pending.context,
      created: now, updated: now
    };
    marks.push(m);
    wrap(m, pending);
    getSelection().removeAllRanges();
    const anchor = document.querySelector('mark.gm-hl[data-mid="' + m.id + '"]');
    pending = null;
    save();
    openEditor(m, anchor, true);
  }

  /* ---------- popover ---------- */
  function buildPopover() {
    pop = document.createElement('div');
    pop.className = 'gm-ui gm-pop';
    pop.setAttribute('role', 'dialog');
    pop.innerHTML =
      '<div class="gm-tags">' + TAGS.map(t =>
        '<button type="button" data-tag="' + t.id + '" title="' + t.label + ' (' + t.key + ')">' +
        '<span class="gm-dot gm-c-' + t.id + '"></span>' + t.label + '</button>').join('') + '</div>' +
      '<div class="gm-edit"><textarea placeholder="Optional comment. What exactly is unclear?"></textarea>' +
      '<div class="gm-edit-row"><span><kbd>Enter</kbd> save · <kbd>Esc</kbd> close</span>' +
      '<button type="button" class="gm-del">Delete</button></div></div>';
    document.body.appendChild(pop);
    // keep the text selection alive while clicking popover buttons
    pop.addEventListener('mousedown', e => { if (!e.target.closest('textarea')) e.preventDefault(); });
    pop.querySelectorAll('[data-tag]').forEach(b => b.addEventListener('click', () => {
      if (editing) { editing.tag = b.dataset.tag; touch(editing); restyle(editing); markTagButtons(editing.tag); save(); }
      else createMark(b.dataset.tag);
    }));
    const ta = pop.querySelector('textarea');
    ta.addEventListener('input', () => { if (editing) { editing.comment = ta.value; touch(editing); restyle(editing); save(); } });
    ta.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); closePopover(); }
      if (e.key === 'Escape') { e.preventDefault(); closePopover(); }
    });
    pop.querySelector('.gm-del').addEventListener('click', () => { if (editing) removeMark(editing.id); closePopover(); });
  }
  function markTagButtons(tag) {
    pop.querySelectorAll('[data-tag]').forEach(b => b.classList.toggle('on', b.dataset.tag === tag));
  }
  function place(rect, first) {
    pop.style.left = '0px'; pop.style.top = '0px';
    const w = pop.offsetWidth, h = pop.offsetHeight, vw = document.documentElement.clientWidth;
    let left = rect.right - w / 2;
    left = Math.max(8, Math.min(left, vw - w - 8));
    // below the selection on touch (native menu sits above), otherwise above unless there is no room
    let top = (lastPointer === 'touch' || first.top < h + 16) ? rect.bottom + 8 : first.top - h - 8;
    pop.style.left = (left + scrollX) + 'px';
    pop.style.top = (top + scrollY) + 'px';
  }
  function showCreate(p) {
    pending = p; editing = null;
    pop.classList.remove('editing');
    markTagButtons(null);
    pop.classList.add('open');
    place(p.rect, p.first);
  }
  function openEditor(m, anchor, fresh) {
    editing = m; pending = null;
    pop.classList.add('open', 'editing');
    markTagButtons(m.tag);
    const ta = pop.querySelector('textarea');
    ta.value = m.comment || '';
    const r = anchor ? anchor.getBoundingClientRect() : { top: 80, bottom: 100, right: innerWidth / 2 };
    place(r, r);
    if (fresh || lastPointer !== 'touch') setTimeout(() => ta.focus({ preventScroll: true }), 0);
  }
  function closePopover() {
    pop.classList.remove('open', 'editing');
    pending = null; editing = null;
  }
  function touch(m) { m.updated = new Date().toISOString(); }
  const label = id => (TAGS.find(t => t.id === id) || { label: id }).label;

  function removeMark(id) {
    unwrap(id);
    marks = marks.filter(m => m.id !== id);
    orphans.delete(id);
    save();
  }

  /* ---------- events ---------- */
  function onPointerUp(e) {
    if (e.target.closest && e.target.closest('.gm-ui')) return;
    setTimeout(() => {
      const p = opts.popover ? readSelection() : null;
      if (p) { showCreate(p); return; }
      const hl = e.target.closest && e.target.closest('mark.gm-hl');
      const sel = getSelection();
      if (hl && (!sel || sel.isCollapsed) && opts.show) {
        const m = marks.find(x => x.id === hl.dataset.mid);
        if (m) { openEditor(m, hl, false); return; }
      }
      if (pop.classList.contains('open')) closePopover();
    }, 0);
  }

  function bindEvents() {
    document.addEventListener('pointerdown', e => {
      lastPointer = e.pointerType || 'mouse';
      if (pop.classList.contains('open') && !e.target.closest('.gm-pop')) closePopover();
    });
    document.addEventListener('mouseup', onPointerUp);
    let selTimer = null;
    document.addEventListener('selectionchange', () => {
      if (lastPointer !== 'touch' || !opts.popover) return;
      clearTimeout(selTimer);
      selTimer = setTimeout(() => { const p = readSelection(); if (p) showCreate(p); }, 450);
    });
    document.addEventListener('keyup', e => {
      if (e.shiftKey || e.key === 'Shift') {
        if (!opts.popover || (e.target.closest && e.target.closest('input, textarea'))) return;
        const p = readSelection();
        if (p) showCreate(p);
      }
    });
    document.addEventListener('keydown', e => {
      if (!pop.classList.contains('open')) return;
      if (e.key === 'Escape') { closePopover(); return; }
      if (pending && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const t = TAGS.find(x => x.key === e.key);
        if (t) { e.preventDefault(); createMark(t.id); }
      }
    });
    addEventListener('resize', () => { if (pop.classList.contains('open') && !editing) closePopover(); });
  }

  /* ---------- side panel ---------- */
  function buildPanel() {
    fab = document.createElement('button');
    fab.type = 'button';
    fab.className = 'gm-ui gm-fab';
    fab.title = 'Your marks (select text anywhere to add one)';
    fab.innerHTML = '<span class="gm-dot gm-c-unclear"></span>Marks <span class="gm-count">0</span>';
    fab.addEventListener('click', () => { panel.classList.toggle('open'); refreshPanel(); });
    document.body.appendChild(fab);

    panel = document.createElement('aside');
    panel.className = 'gm-ui gm-panel';
    panel.setAttribute('aria-label', 'Marks');
    panel.innerHTML =
      '<div class="gm-head"><h2>Marks</h2><button type="button" class="gm-x" title="Close">×</button></div>' +
      '<div class="gm-filters"></div><div class="gm-list"></div>' +
      '<div class="gm-foot">' +
      '<div class="gm-actions">' +
      '<button type="button" class="primary" data-act="export" title="Save a JSON file for Claude (put it in guides/marks/)">Export JSON</button>' +
      '<button type="button" data-act="copy" title="Copy a text summary to paste into a chat">Copy as text</button>' +
      '<button type="button" data-act="import">Import</button>' +
      '<button type="button" class="danger" data-act="clear">Clear all</button></div>' +
      '<div class="gm-opts">' +
      '<label><input type="checkbox" data-opt="popover"> Popover on selection</label>' +
      '<label><input type="checkbox" data-opt="show"> Show highlights</label></div>' +
      '<input type="file" accept=".json,application/json" hidden></div>';
    document.body.appendChild(panel);
    panel.querySelector('.gm-x').addEventListener('click', () => panel.classList.remove('open'));
    panel.querySelectorAll('[data-opt]').forEach(cb => {
      cb.checked = !!opts[cb.dataset.opt];
      cb.addEventListener('change', () => { opts[cb.dataset.opt] = cb.checked; saveOpts(); applyOpts(); });
    });
    const file = panel.querySelector('input[type=file]');
    file.addEventListener('change', () => { if (file.files[0]) importFile(file.files[0]); file.value = ''; });
    panel.querySelector('.gm-actions').addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      const act = b.dataset.act;
      if (act === 'export') exportJson();
      if (act === 'copy') copyText();
      if (act === 'import') file.click();
      if (act === 'clear') {
        if (b.dataset.armed) { marks.forEach(m => unwrap(m.id)); marks = []; orphans.clear(); save(); delete b.dataset.armed; b.textContent = 'Clear all'; }
        else { b.dataset.armed = '1'; b.textContent = 'Click again to clear'; setTimeout(() => { delete b.dataset.armed; b.textContent = 'Clear all'; }, 3000); }
      }
    });
    panel.querySelector('.gm-list').addEventListener('click', e => {
      const it = e.target.closest('.gm-item');
      if (!it) return;
      const h = document.querySelector('mark.gm-hl[data-mid="' + it.dataset.mid + '"]');
      if (!h) return;
      if (innerWidth < 900) panel.classList.remove('open');
      h.scrollIntoView({ behavior: 'smooth', block: 'center' });
      document.querySelectorAll('mark.gm-hl[data-mid="' + it.dataset.mid + '"]').forEach(x => {
        x.classList.remove('gm-flash'); void x.offsetWidth; x.classList.add('gm-flash');
      });
    });
    toastEl = document.createElement('div');
    toastEl.className = 'gm-ui gm-toast';
    document.body.appendChild(toastEl);
  }

  function applyOpts() { document.body.classList.toggle('gm-hide', !opts.show); }

  function refreshPanel() {
    if (!fab) return;
    fab.querySelector('.gm-count').textContent = marks.length;
    fab.classList.toggle('has', marks.length > 0);
    if (!panel.classList.contains('open')) return;
    const esc = window.Guide ? Guide.escapeHtml : s => String(s);
    const counts = {};
    marks.forEach(m => { counts[m.tag] = (counts[m.tag] || 0) + 1; });
    panel.querySelector('.gm-head h2').textContent = 'Marks (' + marks.length + ')';
    panel.querySelector('.gm-filters').innerHTML =
      '<button type="button" data-f=""' + (filter ? '' : ' class="on"') + '>All</button>' +
      TAGS.map(t => '<button type="button" data-f="' + t.id + '"' + (filter === t.id ? ' class="on"' : '') + '>' +
        '<span class="gm-dot gm-c-' + t.id + '"></span>' + t.label + ' ' + (counts[t.id] || 0) + '</button>').join('');
    panel.querySelectorAll('[data-f]').forEach(b => b.addEventListener('click', () => { filter = b.dataset.f || null; refreshPanel(); }));

    const list = panel.querySelector('.gm-list');
    const shown = marks.filter(m => !filter || m.tag === filter).slice().sort(byPosition);
    if (!shown.length) {
      list.innerHTML = '<div class="gm-empty">' + (marks.length ? 'No marks with this tag.' :
        'Nothing marked yet. Select any word, phrase or line in the guide and pick <b>Unclear</b>, <b>Complex</b> or <b>Note</b>. ' +
        'Keys <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> work too while the popover is open.') + '</div>';
      return;
    }
    let html = '', group = null;
    for (const m of shown) {
      const g = (m.section_num ? m.section_num + ' ' : '') + (m.section_title || 'General');
      if (g !== group) { html += '<div class="gm-group">' + esc(g) + '</div>'; group = g; }
      const orphan = orphans.has(m.id);
      html += '<button type="button" class="gm-item' + (orphan ? ' orphan' : '') + '" data-mid="' + m.id + '">' +
        '<div class="gm-q"><span class="gm-dot gm-c-' + m.tag + '"></span><span class="gm-quote">“' + esc(m.quote.replace(/\s+/g, ' ')) + '”</span></div>' +
        (m.comment ? '<div class="gm-cmt">' + esc(m.comment) + '</div>' : '') +
        (m.status === 'resolved' ? '<div class="gm-resolved-note">Resolved</div>' : '') +
        (orphan ? '<div class="gm-orphan">Text no longer found in this version of the guide</div>' : '') + '</button>';
    }
    list.innerHTML = html;
  }

  // order marks as they appear in the document
  function byPosition(a, b) {
    const ha = document.querySelector('mark.gm-hl[data-mid="' + a.id + '"]');
    const hb = document.querySelector('mark.gm-hl[data-mid="' + b.id + '"]');
    if (ha && hb) return ha.compareDocumentPosition(hb) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    return ha ? -1 : hb ? 1 : 0;
  }

  /* ---------- export / import ---------- */
  function payload() {
    return {
      format: FORMAT,
      guide: {
        id: guideId,
        title: document.title,
        version: meta('guide-version'),
        file: decodeURIComponent(location.pathname.split('/').pop())
      },
      exported: new Date().toISOString(),
      reading: window.Guide && Guide.reading ? Guide.reading() : null,
      marks: marks.slice().sort(byPosition).map(m => Object.assign({}, m, { found: !orphans.has(m.id) }))
    };
  }

  async function exportJson() {
    const data = JSON.stringify(payload(), null, 2);
    const name = guideId + '.marks.json';
    if (window.showSaveFilePicker) {
      try {
        const h = await window.showSaveFilePicker({
          suggestedName: name, id: 'guide-marks',
          types: [{ description: 'Guide marks', accept: { 'application/json': ['.json'] } }]
        });
        const w = await h.createWritable();
        await w.write(data);
        await w.close();
        toast('Saved ' + h.name);
        return;
      } catch (e) { if (e && e.name === 'AbortError') return; /* fall back to a download */ }
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([data], { type: 'application/json' }));
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    toast('Downloaded ' + name + '. Move it to guides/marks/');
  }

  function asText() {
    const p = payload();
    const lines = ['Marks on "' + p.guide.title + '" (' + p.guide.file + (p.guide.version ? ', version ' + p.guide.version : '') + ')' +
      (p.reading ? ', ' + p.reading.percent + '% read' : ''), ''];
    p.marks.forEach((m, i) => {
      const sec = ((m.section_num ? m.section_num + ' ' : '') + (m.section_title || 'General')).trim();
      lines.push((i + 1) + '. [' + m.tag + '] ' + sec + ': "' + m.quote.replace(/\s+/g, ' ') + '"' +
        (m.comment ? '\n   Comment: ' + m.comment : '') + (m.found ? '' : '\n   (text no longer found)'));
    });
    return lines.join('\n');
  }
  async function copyText() {
    const t = asText();
    try { await navigator.clipboard.writeText(t); toast('Copied ' + marks.length + ' marks'); return; }
    catch (e) { /* fall back below */ }
    const ta = document.createElement('textarea');
    ta.className = 'gm-ui';
    ta.value = t;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); toast('Copied ' + marks.length + ' marks'); } catch (e) { toast('Copy failed'); }
    ta.remove();
  }

  function importFile(f) {
    const reader = new FileReader();
    reader.onload = () => {
      let d;
      try { d = JSON.parse(reader.result); } catch (e) { toast('Not a valid JSON file'); return; }
      const incoming = Array.isArray(d) ? d : (d.marks || []);
      if (d.guide && d.guide.id && d.guide.id !== guideId) toast('Note: file was exported from "' + d.guide.id + '"');
      let added = 0, updated = 0;
      for (const raw of incoming) {
        if (!raw || !raw.id || !raw.quote) continue;
        const m = Object.assign({}, raw);
        delete m.found;
        const cur = marks.find(x => x.id === m.id);
        if (!cur) { marks.push(m); added++; }
        else if ((m.updated || '') > (cur.updated || '')) { Object.assign(cur, m); updated++; }
      }
      marks.forEach(m => unwrap(m.id));
      renderAll();
      save();
      setTimeout(() => toast('Imported: ' + added + ' new, ' + updated + ' updated'), added + updated ? 0 : 0);
    };
    reader.readAsText(f);
  }

  let toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
  }

  /* ---------- init ---------- */
  function init() {
    root = document.querySelector('[data-guide]') || document.querySelector('.g-doc') || document.querySelector('main') || document.body;
    marks = load();
    opts = loadOpts();
    buildPopover();
    buildPanel();
    applyOpts();
    renderAll();
    refreshPanel();
    bindEvents();
    window.GuideMarks = { list: () => marks.slice(), export: payload, asText, tags: TAGS };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
