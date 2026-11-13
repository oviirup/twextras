# Design Systems from DESIGN.md

Build new app from preset, install every component, restyle from `DESIGN.md`, render design system page.

Trigger phrases: "build me a design system using <preset>", "apply this DESIGN.md", "create a showcase / design system page", "make shadcn look like <brand>".

## Contents

- Inputs to confirm
- Step 1: Scaffold
- Step 2: Install everything
- Step 3: Read the DESIGN.md
- Step 4: Map tokens to theme
- Step 5: Map component recipes to variants
- Step 6: Build design system page ([design-system-page.md](./design-system-page.md))
- Step 7: Verify
- Report back

---

## Inputs to Confirm

| Input     | Default                         | Notes                                                                                                                   |
| --------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Preset    | Optional                        | Code (`b0`), style name (`luma`), URL. Pass through. Never decode by hand. Without one, pick style (Step 1).            |
| DESIGN.md | Required                        | Path, URL, or pasted content. Copy into new app root as `DESIGN.md`.                                                    |
| Template  | `vite`                          | `next` when user says Next.js, App Router, SSR.                                                                         |
| App name  | Derived from brand in DESIGN.md | Kebab-case.                                                                                                             |
| Base      | `base`                          | Pass `--base` when no preset code. `radix` only when user asks. `info --json` after init decides `render` vs `asChild`. |

DESIGN.md path unreadable (macOS privacy blocks `~/Downloads`/`~/Desktop`) → ask user copy into working dir. Don't guess contents.

---

## Step 1: Scaffold

With preset code:

```bash
npx shadcn@latest init --preset <code> --template vite --name <app> --no-monorepo -y
```

Without one, pick style whose geometry closest to DESIGN.md, pass with `--base`:

```bash
npx shadcn@latest init --base base --preset <style> --template vite --name <app> --no-monorepo -y
```

Then:

```bash
cd <app>
npx shadcn@latest info --json
```

`init` with neither `--preset` nor `--base` stops at interactive library prompt even with `-y`. Always pass one + `--no-monorepo`.

### Picking a style

Theme gets replaced by DESIGN.md anyway. Style decides geometry CSS variables can't reach: control padding, density, roundedness, elevation. Read DESIGN.md radius scale, control heights, shadows, layout density, then pick:

| Style  | Character                                             | Pick when DESIGN.md has                                                |
| ------ | ----------------------------------------------------- | ---------------------------------------------------------------------- |
| `vega` | Classic shadcn/ui look.                               | Neutral, conventional SaaS geometry; nothing extreme.                  |
| `nova` | Reduced padding/margins, compact layouts.             | 32–36px controls, 6–8px radius, hairlines over shadows.                |
| `maia` | Soft and rounded, generous spacing.                   | 40px+ controls, 12px+ card radius, generous padding, editorial pacing. |
| `lyra` | Boxy and sharp.                                       | 0–4px radius, hard edges, mono/technical type.                         |
| `mira` | Compact.                                              | Dense data UIs, 28–32px controls, tight tables.                        |
| `luma` | Rounded geometry, soft elevation, breathable layouts. | Pill buttons, soft layered shadows, glassy/macOS-like surfaces.        |
| `rhea` | Luma, more compact.                                   | Luma's softness + product-UI density.                                  |
| `sera` | Editorial and typographic.                            | Serif display type, editorial pacing, magazine-like hierarchy.         |

State choice + reason one line ("Picked maia: 40px controls, 12–16px cards, generous padding"). User names style → use it. Read `base`, `style`, `iconLibrary`, `tailwindCssFile`, `aliases` from `info` before writing code.

## Step 2: Install Everything

```bash
npx shadcn@latest add --all -y
ls <resolvedPaths.ui>/*.tsx | wc -l
```

Count component files on disk. Never quote count from memory.

Wire providers in app root:

- Wrap app in `TooltipProvider`.
- Base UI: wrap in `Toaster` from `toast` component, call `toast.add({ title, description, type })`. Radix: render `<Toaster />` from `sonner`.

Typecheck app sources. Vite root `tsc --noEmit` checks nothing (root tsconfig only project references):

```bash
npx tsc -p tsconfig.app.json --noEmit   # Vite.
npx tsc --noEmit                        # Next.js.
```

Fix generated files failing strict checks (unused `React` import) before moving on, or `vite build` fails.

---

## Step 3: Read the DESIGN.md

