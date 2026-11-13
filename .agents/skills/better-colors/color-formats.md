# Color formats

Notation choice, conversion, gamut edges. Every other rule here stated perceptually, holds whatever notation written.

## Choosing notation

| Notation  | Good for                                                      | Weakness                                               |
| --------- | ------------------------------------------------------------- | ------------------------------------------------------ |
| Hex       | Universal support, compact, what design tools hand you        | Opaque. No channel readable/editable by hand           |
| `rgb()`   | Same reach as hex, readable alpha                             | Channels correspond to nothing designer thinks about   |
| `oklch()` | Perceptually uniform lightness, stable hue, predictable ramps | Baseline 2023; very old browser matrices need fallback |

**Match what project uses.** Notation not defect: hex project not doing it wrong.

**New color system → `oklch()` best default.** Even lightness steps stay even, fixed hue stays fixed. See [palette-generation.md](palette-generation.md).

```css
oklch(L C H)          /* lightness 0–1, chroma 0–~0.4, hue 0–360 */
oklch(L C H / alpha)  /* alpha uses slash, never comma */
```

## Converting

Convert when user asks, agreed migration in scope, or project standardizing and this value is straggler. Never convert isolated value in project deliberately using something else, never because skill loaded.

When in scope, change values only:

- Leave CSS keywords: `currentColor`, `inherit`, `transparent`, `initial`, `unset`.
- Leave gradient functions. Convert color stops inside; don't touch interpolation method.
- Leave colors in third-party configs expecting specific format.
- Preserve comments + formatting.

```css
/* Before */
color: #3b82f6;
border: 1px solid rgba(0, 0, 0, 0.1);

/* After */
color: oklch(0.623 0.188 259.815);
border: 1px solid oklch(0 0 0 / 0.1);
```

Bulk conversion = migration, not cleanup. Shifts every rendered color by rounding margin, touches unasked files — must be task, not side effect.

## Gamut

Every sRGB color exists in Display P3, not reverse. Extra room only at high chroma, varies by hue. At OKLCH `L` `0.65`, green gains ~`0.07` chroma, blue ~`0.015`.

Color more vivid than display renders gets gamut-mapped — mostly clipped in current browsers. Flattens neighbouring steps into one rendered color; ramp top loses distinctions on sRGB screen. Max vividness varies by hue + lightness. Cyans top out far lower than reds/purples — clipping ramp clips some steps not others.

Fix = reduce vividness, hold hue + lightness. Generate ramps against sRGB unless product display-restricted; P3 as enhancement:

```css
.success {
  background: #11ad32; /* oklch(0.65 0.2 145), inside sRGB */
}

@media (color-gamut: p3) {
  .success {
    background: oklch(0.65 0.27 145);
  }
}
```

Order matters: sRGB first, so sRGB screen shows chosen color not browser-clipped. P3 rule overrides only where renders.

Pre-`oklch()` browser matrices, same layering via `@supports`:

```css
.accent {
  background: #3b82f6;
}

@supports (color: oklch(0 0 0)) {
  .accent {
    background: oklch(0.62 0.19 259);
  }
}
```

Check project's actual browser matrix first. Modern baseline → dead weight.

## Modern CSS worth knowing

- **`color-mix()`** derives one color from another: `color-mix(in oklab, var(--color-accent-solid) 15%, white)` for tinted bg. Good for states; keep generated values out of token layer — mixed color uninspectable in design tool.
- **Relative color syntax** adjusts one channel of existing color. `oklch(from var(--color-accent-solid) calc(l - 0.1) c h)` darkens accent by hand. Powerful, easy to overuse — token defined by three chained derivations unreadable.
- **`light-dark()`** both appearances one declaration. See [palette-generation.md](palette-generation.md).

All three resolve at render time. Compute resolved value with color library, or measure rendered result, before reporting contrast.
