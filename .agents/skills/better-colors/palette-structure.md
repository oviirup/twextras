# Palette structure

What color system made of, before values exist. Values → [palette-generation.md](palette-generation.md); names → [token-naming.md](token-naming.md).

## What system needs

Most products need three ramp kinds, nothing else:

| Ramp    | How many | Notes                                                                          |
| ------- | -------- | ------------------------------------------------------------------------------ |
| Neutral | 1        | Carries 80–90% of interface: backgrounds, borders, body text                   |
| Accent  | 1        | Brand hue. Interactive + selected states                                       |
| Status  | 0–4      | `danger`, `warning`, `success`, `info`. Add only when product shows that state |

## Every step has a job

Each step maps to role. Generate steps roles call for, skip rest.

| Role                        | Tailwind | Radix |
| --------------------------- | -------- | ----- |
| Page background             | `50`     | `1`   |
| Subtle background           | `50`     | `2`   |
| Component background        | `100`    | `3`   |
| Component hover             | `200`    | `4`   |
| Component active / selected | `200`    | `5`   |
| Subtle border, separator    | `200`    | `6`   |
| Border, focus ring          | `300`    | `7`   |
| Hovered border              | `400`    | `8`   |
| Solid fill                  | `600`    | `9`   |
| Solid fill hover            | `700`    | `10`  |
| Low-contrast text           | `700`    | `11`  |
| High-contrast text          | `900`    | `12`  |

Conventions differ in kind, not only numbering:

- **Radix defines 12 steps by role.** Step 9 = "solid fill" every ramp + appearance. Dark scale = separate ramp reusing numbers → `--accent-9` fill in both, component CSS never changes.
- **Tailwind defines 11 steps by lightness.** `50` light, `950` dark. Mapping holds light mode, inverts dark: page bg `950`, high-contrast text `50`. Components swap step numbers per appearance or read semantic token that swaps once.

Match project's. New system → prefer Radix model: role-defined step survives theme change lightness-defined doesn't. On Tailwind keep `50`–`950`, role mapping in semantic tier.

Solid fill on `600` because white text on most Tailwind `500` hues fails 4.5:1. Repeated steps render identically. Design needing component hover ≠ subtle border needs 12-step ramp.

## Neutrals

Pure gray ramp = perfectly good default. Sits under any accent hue without competing, never revisited when brand changes.

Tinting neutral toward accent hue = stylistic option, not correction. OKLCH chroma `0.005`–`0.02` at accent hue puts grays in accent family. Enough to measure, not enough to name.

Warm neutrals (hue → orange) read approachable/editorial; cool (→ blue) read technical/precise. Pick any incl. none, hold across whole ramp. Warm gray border on cool gray bg visible even when neither nameable alone.

Neutrals carry most roles → need most steps. Never fewer neutral steps than accent.

## Status colors

Convention constrains status hues before taste. Red = danger, amber = warning, green = success. Cultural exceptions → [color-usage.md](color-usage.md).

Two rules:

- **Every status hue ≥`15°` OKLCH hue from accent.** Brand red → danger cannot also be red. Convention leaves nowhere → destructive action gets distinct treatment (outlined button + icon), else reads as primary.
- **Status ramps need fewer steps than accent.** Most render four roles: background, border, solid fill, text. Full ramp only where product styles status components across range.

## Auditing existing palette

Before restructuring, inventory. Most codebases hold several times more colors than design has decisions.

1. **Collect every literal.** Grep hex, `rgb(`, `hsl(`, `oklch(`, project utility-class prefixes. Include SVG `fill`/`stroke`, chart configs, email templates.
2. **Sort by perceived lightness within hue family.** Duplicates surface as near-identical neighbors.
3. **Collapse near-duplicates.** Two colors <`0.02` apart OKLab ΔE = one color that drifted. Keep most-used, retire rest. Never average.
4. **Assign each survivor a role** from table above. Color matching no role = missing token or mistake. Decide which, say so in finding.
5. **Count what's left.** More ramps than **What a system needs** → palette outgrew structure, not product needs more color.

Report inventory before changing anything. Consolidating changes rendered output on unasked screens — stays proposal until user accepts.