DESIGN.md usually has YAML frontmatter (`colors`, `typography`, `rounded`, `spacing`, `components`) + prose sections (Overview, Colors, Typography, Layout, Elevation, Shapes, Components, Do's and Don'ts, Responsive, Known Gaps). Some only prose with `{colors.x}` refs. Handle both.

Long files exceed one read. Grep headings first, then read frontmatter, **Do's and Don'ts**, **Iteration Guide**, **Known Gaps** in full — rules overriding defaults.

Extract to working table before editing:

| Extract               | Look for                                                              |
| --------------------- | --------------------------------------------------------------------- |
| Canvas + ink          | `canvas`, `surface`, `ink`, "page floor", "body text"                 |
| Action color + states | `primary`, `-hover`, `-active`, `-pressed`, `-disabled`, `on-primary` |
| Secondary actions     | `button-secondary` fill, text, border                                 |
| Surfaces              | card fills, soft bands, dark product surfaces                         |
| Lines                 | `hairline`, border alpha, "1px solid"                                 |
| Focus                 | outline vs ring, color, width, offset, alpha                          |
| Type families         | display, body, mono, documented **substitutes**                       |
| Type scale            | size, weight, line height, tracking per token                         |
| Radius scale          | every value + what it applies to                                      |
| Elevation             | each shadow tier, verbatim                                            |
| Control heights       | button, input, ghost, icon-button heights + padding                   |
| Hard rules            | every "Don't" and "never"                                             |

---

## Step 4: Map Tokens to Theme

Edit only `tailwindCssFile`. Keep hex when DESIGN.md gives hex. Don't convert to OKLCH.

### Role mapping

| DESIGN.md role                               | shadcn variable                                             |
| -------------------------------------------- | ----------------------------------------------------------- |
| canvas / surface / page floor                | `--background`                                              |
| ink / headline text                          | `--foreground`, `--card-foreground`, `--popover-foreground` |
| primary CTA fill / on-primary                | `--primary` / `--primary-foreground`                        |
| primary hover/pressed/active fill            | new `--primary-active` (or `--primary-pressed`)             |
| secondary button fill / text                 | `--secondary` / `--secondary-foreground`                    |
| soft band, alternating section               | `--muted`                                                   |
| secondary/descriptive text                   | `--muted-foreground`                                        |
| ghost hover wash, active tab, menu highlight | `--accent` / `--accent-foreground`                          |
| card / feature card fill                     | `--card`                                                    |
| floating layer (menus, dialogs)              | `--popover` (usually canvas)                                |
| hairline / structural border                 | `--border`, `--input`                                       |
| focus color                                  | `--ring`                                                    |
| error / validation                           | `--destructive`                                             |
| illustration accents                         | `--chart-1` … `--chart-5`, plus named tokens                |
| sidebar/nav rail surface                     | `--sidebar-*`                                               |

Token without shadcn slot → variable in `:root` (+ `.dark` when changes) + registration in `@theme inline`:

```css
:root {
  --primary-active: #a9583e;
  --surface-card: #efe9de;
}

@theme inline {
  --color-primary-active: var(--primary-active);
  --color-surface-card: var(--surface-card);
}
```

### Radius

DESIGN.md radius scale rarely fits `--radius` multipliers. Pin each step in `@theme inline`. base-nova classes:

| Class         | Used by                                         |
| ------------- | ----------------------------------------------- |
| `rounded-sm`  | Small accents                                   |
| `rounded-md`  | Menu, select, command items                     |
| `rounded-lg`  | Buttons, inputs, selects, tabs, popovers, menus |
| `rounded-xl`  | Cards, dialogs, command                         |
| `rounded-2xl` | Toasts, large containers                        |
| `rounded-4xl` | Badges (pill)                                   |

```css
@theme inline {
  /* DESIGN.md step → Tailwind class used by that component. */
  --radius-sm: 4px; /* xs: accents. */
  --radius-md: 6px; /* sm: menu items. */
  --radius-lg: 8px; /* md: buttons, inputs. */
  --radius-xl: 12px; /* lg: cards, dialogs. */
  --radius-2xl: 16px; /* xl: toasts, hero containers. */
  --radius-3xl: 16px;
  --radius-4xl: 9999px; /* pill: badges. */
}
```

Replace existing `--radius-*` lines in `@theme inline`, not second block. Confirm classes for installed style:

```bash
grep -ohE "rounded-(\[[^ \"]+\]|[a-z0-9]+)" <ui>/*.tsx | sort | uniq -c
```

