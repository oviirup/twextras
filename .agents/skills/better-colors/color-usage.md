# Color usage

Deploying color once system exists: meaning, emphasis, gradients, appearance variants. Values → [palette-generation.md](palette-generation.md); names → [token-naming.md](token-naming.md); pairs → [contrast.md](contrast.md).

## One color, one meaning

Users read near-miss hue as slightly different shade, not different color.

```css
/* Bad: accent means both "link" and "decorative heading" */
a {
  color: #3b82f6;
}
.section-title {
  color: #4f8ef7;
}

/* Good: interactive elements own accent; headings stay neutral */
a {
  color: var(--color-accent-text);
}
.section-title {
  color: var(--color-text-primary);
}
```

Rule runs both ways: color must not be _absent_ where meaning occurs. Accent = interactive → interactive element rendered neutral just as misleading.

## Use tokens in their role

Value working in two roles stops working in both at next theme change.

```css
/* Bad: separator token repurposed as text color because it looked right */
.caption {
  color: var(--color-border);
}

/* Bad: text token repurposed as background */
.tag {
  background: var(--color-text-secondary);
}
```

Role inventory in [token-naming.md](token-naming.md) = full role list.

## One colored action per view

```html
<!-- Good: one filled primary action, neutral secondaries -->
<button class="bg-accent-solid text-text-on-accent">Save</button>
<button class="text-text-secondary">Cancel</button>

<!-- Bad: every action colored, nothing primary -->
<button class="bg-accent-solid text-text-on-accent">Save</button>
<button class="bg-accent-solid text-text-on-accent">Duplicate</button>
<button class="bg-accent-solid text-text-on-accent">Export</button>
```

Selected states may use accent on glyph + label. Active tab, checked segment = state, not emphasis.

## Gradients

**Interpolation space = look, not correctness.** Three worth knowing; difference most visible mid-gradient:

```css
/* sRGB: default + classic. Midpoint darkens, mutes. */
background: linear-gradient(#3b82f6, #ec4899);

/* oklab: even brightness across transition. Best default. */
background: linear-gradient(in oklab, #3b82f6, #ec4899);

/* oklch: travels around hue wheel, stays vivid. */
background: linear-gradient(in oklch, #3b82f6, #ec4899);
```

`oklab` + sRGB **rectangular** — straight line through space. `oklch` **polar** — interpolates hue angle, arcs around wheel through every hue between stops. Stays saturated; can produce unasked hues. Blue→pink routes through purple: either the look or surprise.

**Gray dead zone = rectangular-space problem.** Two hues opposite wheel sides sit either side of neutral axis; straight line passes near gray, middle goes lifeless. Switch to polar (routes around axis) or add third stop between two, keep space.

Polar space controls direction:

```css
/* Short way round, usually what you want */
background: linear-gradient(in oklch shorter hue, #3b82f6, #ec4899);

/* Long way, sweeps most of spectrum */
background: linear-gradient(in oklch longer hue, #3b82f6, #ec4899);
```

**Banding on large areas.** Gradient spanning hero, little contrast between stops, steps visibly on 8-bit displays. Widen contrast, shrink area, or overlay subtle noise.

**Keep text off gradients where possible.** Contrast varies continuously — one measurement doesn't describe it. Text must sit on gradient → measure worst region, or scrim behind.

## Color across cultures

Color carrying meaning in finance/status/alerts → verify meaning holds every shipped locale. Chinese financial UIs show gains red, losses green — reverse of English. Such markets → gain/loss per-locale tokens, not hardcoded values.

## Light, dark, increased contrast

Dark appearance → every custom color needs dark variant, derived per [palette-generation.md](palette-generation.md). Increased contrast → visibly stronger differentiation per appearance:

```css
:root {
  --color-accent-solid: var(--blue-600);
}

@media (prefers-contrast: more) {
  :root {
    --color-accent-solid: var(--blue-900);
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-accent-solid: var(--blue-400);
  }
}

@media (prefers-color-scheme: dark) and (prefers-contrast: more) {
  :root {
    --color-accent-solid: var(--blue-200);
  }
}
```

Single `prefers-contrast` block shared by both appearances darkens color on dark bg too, lowering contrast there. Increased-contrast variant widens gap to background ≥`0.15` OKLCH `L` over default. Remeasure, aim Lc 90 on body text. Widening gap without remeasuring ≠ fixing.
