---

name: improve-codebase-architecture
description: Scan a codebase for deepening opportunities, present them as a visual HTML report, then grill through whichever one you pick.
disable-model-invocation: true
---

# Improve Codebase Architecture

Surface architectural friction, propose **deepening opportunities**: refactors turning shallow modules into deep ones. Aim = testability + AI-navigability.

Informed by project domain model, built on shared design vocabulary:

- Skill tool "codebase-design" for architecture vocabulary (**module**, **interface**, **depth**, **seam**, **adapter**, **leverage**, **locality**) + principles (deletion test, "interface is test surface", "one adapter = hypothetical seam, two = real"). Use terms exactly in every suggestion; don't drift to "component," "service," "API," "boundary."
- `GLOSSARY.md` domain language names good seams; ADRs in `docs/adr/` record decisions not to re-litigate.

## Process

### 1. Explore

**Scope before scan: YAGNI.** Deepening pays off by making future changes easier — weight recently changed parts. Decide _where_ before looking:

- User named direction (module, subsystem, pain point) → take it, skip inference.
- Else walk back commit history (`git log --oneline`) for hot spots — files/areas that keep coming up pull attention first. Scattered changes, no hot spot → widen net.

Read `GLOSSARY.md` + ADRs in area first.

Then spawn sub-agent, fresh context, walks codebase organically, notes friction:

- Where does understanding one concept require bouncing between many small modules?
- Where modules **shallow** — interface nearly as complex as implementation?
- Where pure functions extracted just for testability, real bugs hide in how called (no **locality**)?
- Where tightly-coupled modules leak across seams?
- What's untested or hard to test through current interface?

**Deletion test** on suspected shallow: would deleting concentrate complexity or just move it? "Yes, concentrates" = signal wanted.

### 2. Present candidates as HTML report

Self-contained HTML to OS temp dir, nothing in repo. Temp dir from `$TMPDIR`, fallback `/tmp` (`%TEMP%` Windows); write `<tmpdir>/architecture-review-<timestamp>.html`, fresh file per run. Open for user (`xdg-open` Linux, `open` macOS, `start` Windows), give absolute path.

**Tailwind via CDN** layout/styling, **Mermaid via CDN** diagrams where graph/flow/sequence reliably communicates. Mix Mermaid with hand-crafted CSS/SVG: Mermaid for graph-shaped (call graphs, dependencies, sequences), hand-built divs/SVG for editorial (mass diagrams, cross-sections, collapse animations). Each candidate gets **before/after visualisation**. Be visual.

Per candidate card:

- **Files**: modules involved
- **Problem**: why current architecture causes friction
- **Solution**: plain English what changes
- **Benefits**: locality + leverage terms, how tests improve
- **Before / After diagram**: side-by-side, custom-drawn, shallowness → deepening
- **Recommendation strength**: `Strong`, `Worth exploring`, `Speculative` badge

End with **Top recommendation**: which candidate first + why.

**GLOSSARY.md vocabulary for domain, `/codebase-design` vocabulary for architecture.** `GLOSSARY.md` defines "Order" → "the Order intake module," not "FooBarHandler," not "Order service."

**ADR conflicts**: candidate contradicting ADR → surface only when friction real enough to warrant revisiting. Mark clearly (warning callout: _"contradicts ADR-0007, but worth reopening because…"_). Don't list every theoretical refactor ADR forbids.

Full HTML scaffold, diagram patterns, styling → [reporter.md](reporter.md).

Do NOT propose interfaces yet. After file written ask: "Which of these would you like to explore?"

### 3. Grilling loop

User picks candidate → Skill tool "grilling" walks decision tree: constraints, dependencies, deepened module shape, what sits behind seam, what tests survive.

Side effects inline as decisions crystallize; Skill tool "domain-modeling" keeps domain model current:

- **Deepened module named after concept not in `GLOSSARY.md`?** Add term. Create file lazily if missing.
- **Fuzzy term sharpened mid-conversation?** Update `GLOSSARY.md` right there.
- **User rejects candidate with load-bearing reason?** Offer ADR: _"Want me to record this as an ADR so future architecture reviews don't re-suggest it?"_ Only when reason needed by future explorer to avoid re-suggesting; skip ephemeral ("not worth it now") + self-evident.
- **Explore alternative interfaces for deepened module?** Skill tool "codebase-design", design-it-twice parallel sub-agent pattern.