`rounded-[min(var(--radius-md),Npx)]` caps small buttons/select triggers. Edit cap when DESIGN.md wants rounder small controls.

### Elevation

Override Tailwind shadow scale in `@theme`, not `@theme inline`. Copy multi-layer shadows verbatim. `--shadow-xs` → `0 0 #0000` for hairline-only systems (inputs + outline buttons use it).

```css
@theme {
  --shadow-xs: 0 0 #0000;
  --shadow-sm: 0 1px 3px rgb(20 20 19 / 0.08);
  --shadow-lg: 0 1px 3px rgb(20 20 19 / 0.08), 0 8px 24px rgb(20 20 19 / 0.06);
}
```

### Fonts

Brand fonts usually licensed. Use substitutes DESIGN.md names, installed via Fontsource with project package manager, import every referenced face at top of CSS:

```bash
npm install @fontsource-variable/inter @fontsource-variable/cormorant-garamond @fontsource-variable/jetbrains-mono
```

```css
@import "@fontsource-variable/inter";
@import "@fontsource-variable/cormorant-garamond";
@import "@fontsource-variable/jetbrains-mono";

@theme inline {
  --font-sans: "Inter Variable", -apple-system, system-ui, sans-serif;
  --font-serif: "Cormorant Garamond Variable", Garamond, serif;
  --font-mono: "JetBrains Mono Variable", ui-monospace, monospace;
  --font-heading: var(--font-sans);
}
```

`--font-heading` styles small component titles (`CardTitle`, `DialogTitle`, `SheetTitle`). Point at display face only when reads well at 16px. Else keep sans + display tokens for page headings.

### Type scale

Every typography token → `type-*` utility. NOT `--text-*` theme keys — `cn()` treats unknown `text-*` as colors, drops whichever comes first next to `text-muted-foreground`.

```css
@utility type-display-lg {
  font-family: var(--font-serif);
  font-size: clamp(34px, 3vw + 16px, 48px);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.021em;
}

@utility type-caption-upper {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
```

- Clamp display sizes for mobile. Convert pixel tracking to `em` (`-1px / 48px = -0.021em`) so ratio holds shrinking.
- Respect tracking rules (none below size) + weight (display never bold).

### Dark mode

- **DESIGN.md defines dark surfaces** (product mockups, footers): put in `.dark`. shadcn's `@custom-variant dark (&:is(.dark *))` scopes to descendants → `className="dark"` on any section renders all components inside with dark tokens. Use for dark bands, featured pricing cards, footers.
- **DESIGN.md light-only**: derive `.dark` from brand's known dark surfaces, tell user derived.

### Focus

Match documented focus treatment:

- **Ring with alpha** ("3px coral at 15%"): replace `ring-ring/50` with documented alpha on field components (`input`, `textarea`, `input-group`, `select`, `native-select`, `combobox`, `input-otp`).
- **Solid outline with offset**: unlayered rule beats `outline-none`, cancel ring shadow:

```css
:is(
  button,
  a[href],
  [role="button"],
  [role="tab"],
  [role="checkbox"],
  [role="radio"],
  [role="switch"],
  [role="slider"]
):focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
  --tw-ring-shadow: 0 0 #0000;
}
```

Covers actions only. Field controls keep ring. DESIGN.md applies outline to fields too → add `input, textarea, select, [role="combobox"]` to selector.

---

## Step 5: Map Component Recipes to Variants

Restyle via `cva` variants in installed component source. Keep existing variant names so usage stays standard. New variant only when DESIGN.md defines distinct recipe.

| DESIGN.md recipe                     | shadcn target                                |
| ------------------------------------ | -------------------------------------------- |
| `button-primary`                     | `Button` `default`                           |
| `button-secondary` (tinted fill)     | `Button` `secondary`                         |
| `button-secondary` (canvas + border) | `Button` `outline`                           |
| `button-ghost`, nav links            | `Button` `ghost`                             |
| text link                            | `Button` `link`                              |
| circular icon button                 | `Button` `icon*` sizes + `rounded-full`      |
| `badge-pill`, `badge-<accent>`       | `Badge` `secondary`, `default`, new variants |
| `card`, `feature-card`               | `Card` (fill, ring, `--card-spacing`)        |
| `text-input`, `-focused`             | `Input`, `InputGroup`, `Select`, `Textarea`  |
| `category-tab`, filter row           | `Tabs` `default` list + trigger              |

**Control heights move together.** Button height change → field controls match, else forms misalign. base-nova 32px default lives in:

