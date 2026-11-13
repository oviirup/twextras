# Contrast

Measured between **foreground** (text, icon, UI element) and **background** it actually renders against — nearest ancestor painting one. Identify background first. Measuring against page bg when element sits on card = wrong answer.

`better-accessibility` decides which requirement applies. Thresholds below = what measured pair reported against. Neither it nor project names standard → report WCAG 2 result + APCA value.

## WCAG 2 thresholds

Standard formal conformance claims made against.

| Content type                          | AA    | AAA   |
| ------------------------------------- | ----- | ----- |
| Text                                  | 4.5:1 | 7:1   |
| Large text, ≥`24px` or `18.67px` bold | 3:1   | 4.5:1 |
| UI components and graphical objects   | 3:1   | n/a   |

Disabled/inactive controls + logos exempt.

## APCA thresholds

Lc (Lightness Contrast) = APCA's perceived contrast measure. Simplified font-size/weight lookup:

| Content type                                    | Minimum                |
| ----------------------------------------------- | ---------------------- |
| Body text, columns or blocks                    | Lc 75, preferred Lc 90 |
| Non-body text (labels, headlines)               | Lc 60                  |
| Large text, ≥`36px` regular or `24px` bold      | Lc 45                  |
| Fine-detail or outline icons                    | Lc 45                  |
| Solid icons + UI components                     | Lc 30                  |
| Non-text only needing discernibility (dividers) | Lc 15                  |

Disabled/placeholder text: no requirement. Aim Lc 30 for legibility.

Lc signed: positive = dark text on light bg, negative = light on dark. Compare absolute value to threshold.

## Fix failing pair only on request

**Change lightness first** — channel contrast responds to. Hue/saturation move measured value far less.

Move foreground away from background in perceived lightness, hold hue + saturation, remeasure. Fixed hue stops contrast fix becoming palette change.

```css
/* Failing: text too close to background in lightness (Lc ≈ 50) */
color: #7d93b0;
background: #eef2f7;

/* Fixed: darker text, same hue (Lc ≈ 88) */
color: #2b3a4f;
background: #eef2f7;
```

Two constraints:

- **Mid-lightness backgrounds cap achievable.** Bg near OKLCH `L` `0.75` → even pure black text ~Lc 60. Body text needs bg near one extreme; mid-range bg is what must change.
- **Pushing lightness can push color out of gamut.** Reduce saturation to stay renderable. See [color-formats.md](color-formats.md).

Always remeasure after change. Don't assume fix landed.

## Pick text polarity from background

Compare black + white using project's required metric. APCA + WCAG 2 can favor different text colors on same bg. Higher score alone ≠ pair passes.

WCAG 2 neutral crossover near 56% OKLCH lightness. At `oklch(65% 0 0)`: black ~`6.49:1`, white `3.23:1` — only black passes AA normal text. Colored bgs/other foregrounds → measure actual pair, don't apply crossover.

## What to check

- **Every pair, every appearance.** APCA scores mirrored pairs differently — pair passing light can fail dark.
- **Translucent surfaces.** Color on `backdrop-filter` header/overlay shifts with whatever scrolls behind. Test lightest + darkest content it can sit over, or make surface opaque enough shift can't break pair.
- **Computed colors.** `color-mix()`, relative color syntax, opacity modifiers resolve at render — measure rendered result, not declaration.
- **Text over images.** No single bg color. Measure worst region, or guarantee one with scrim.
