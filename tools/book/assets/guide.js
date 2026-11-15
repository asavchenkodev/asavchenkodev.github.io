/* Shared behaviour for the HTML book chapters (guides/book/assets/guide.js; forked from html/assets/guide.js).
   Contents sidebar, theme toggle, reading progress (opt-in), glossary tooltips,
   steppers, tabs. Exposes window.Guide for page-specific interactive figures.
   Load with <script src="assets/guide.js" defer></script>. */
(function () {
  'use strict';

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  };
  const el = (tag, attrs, html) => {
    const n = document.createElement(tag);
    if (attrs) for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (html !== undefined) n.innerHTML = html;
    return n;
  };

  /* ---------- theme ---------- */
  const savedTheme = store.get('guide-theme', '');
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;

  function initBar() {
    const bar = el('div', { class: 'g-bar', 'data-no-mark': '' });
    const themeBtn = el('button', { type: 'button', title: 'Toggle light / dark' }, 'Theme');
    themeBtn.addEventListener('click', () => {
      const cur = document.documentElement.dataset.theme ||
        (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      store.set('guide-theme', next);
    });
    bar.appendChild(themeBtn);
    document.body.appendChild(bar);
    document.body.appendChild(el('div', { class: 'g-progress' }));
  }

  /* ---------- contents ---------- */
  function initToc() {
    const doc = document.querySelector('.g-doc');
    let toc = document.querySelector('.g-toc');
    if (!doc || !toc) return;
    const heads = doc.querySelectorAll('section.chapter[id] > h2, section.chapter section[id] > h3');
    const root = el('ol');
    let lastTop = null;
    const links = [];
    heads.forEach(h => {
      const sec = h.parentElement;
      const num = h.querySelector('.num');
      const title = Array.from(h.childNodes).filter(n => !(n.classList && n.classList.contains('num')))
        .map(n => n.textContent).join('').trim();
      const a = el('a', { href: '#' + sec.id });
      a.innerHTML = (num ? '<span class="n">' + num.textContent + '</span>' : '') + escapeHtml(title);
      const li = el('li');
      li.appendChild(a);
      links.push([sec, a]);
      if (h.tagName === 'H2') { root.appendChild(li); lastTop = li; }
      else {
        if (!lastTop) { root.appendChild(li); return; }
        let sub = lastTop.querySelector('ol');
        if (!sub) { sub = el('ol'); lastTop.appendChild(sub); }
        sub.appendChild(li);
      }
    });
    toc.innerHTML = '<h2>Contents</h2>';
    toc.appendChild(root);
    toc.setAttribute('data-no-mark', '');

    const btn = el('button', { class: 'g-toc-btn', type: 'button', 'data-no-mark': '' }, 'Contents');
    btn.addEventListener('click', e => { e.stopPropagation(); document.body.classList.toggle('g-toc-open'); });
    document.body.appendChild(btn);
    toc.addEventListener('click', e => { if (e.target.closest('a')) document.body.classList.remove('g-toc-open'); });
    document.addEventListener('click', e => {
      if (!e.target.closest('.g-toc')) document.body.classList.remove('g-toc-open');
    });

    // scrollspy: the active entry is the last section whose top is above 30% of the viewport
    const onScroll = () => {
      const y = innerHeight * 0.3;
      let cur = null;
      for (const [sec, a] of links) if (sec.getBoundingClientRect().top < y) cur = a;
      links.forEach(([, a]) => a.classList.toggle('active', a === cur));
      const p = document.querySelector('.g-progress');
      if (p) {
        const h = document.documentElement.scrollHeight - innerHeight;
        p.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%';
      }
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- glossary tooltips: <a class="term" href="#gl-xyz">xyz</a> ---------- */
  function initTerms() {
    let tip = null;
    document.addEventListener('mouseover', e => {
      const a = e.target.closest && e.target.closest('a.term');
      if (!a) return;
      const id = (a.getAttribute('href') || '').slice(1);
      const dt = id && document.getElementById(id);
      if (!dt) return;
      const dd = dt.tagName === 'DT' ? dt.nextElementSibling : dt;
      tip = el('div', { class: 'g-tip' });
      tip.innerHTML = '<b>' + escapeHtml(dt.textContent) + '</b>' + escapeHtml(dd ? dd.textContent : '');
      document.body.appendChild(tip);
      const r = a.getBoundingClientRect();
      const left = Math.min(r.left + scrollX, scrollX + document.documentElement.clientWidth - tip.offsetWidth - 12);
      tip.style.left = Math.max(8, left) + 'px';
      tip.style.top = (r.bottom + scrollY + 6) + 'px';
    });
    document.addEventListener('mouseout', e => {
      if (tip && e.target.closest && e.target.closest('a.term')) { tip.remove(); tip = null; }
    });
  }

  /* ---------- stepper ----------
     <div class="g-stepper" data-target="svgId">
       <div class="g-step" data-title="Photons arrive">...</div> ...
     </div>
     Elements inside #svgId with data-step="1 3" get class "on" when step 1 or 3 is shown
     (1-based). Add class "g-dim" to the svg to fade the others. */
  function initSteppers() {
    document.querySelectorAll('.g-stepper').forEach(box => {
      const steps = Array.from(box.querySelectorAll(':scope > .g-step'));
      if (!steps.length) return;
      const target = box.dataset.target ? document.getElementById(box.dataset.target) : null;
      const nav = el('div', { class: 'g-step-nav', 'data-no-mark': '' });
      const prev = el('button', { type: 'button' }, '← Back');
      const next = el('button', { type: 'button' }, 'Next →');
      const dots = el('div', { class: 'g-step-dots' });
      const count = el('span', { class: 'g-step-count' });
      steps.forEach((s, i) => {
        if (s.dataset.title && !s.querySelector('h4')) s.insertBefore(el('h4', null, escapeHtml(s.dataset.title)), s.firstChild);
        const d = el('button', { type: 'button', 'aria-label': 'Step ' + (i + 1) });
        d.addEventListener('click', () => show(i));
        dots.appendChild(d);
      });
      nav.append(prev, dots, count, next);
      box.appendChild(nav);
      let cur = 0;
      function show(i) {
        cur = Math.max(0, Math.min(steps.length - 1, i));
        steps.forEach((s, j) => s.classList.toggle('active', j === cur));
        dots.querySelectorAll('button').forEach((d, j) => d.classList.toggle('active', j === cur));
        prev.disabled = cur === 0;
        next.disabled = cur === steps.length - 1;
        count.textContent = (cur + 1) + ' / ' + steps.length;
        if (target) target.querySelectorAll('[data-step]').forEach(n => {
          n.classList.toggle('on', n.dataset.step.split(/\s+/).includes(String(cur + 1)));
        });
        box.dispatchEvent(new CustomEvent('stepchange', { detail: { index: cur } }));
      }
      prev.addEventListener('click', () => show(cur - 1));
      next.addEventListener('click', () => show(cur + 1));
      show(0);
    });
  }

  /* ---------- tabs: <div class="g-tabs"><div class="g-tab" data-label="A">...</div>...</div> ---------- */
  function initTabs() {
    document.querySelectorAll('.g-tabs').forEach(box => {
      const tabs = Array.from(box.querySelectorAll(':scope > .g-tab'));
      const list = el('div', { class: 'g-tablist', role: 'tablist', 'data-no-mark': '' });
      tabs.forEach((t, i) => {
        const b = el('button', { type: 'button', role: 'tab' }, escapeHtml(t.dataset.label || 'Tab ' + (i + 1)));
        b.addEventListener('click', () => select(i));
        list.appendChild(b);
      });
      box.insertBefore(list, box.firstChild);
      function select(i) {
        tabs.forEach((t, j) => t.classList.toggle('active', j === i));
        list.querySelectorAll('button').forEach((b, j) => b.setAttribute('aria-selected', j === i));
      }
      select(0);
    });
  }

  /* ---------- reading progress ----------
     Each content block (direct children of section[id]: paragraphs, lists, boxes, figures, Q&A)
     counts as read once it has been on screen long enough to be read (time scales with its length),
     while the tab is visible and the reader was active recently. Block keys hash the block text, so a
     paragraph that is rewritten later shows up as unread again. Sections roll up word-weighted. */
  const READ_SKIP = 'h1, h2, h3, h4, section, script, style, .g-step-nav, [data-no-mark], [data-no-progress]';
  function initProgress() {
    const doc = document.querySelector('.g-doc');
    const toc = document.querySelector('.g-toc');
    if (!doc) return;
    const gid = (document.querySelector('meta[name="guide-id"]') || {}).content ||
      decodeURIComponent(location.pathname.split('/').pop()).replace(/\.html?$/i, '');
    const KEY = 'guide-read:' + gid;
    let state;
    try { state = JSON.parse(store.get(KEY, '') || '{}'); } catch (e) { state = {}; }
    state.blocks = state.blocks || {};
    const persist = () => store.set(KEY, JSON.stringify(state));

    const words = n => (n.textContent.match(/\S+/g) || []).length;
    const hash = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); };
    const sections = Array.from(doc.querySelectorAll('section[id]'));
    const blocks = [];
    sections.forEach(sec => {
      Array.from(sec.children).forEach(b => {
        if (b.matches(READ_SKIP)) return;
        const w = words(b);
        if (!w && !b.matches('figure, .g-stepper, .g-tabs, svg')) return;
        const text = b.textContent.replace(/\s+/g, ' ').trim();
        const key = sec.id + ':' + hash(text.slice(0, 400) + '|' + text.length);
        const weight = Math.max(w, 12);
        // seconds on screen needed: ~40% of the time to read it at 270 wpm, between 1.5 s and 25 s
        const need = Math.min(25, Math.max(1.5, (w / 4.5) * 0.4));
        blocks.push({ el: b, sec, key, weight, need, t: 0 });
        b.classList.add('g-rb');
        if (state.blocks[key]) b.classList.add('g-read');
      });
    });
    if (!blocks.length) return;

    // section → own blocks and descendant blocks
    const secBlocks = new Map(sections.map(s => [s, blocks.filter(b => s.contains(b.el))]));
    const pct = list => {
      let tot = 0, done = 0;
      list.forEach(b => { tot += b.weight; if (state.blocks[b.key]) done += b.weight; });
      return tot ? done / tot : 0;
    };

    // contents: status ring per entry + summary footer
    const rings = [];
    if (toc) {
      toc.querySelectorAll('a[href^="#"]').forEach(a => {
        const sec = document.getElementById(a.getAttribute('href').slice(1));
        if (!sec || !secBlocks.has(sec)) return;
        const r = el('button', { type: 'button', class: 'g-rd', title: 'Mark section as read / unread' });
        r.addEventListener('click', e => {
          e.preventDefault(); e.stopPropagation();
          const list = secBlocks.get(sec), all = pct(list) >= 0.999;
          list.forEach(b => { if (all) delete state.blocks[b.key]; else state.blocks[b.key] = Date.now(); });
          persist(); paint();
        });
        a.appendChild(r);
        rings.push([sec, r]);
      });
      const foot = el('div', { class: 'g-rd-foot' });
      foot.innerHTML = '<div class="g-rd-sum"></div>' +
        '<label><input type="checkbox" class="g-rd-show"> Tint read paragraphs</label>' +
        '<button type="button" class="g-rd-reset">Reset reading progress</button>';
      toc.appendChild(foot);
      const show = foot.querySelector('.g-rd-show');
      show.checked = store.get('guide-read-show', '0') === '1';
      document.body.classList.toggle('g-show-read', show.checked);
      show.addEventListener('change', () => {
        store.set('guide-read-show', show.checked ? '1' : '0');
        document.body.classList.toggle('g-show-read', show.checked);
      });
      const reset = foot.querySelector('.g-rd-reset');
      reset.addEventListener('click', () => {
        if (!reset.dataset.armed) {
          reset.dataset.armed = '1'; reset.textContent = 'Click again to reset';
          setTimeout(() => { delete reset.dataset.armed; reset.textContent = 'Reset reading progress'; }, 3000);
          return;
        }
        state.blocks = {}; blocks.forEach(b => { b.t = 0; }); persist(); paint();
        delete reset.dataset.armed; reset.textContent = 'Reset reading progress';
      });
    }
    function paint() {
      blocks.forEach(b => b.el.classList.toggle('g-read', !!state.blocks[b.key]));
      rings.forEach(([sec, r]) => {
        const p = pct(secBlocks.get(sec));
        r.style.setProperty('--p', p.toFixed(3));
        r.classList.toggle('done', p >= 0.999);
        r.classList.toggle('some', p > 0 && p < 0.999);
        r.setAttribute('aria-label', Math.round(p * 100) + '% read');
      });
      const total = Math.round(pct(blocks) * 100);
      if (state.percent !== total) { state.percent = total; persist(); }   // read by the book home page
      const sum = toc && toc.querySelector('.g-rd-sum');
      if (sum) sum.textContent = total + '% read';
      const btn = document.querySelector('.g-toc-btn');
      if (btn) btn.textContent = 'Contents · ' + total + '%';
    }
    paint();

    // timing loop
    let lastActive = Date.now();
    ['scroll', 'mousemove', 'keydown', 'pointerdown', 'wheel', 'touchmove'].forEach(ev =>
      addEventListener(ev, () => { lastActive = Date.now(); }, { passive: true }));
    const visible = new Set();
    const io = new IntersectionObserver(es => es.forEach(e => {
      const b = e.target._gBlock;
      if (e.isIntersecting) visible.add(b); else visible.delete(b);
    }));
    blocks.forEach(b => { b.el._gBlock = b; if (!state.blocks[b.key]) io.observe(b.el); });
    const TICK = 0.5;
    setInterval(() => {
      if (document.visibilityState !== 'visible' || Date.now() - lastActive > 90000 || !visible.size) return;
      const vh = innerHeight;
      let changed = false;
      visible.forEach(b => {
        if (b.el.tagName === 'DETAILS' && !b.el.open) return;   // closed answers are not read yet
        const r = b.el.getBoundingClientRect();
        const seen = Math.min(r.bottom, vh) - Math.max(r.top, 0);
        if (seen < Math.min(r.height * 0.6, vh * 0.5)) return;
        b.t += TICK;
        if (b.t >= b.need) {
          state.blocks[b.key] = Date.now();
          visible.delete(b); io.unobserve(b.el); changed = true;
        }
      });
      if (changed) { persist(); paint(); }
    }, TICK * 1000);

    // continue where you left off
    let lastSaved = 0;
    addEventListener('scroll', () => {
      if (Date.now() - lastSaved < 1500) return;
      lastSaved = Date.now();
      let cur = null;
      for (const s of sections) if (s.getBoundingClientRect().top < innerHeight * 0.3) cur = s;
      state.last = cur ? { section: cur.id, y: Math.round(scrollY), at: Date.now() } : null;
      persist();
    }, { passive: true });
    const last = state.last;
    const lastSec = last && document.getElementById(last.section);
    if (lastSec && !location.hash && scrollY < 50 && last.y > innerHeight) {
      const h = lastSec.querySelector(':scope > h2, :scope > h3');
      const chip = el('button', { type: 'button', class: 'g-resume', 'data-no-mark': '' });
      let label = lastSec.id;
      if (h) {
        const c = h.cloneNode(true), n = c.querySelector('.num');
        if (n) n.textContent += ' ';
        label = c.textContent.replace(/\s+/g, ' ').trim();
      }
      chip.innerHTML = 'Continue at <b>' + escapeHtml(label) + '</b>';
      chip.addEventListener('click', () => { scrollTo({ top: last.y, behavior: 'smooth' }); chip.remove(); });
      document.body.appendChild(chip);
      setTimeout(() => chip.classList.add('gone'), 9000);
      setTimeout(() => chip.remove(), 9600);
    }

    window.Guide.reading = () => ({
      percent: Math.round(pct(blocks) * 100),
      sections: sections.map(s => {
        const h = s.querySelector(':scope > h2, :scope > h3');
        const num = h && h.querySelector('.num');
        return { section: s.id, num: num ? num.textContent.trim() : '', percent: Math.round(pct(secBlocks.get(s)) * 100) };
      })
    });
  }

  /* ---------- print: open answers so they appear on paper ---------- */
  addEventListener('beforeprint', () => document.querySelectorAll('details:not([open])').forEach(d => {
    d.dataset.printOpened = '1'; d.open = true;
  }));
  addEventListener('afterprint', () => document.querySelectorAll('details[data-print-opened]').forEach(d => {
    d.open = false; delete d.dataset.printOpened;
  }));

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* ---------- public helpers for page scripts ---------- */
  window.Guide = {
    escapeHtml,
    /* Guide.range('#f', v => draw(v)) wires a range input and its <output>, calls fn now and on input. */
    range(sel, fn, fmt) {
      const input = typeof sel === 'string' ? document.querySelector(sel) : sel;
      if (!input) return;
      const out = input.id ? document.querySelector('output[for="' + input.id + '"]') : null;
      const run = () => {
        const v = parseFloat(input.value);
        if (out) out.textContent = fmt ? fmt(v) : v;
        fn(v);
      };
      input.addEventListener('input', run);
      run();
    },
    /* Guide.svg('line', {x1:0, ...}) creates an SVG element. */
    svg(tag, attrs) {
      const n = document.createElementNS('http://www.w3.org/2000/svg', tag);
      for (const k in attrs) n.setAttribute(k, attrs[k]);
      return n;
    }
  };

  // reading progress (rings in the contents, tint, "Continue at") is off: it was found distracting in use.
  // A page can still opt in with <html data-progress>.
  function init() {
    initBar(); initToc(); initTerms(); initSteppers(); initTabs();
    if (document.documentElement.hasAttribute('data-progress')) initProgress();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
