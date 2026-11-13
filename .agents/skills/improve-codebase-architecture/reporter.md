# HTML Report Format

Review = single self-contained HTML in OS temp dir. Tailwind + Mermaid from CDNs. Mermaid for graph-shaped diagrams reliably; hand-built divs/inline SVG for editorial visuals (mass diagrams, cross-sections). Mix — don't lean on Mermaid for everything, goes generic.

## Scaffold

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Architecture review for {{repo name}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="module">
      import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
      mermaid.initialize({ startOnLoad: true, theme: "neutral", securityLevel: "loose" });
    </script>
    <style>
      /* small custom layer for what Tailwind doesn't cover:
         dashed seam lines, hand-drawn arrow heads, etc. */
      .seam { stroke-dasharray: 4 4; }
      .leak { stroke: #dc2626; }
      .deep { background: linear-gradient(135deg, #0f172a, #1e293b); }
    </style>
  </head>
  <body class="bg-stone-50 text-slate-900 font-sans">
    <main class="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <header>...</header>
      <section id="candidates" class="space-y-10">...</section>
      <section id="top-recommendation">...</section>
    </main>
  </body>
</html>
```

## Header

Repo name, date, compact legend: solid box = module, dashed line = seam, red arrow = leakage, thick dark box = deep module. No intro paragraph. Straight into candidates.

## Candidate card

Diagrams carry weight. Prose sparse, plain, glossary terms (from `/codebase-design`) without ceremony.

Each candidate = one `<article>`:

- **Title**: short, names deepening ("Collapse the Order intake pipeline").
- **Badge row**: strength (`Strong` = emerald, `Worth exploring` = amber, `Speculative` = slate) + dependency category tag (`in-process`, `local-substitutable`, `ports & adapters`, `mock`).
- **Files**: monospaced list, `font-mono text-sm`.
- **Before / After diagram**: centrepiece. Two columns side by side. Patterns below.
- **Problem**: one sentence. What hurts.
- **Solution**: one sentence. What changes.
- **Wins**: bullets, ≤6 words each. "Tests hit one interface", "Pricing logic stops leaking", "Delete 4 shallow wrappers".
- **ADR callout** (if applicable): one line amber-tinted box.

No explanation paragraphs. Diagram needing paragraph = redraw diagram.

## Diagram patterns

Pick fitting pattern, mix them, don't make every diagram same. Variety = point.

### Mermaid graph (workhorse: dependencies / call flow)

Mermaid `flowchart`/`graph` when point is "X calls Y calls Z, look at mess." Wrap in Tailwind-styled card. classDef colors leakage edges red, deep module dark. Sequence diagrams good for "before: 6 round-trips; after: 1."

```html
<div class="rounded-lg border border-slate-200 bg-white p-4">
  <pre class="mermaid">
    flowchart LR
      A[OrderHandler] --> B[OrderValidator]
      B --> C[OrderRepo]
      C -.leak.-> D[PricingClient]
      classDef leak stroke:#dc2626,stroke-width:2px;
      class C,D leak
  </pre>
</div>
```

### Hand-built boxes-and-arrows (when Mermaid layout fights)

Modules = bordered labeled `<div>`s. Arrows = inline SVG `<line>`/`<path>` absolutely positioned over relative container. For "after" feeling like one thick-bordered deep module with greyed internals — Mermaid won't render right weight.

### Cross-section (layered shallowness)

Stack horizontal bands (`h-12 border-l-4`) showing layers call passes through. Before: 6 thin layers doing nothing. After: 1 thick band = consolidated responsibility.

### Mass diagram ("interface as wide as implementation")

Two rectangles per module: interface surface area + implementation. Before: interface ≈ implementation height (shallow). After: interface short, implementation tall (deep).

### Call-graph collapse

Before: function-call tree as nested boxes. After: same tree collapsed into one box, now-internal calls faded inside.

## Style guidance

- Lean editorial, not corporate-dashboard. Generous whitespace. Serif optional headings (`font-serif` works with stone/slate).
- Color sparingly: one accent (emerald or indigo) + red leakage + amber warnings.
- Diagrams ~320px tall → before/after side by side, no scroll.
- `text-xs uppercase tracking-wider` module labels in diagrams → schematic, not UI.
- Only scripts: Tailwind CDN + Mermaid ESM import. Otherwise static: no app code, no interactivity beyond Mermaid rendering.

## Top recommendation section

One larger card. Candidate name, one sentence why, anchor link to card. That's it.

## Tone

Plain English, concise; architectural nouns/verbs straight from `/codebase-design`. Concision no excuse to drift.

**Use exactly:** module, interface, implementation, depth, deep, shallow, seam, adapter, leverage, locality.

**Never substitute:** component, service, unit (for module) · API, signature (for interface) · boundary (for seam) · layer, wrapper (for module, when meaning module).

**Phrasings that fit:**

- "Order intake module is shallow: interface nearly matches the implementation."
- "Pricing leaks across the seam."
- "Deepen: one interface, one place to test."
- "Two adapters justify the seam: HTTP in prod, in-memory in tests."

**Wins bullets** name gain in glossary terms: _"locality: bugs concentrate in one module"_, _"leverage: one interface, N call sites"_, _"interface shrinks; implementation absorbs the wrappers"_. Never _"easier to maintain"_ or _"cleaner code"_ — not in glossary, don't earn place.

No hedging, no throat-clearing, no "it's worth noting that…". Sentence could be bullet → bullet. Bullet could be cut → cut. Term not in `/codebase-design` glossary → reach for glossary term before inventing.
