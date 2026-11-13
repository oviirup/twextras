---

name: better-colors
description: Builds and checks color systems by generating palettes, naming semantic tokens, converting between formats and measuring contrast.
---

# Colors

Builds and audits color systems: generates ramps, maps steps to roles and token names, converts notation, measures rendered contrast pairs.

Never report unmeasured contrast, never estimate computable color. Notation, tinted neutral, gradient interpolation space = project choices, not findings. Broken role mapping, failing pair, out-of-gamut step = findings. Perceived lightness = OKLCH `L`, `0`–`1`.

Whether pair must pass belongs to `better-accessibility`. Surfaces, shadows, icon color belong to `better-ui`.

## Match project's color system

Reuse project tokens + notation. Consistent hex beats hex with scattered `oklch()`.

New system → `oklch()` best default: numbers behave as ramp rules describe. Elsewhere color library produces same ramp in project's notation ([color-formats.md](color-formats.md)).

## System = ramps, not colors

One neutral ramp, one accent ramp, only status ramps product renders. `warning` ramp nothing imports = maintenance for zero pixels. Second accent hue earns place only when two things must differ at glance. Else more steps of one accent.

## Every step has a job

Ramp not gradient to pick by eye. Each step exists because role needs it: page bg, component hover, border, solid fill, body text. Generate no step no role consumes. Tailwind `50`–`950` and Radix `1`–`12` both map to roles ([palette-structure.md](palette-structure.md)).

## Name primitives by hue, semantics by role

Primitives name value (`--blue-600`), never applied in component. Semantics name job (`--color-text-secondary`), point at primitive, only tier components reference. Seam lets theme repoint colors without touching components ([token-naming.md](token-naming.md)).

## Use token only in its role

Never borrow token because value right today. Separator as text color works until borders lighten, then text goes too. Role has no token → add token.

## Hold hue across ramp

Ramp holds one hue end to end, peaks vividness mid-ramp, finer steps at light end. Build with color library, never by eye ([palette-generation.md](palette-generation.md)).

## One color, one meaning

One color one purpose across interface; anything within `15°` OKLCH hue = same color ([color-usage.md](color-usage.md)). Color never only carrier of meaning — pair with icon or label (`better-accessibility` owns that requirement).

## Fill exactly one action per view

Filled color encodes primary emphasis → one primary action gets it, peers neutral. Color on background, not label. Filled button reads primary across room; accent text on neutral button reads as link.

Keep established hierarchy signaling emphasis another way. Several colored backgrounds fine when encoding distinct states/categories, not competing peers.

## Measure rendered pair, then report

Measure foreground against background it actually renders on, not page bg. Pair fails → report pair, measured value, missed threshold, leave colors alone (design decision). Change only when asked, remeasure after ([contrast.md](contrast.md)).

## Pick gradient's interpolation space

Space = look, not correctness. Default `in oklab`; `in oklch` when two-hue gradient goes gray mid ([color-usage.md](color-usage.md)).

## Before you finish

| Pattern                                                                                   | Fix                                                             |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Hex, `rgb(` or `oklch(` literal in component where token exists                           | Reuse or add role token, project's notation                     |
| One `oklch(` value in hex codebase                                                        | Write established notation unless migration in scope            |
| `var(--blue-600)` or `bg-blue-600` in component                                           | Point semantic token at primitive, use that                     |
| Semantic name containing hue or component (`--color-blue-button`, `--color-sidebar-gray`) | Rename for role: `--color-accent-solid`, `--color-bg-surface`   |
| `--color-primary` and `--color-text-primary` both defined                                 | Rename brand token `accent`                                     |
| `border`/`separator` token inside `color:`, or `text` token inside `background:`          | Add token for missing role                                      |
| `hsl(` ramp values differing only in lightness                                            | Rebuild constant perceived hue, project's notation              |
| `50`–`200` stepping as far apart in OKLCH `L` as mid-ramp                                 | Tighten light end to ~`0.04`–`0.05` per step                    |
| One chroma/saturation copied across every hue's ramp                                      | Same proportion of each hue's own maximum                       |
| Status hue within `15°` of accent hue                                                     | Move ≥`15°` away, or give destructive action distinct treatment |
| Dark tokens = light ramp reversed step order                                              | Lower accent chroma, widen dark end, remeasure every pair       |
| Color tokens under both `prefers-color-scheme` and `.dark` class                          | Pick one switching mechanism throughout                         |
| Contrast fix changing hue, leaving lightness                                              | Change lightness — channel contrast responds to                 |
| `prefers-contrast: more` overriding color for both appearances in one block               | Per-appearance increased-contrast value                         |
| Text on alpha color (`/50`, `rgba(`, `color-mix(` + `transparent`)                        | Measure rendered result, or use solid token                     |
| `text-white` on Tailwind `500` fill                                                       | Measure; white on most `500` hues fails 4.5:1 → fill `600`      |
| `oklch()` chroma beyond sRGB, no sRGB value first                                         | sRGB value first, vivid one inside `@media (color-gamut: p3)`   |

## Reporting

**Severity.** `HIGH` = content unreadable or misleading semantic color. `MEDIUM` = noticeable theme/token/gamut failure. `LOW` = isolated polish.

Three symptoms `HIGH` on sight, matching `better-interface` triggers: body/control text rendered pair fails required ratio; state/meaning by color alone; semantic color against meaning.

**Verification.** No browser: token values, gamut of every declared color, both theme blocks, contrast computed from declared pair. With browser: background actually rendered behind text (opacity, image beneath), both light + dark. Unrun check = `Not verified`.

**Format.** Group findings under violated principle, ordered by severity, one row per root cause listing every location:

| Severity | Location | Before | After | Why |
| -------- | -------- | ------ | ----- | --- |

`Location` = `path/to/file:line`. `Why` = principle + user impact.

End `Block` when any `HIGH` remains, `Approve` otherwise; rest stays table as work. Never `Approve` uninspected coverage. Nothing to report → "No actionable color findings" + verification.
