# Token naming

Naming makes palette usable by anyone who didn't build it. Ramps + step jobs → [palette-structure.md](palette-structure.md).

## Two tiers

**Primitives** name a value. The ramp, named by hue + step: `--blue-600`, `--neutral-200`. Describes what color _is_ — never changes meaning between themes, never applied directly in component.

**Semantics** name a job. Point at primitive, take role's name: `--color-text-secondary`, `--color-border-subtle`. Only tier components reference.

```css
:root {
  /* Tier 1: primitives, hue + step. Never used directly. */
  --blue-600: #2563eb;
  --neutral-200: #e5e7eb;
  --neutral-700: #374151;

  /* Tier 2: semantics, by role. What components use. */
  --color-accent-solid: var(--blue-600);
  --color-border: var(--neutral-200);
  --color-text-secondary: var(--neutral-700);
}
```

Tiering enables theming: dark mode, white-label, increased-contrast all repoint semantic tier, primitives + components untouched. Codebase applying `--blue-600` directly has no theming seam. Adding one later = audit every usage to learn which meant "accent" vs just wanted blue.

Third component-level tier (`--color-button-danger-bg`) only where component genuinely + intentionally diverges. One component token = documented exception; twenty = semantic tier missing roles.

## Role inventory

System complete when every role below has token. Build against list, not tokens as components demand — else palette shaped like whichever screen came first.

| Group    | Roles                                                                                     |
| -------- | ----------------------------------------------------------------------------------------- |
| Surfaces | page background, surface, raised (menus, popovers), sunken (inputs, wells), overlay scrim |
| Text     | primary, secondary, disabled, inverse, on-accent                                          |
| Borders  | subtle, default, strong, focus ring, separator                                            |
| Accent   | subtle background, border, solid, solid hover, text                                       |
| Status   | per status shipped: subtle background, border, solid, text                                |

Separator + border separate roles even sharing value today. Separator divides content; border encloses control. Diverge first time someone restyles inputs — conflated system untangled then.

## Naming grammar

One shape, never deviate. Neutral roles lead with property: `--color-{bg|text|border}-{variant}-{state}`. Accent/status lead with role: `--color-{accent|danger|…}-{subtle|border|solid|text}-{state}`.

```css
--color-bg-surface
--color-text-secondary
--color-border-strong
--color-accent-solid-hover
--color-danger-subtle
--color-accent-text
```

One word per concept, only that word. Consistency > vocabulary. Reader who saw `--color-text-primary` must guess `--color-text-disabled` unaided:

| Concept     | Pick one | Never mix in                                     |
| ----------- | -------- | ------------------------------------------------ |
| Foreground  | `text`   | `fg`, `foreground`, `content`, `ink`             |
| Background  | `bg`     | `background`, `surface` as synonym, `fill`       |
| Edge        | `border` | `stroke`, `outline`, `line`                      |
| Brand color | `accent` | `primary`, `brand`, `theme` used interchangeably |

Reserve `primary` one meaning. `--color-text-primary` body text beside `--color-primary` brand = most common naming collision; every `primary` token ambiguous till definition opened. `accent` = brand; `primary` = most prominent of group.

## Anti-patterns

| Name                      | Problem                                              | Instead                    |
| ------------------------- | ---------------------------------------------------- | -------------------------- |
| `--color-blue-button`     | Appearance at semantic tier; lies when brand changes | `--color-accent-solid`     |
| `--color-sidebar-gray`    | Named for first usage; second makes nonsense         | `--color-bg-surface`       |
| `--color-light-gray`      | Lies in dark mode, where it's the dark one           | `--neutral-200` primitive  |
| `--color-text-2`          | Numbered semantics carry no meaning; `3` unguessable | `--color-text-secondary`   |
| `--color-gray-hover`      | Mixes hue + state, belongs no tier                   | `--color-bg-surface-hover` |
| `--blue-600` in component | Skips semantic tier, removes theming seam            | Point semantic token at it |

## In Tailwind projects

Tailwind v4 generates utilities from `@theme` — names there become API. Declare primitives + semantics same block; `--color-*` namespace produces `bg-*`, `text-*`, `border-*`:

```css
@theme {
  /* Primitives */
  --color-blue-50: #eff6ff;
  --color-blue-600: #2563eb;
  --color-blue-900: #1e3a8a;

  /* Semantics: what templates should use */
  --color-accent-solid: var(--color-blue-600);
  --color-text-secondary: var(--color-neutral-700);
}
```

Yields `bg-accent-solid`, `text-text-secondary` alongside `bg-blue-600`. Tailwind prefixes every `--color-*` with utility → `text-` token doubles. Accept doubling or follow project convention. Both tiers reachable → discipline is convention not constraint. Templates use semantic utilities; raw `bg-blue-600` in component = flag.

Repoint semantics for dark mode in `.dark` block outside `@theme`. Leave block without `inline` → utilities read semantic variable at render time.

Opacity modifiers work either tier: `bg-accent-solid/50`. But alpha-carrying color can't be contrast-checked against static bg — rendered result depends what's behind. Solid tokens for anything with text on it.