| File                | Class                            |
| ------------------- | -------------------------------- |
| `button.tsx`        | `h-8`, `size-8` (icon)           |
| `input.tsx`         | `h-8`                            |
| `input-group.tsx`   | `h-8`                            |
| `select.tsx`        | `data-[size=default]:h-8`        |
| `native-select.tsx` | `h-8`                            |
| `combobox.tsx`      | `min-h-8` (chips)                |
| `toggle.tsx`        | `h-8 min-w-8`                    |
| `input-otp.tsx`     | `size-8` (slot)                  |
| `tabs.tsx`          | `group-data-horizontal/tabs:h-8` |
| `menubar.tsx`       | `h-8`                            |
| `command.tsx`       | `h-8!` (input group)             |

Re-grep before editing (`grep -n "\bh-8\b\|size-8\b" <ui>/*.tsx`); other styles use different values.

**States.** Follow documented states exactly. "Darken on press only" → `active:` not `hover:`. Keep hover on ghost buttons + menu items even when spec omits — tell user did.

**Hard rules.** Each "Don't" → check before finishing: no radius outside scale, no accent on buttons, no bold display type.

---

## Step 6: Build Design System Page

Follow [design-system-page.md](./design-system-page.md): section outline, foundations presentation, component tiers + block anatomy, pinned state matrices, edge cases, do/don't pairs, recipes.

In short:

1. Foundations first: color roles contrast-checked pairs, palette, type specimen table, spacing, radius + elevation ladders.
2. Components by tier: primitives variant × state matrix, size ladder, icon row. Composed: typical example, additions, edge cases. Overlays: real triggers.
3. Rendered do/don't pairs for DESIGN.md rules, named recipes rebuilt from components, one example screen.

Copy helpers `assets/showcase/` (`preview-states.css`, `state-matrix.tsx`, `color-pair.tsx`). Sections in `src/showcase/<section>.tsx` (Vite) or `app/design-system/` (Next.js). Copy in brand's voice.

### Known traps

| Component           | Trap                                                           | Fix                                                                       |
| ------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `Command` inline    | cmdk scrolls first item into view on mount, jumps page to it.  | Control: `value={value} onValueChange={setValue}` initial `"none"`.       |
| `Sidebar`           | Default `fixed`, escapes preview frame.                        | `<SidebarProvider className="min-h-0">` + `<Sidebar collapsible="none">`. |
| `MessageFooter`     | Beside `MessageContent` → squeezed flex column.                | Put inside `MessageContent`.                                              |
| `Select` (base)     | `SelectValue` shows raw value.                                 | Pass `items` to `Select`.                                                 |
| `Resizable`         | react-resizable-panels v4 dropped `direction` + numeric sizes. | `orientation="horizontal"`, `defaultSize="40%"`.                          |
| `DirectionProvider` | Provider alone doesn't flip layout.                            | Also `dir="rtl"` on wrapper.                                              |
| `NavigationMenu`    | Content clipped by example frame.                              | Leave bottom padding in frame.                                            |
| Header nav links    | `Button` renders `<button>`.                                   | Base: `nativeButton={false} render={<a href="#…" />}`. Radix: `asChild`.  |

### Coverage check

```bash
node <skill-dir>/scripts/showcase-coverage.mjs src/components/ui src   # Vite.
node <skill-dir>/scripts/showcase-coverage.mjs components/ui app      # Next.js.
```

Lists every component file no showcase imports. Fix until empty. `add --all` installs both `toast` + `sonner` in Base UI projects; show `sonner` in Feedback next to `toast` so list reaches zero.

---

## Step 7: Verify

Start dev server, check in browser:

1. App typecheck passes (Step 2).
2. No console errors.
3. Loads at `scrollY === 0`. Else component stealing scroll on mount.
4. No horizontal overflow at 375px + 1280px: `document.documentElement.scrollWidth <= innerWidth`.
5. Screenshot hero, Foundations, one form section, one dark band. Compare DESIGN.md: canvas, CTA color, display font, radius, focus ring.
6. Toggle dark mode once.

---

## Report Back

- App path, dev URL, component count from disk.
- Style picked (no preset given) + why.
- What maps where: colors, fonts (substitutes), radius, shadows, focus.
- Contrast pairs <4.5:1, incl. ones DESIGN.md itself specifies.
- Every component file edited + why.
- Every deliberate deviation from DESIGN.md (derived dark mode, kept hover, substituted fonts).
