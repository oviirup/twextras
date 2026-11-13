# Palette generation

Producing values once structure decided. Which ramps + step jobs → [palette-structure.md](palette-structure.md).

## Start from brand color

Brand color arrives as one value, usually hex. Two decisions before ramp exists:

**Which step does it occupy?** Brand color for buttons/links belongs on solid-fill step: `600` Tailwind, `9` Radix. Primary button then renders actual brand color, not approximation.

**Pinned or snapped?** Pin contractually fixed brand color: stays exact, ramp builds outward, that step spaces slightly unevenly. Else snap onto ramp → regular spacing, almost always looks better.

Brand color failing contrast behind white text still = brand color, just not solid-fill step. Put where it lands, darker step for interactive fills. Never quietly darken brand. Example: `#3b82f6` lands `500`, fills use `600` — white on `#3b82f6` = 3.68:1.

## Correct ramp looks like

Properties of finished ramp, checkable on any output in any notation:

- **Lightness changes steadily, OKLCH `L`.** HSL lightness not perceptual; evenly spaced HSL bunches at one end.
- **Hue constant end to end.** Every step recognisably same color. Wandering hue reads as two colors blended, sits wrong against neutral built on different hue.
- **Vividness peaks middle, falls both ends.** Lightest/darkest steps nearly neutral; middle carries color. Full vividness at extremes → `50` glows, `950` like ink spilled on brand.
- **Finer steps at light end.** Light bgs need finer distinctions. `50`–`200` ~`0.04`–`0.05` apart OKLCH `L`, mid-ramp ~`0.07`–`0.10`. Even spacing leaves too few pale steps — `100` already too dark for subtle surface.
- **No two adjacent steps indistinguishable.** Adjacent <`0.03` apart OKLCH `L` → more steps than decisions. Drop one.
- **Both ends stop short of pure black/white.** Ramp reaching them loses identity exactly where page bg lives.

## Use color library

Never compute by hand/eye. `culori`, `colorjs.io`, `chroma.js` convert notations, measure perceived lightness, interpolate perceptually. Read brand color in arriving format, math in perceptual space, emit project notation:

```js
import { formatHex, interpolate, samples } from "culori";

// Perceptual interpolation, hex in and hex out.
const ramp = interpolate(["#eff6ff", "#3b82f6", "#172554"], "oklab");
const steps = samples(11).map((t) => formatHex(ramp(t)));
```

Starting point only. Linear sampling spaces lightness evenly per segment — check output against properties above, tighten `50`–`200` by hand.

Output format = project choice. Ramp interpolation space not — sRGB interpolation gives muddy mid-steps. Decorative gradients opposite: space deliberate look ([color-usage.md](color-usage.md)).

Tailwind blue ramp comparison — finer light end generated one lacks:

```css
:root {
  --blue-50: #eff6ff;
  --blue-100: #dbeafe;
  --blue-200: #bfdbfe;
  --blue-300: #93c5fd;
  --blue-400: #60a5fa;
  --blue-500: #3b82f6;
  --blue-600: #2563eb;
  --blue-700: #1d4ed8;
  --blue-800: #1e40af;
  --blue-900: #1e3a8a;
  --blue-950: #172554;
}
```

## Several hues at once

Accent + status ramps must agree step for step. `red-500` + `blue-500` read equally bright/vivid, else red button looks heavier than blue at same step.

- **Match perceived lightness exactly.** Same step, same brightness, every hue.
- **Match vividness relatively, not absolutely.** Hues share no max vividness; saturated yellow + saturated blue equally far from gray is impossible. Each ramp = same _proportion_ of what own hue reaches.

Yellows/cyans usual casualties — peak far lower than reds/blues. Copy numbers across → warning looks weak beside danger.

## Dark mode

Dark palette ≠ light reversed. Reversal = starting point, not output.

Swap semantic roles first, then tune values:

```css
:root {
  --color-bg-page: var(--neutral-50);
  --color-text-primary: var(--neutral-950);
}

.dark {
  --color-bg-page: var(--neutral-950);
  --color-text-primary: var(--neutral-50);
}
```

Three things almost always need hand-tuning after swap:

- **Vividness comes down.** Confident on white reads neon on near-black. Dark needs accent step or two less vivid.
- **Dark end needs more separation.** Steps distinguishable as pale bgs collapse as dark surfaces.
- **Contrast doesn't survive mirror.** APCA scores mirrored pairs differently — recheck every pair both appearances ([contrast.md](contrast.md)).

### Choosing switching mechanism

One mechanism throughout:

- **`prefers-color-scheme` alone** correct with no theme toggle. Nothing persist, nothing hydrate.
- **`.dark` class** required once users can override system setting. Media query then sets only initial value.
- **`light-dark()`** collapses both values one declaration. Needs `color-scheme: light dark`, reads that property not class — class toggle must set `color-scheme` too.

```css
:root {
  color-scheme: light dark;
  --color-bg: light-dark(#ffffff, #172554);
}
```

Media query setting some tokens + class setting others = half-themed interface when user overrides system preference.
