# Component guidelines

Reusable UI under `src/components`. Match nearest sibling. One folder per component; implementation never in `index.ts`.

```
src/components/<group>/<name>/
  index.ts               # public barrel only
  <name>.tsx             # implementation (+ optional <name>.module.css)
  <name>.stories.tsx     # optional Storybook stories
```

Import the folder: `@/components/ui/button`. Never deep-import `.../button/button`.

Component docs (parts, props, usage examples) live in `src/components/README.md` - keep it updated when adding or changing components.

## Folder placement

This project has two surfaces: client-facing pages and the admin dashboard. Components are grouped by surface, not by primitive/composite.

| Folder                   | Contents                                                     |
| ------------------------ | ------------------------------------------------------------ |
| `src/components/ui/`     | shared reusable componentsm feature-agnostic.                |
| `src/components/layout/` | public page components only: header, footer, container, nav. |
| `src/components/admin/`  | Admin dashboard components and widgets: sidebar, cards, etc. |

There is NO `core/` folder - Base UI wrappers and composites both live in `ui/` (match nearest sibling). Feature-specific components do NOT live here - co-locate under the feature folder. Icons live in `src/lib/icons`, not here.

Import flow: `layout/` and `admin/` may import from `ui/`; `ui/` never imports from `layout/` or `admin/`.

## Imports

- Base UI: package alias `baseui` (= `@base-ui/react`). Root: `import { Button as BaseButton } from "baseui"`. Parts: `import { Accordion as BaseAccordion } from "baseui/accordion"`.
- Rename primitives with `Base` prefix.
- `cn`, `cva` from `@/lib/utils`. Variants type: `cva.Props<typeof xVariants>`.
- Icons: `import { Icons } from "@/lib/icons"` -> `Icons.Check`. Custom SVG: `createIconNode` from `@/lib/icons/icon`. No `lucide-react`, no other icon packages.
- React: never `import * as React from "react"`. Import hooks/functions individually (`import { useState } from "react"`). `React` types (`React.ComponentProps`, `React.ReactNode`) resolve via the global React namespace - no import needed.

<!-- BEGIN: component-guideline -->

## File shape

Every part pairs `function Name` + `namespace Name` (same identifier -> `Name.Props`). NOTHING is exported inline - ALL exports go in the final `// exports --->` block. No top-level `FooProps`, no `.parts.tsx`. Compound parts use a `<Name>_` prefix internally (`Accordion_Root`) and are aliased to public names (`Root`) in that block.

```tsx
// button --->

function Button({ className, variant, size, nonNative, ...props }: Button.Props) {
  return (
    <BaseButton
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
namespace Button {
  export type Props = Omit<BaseButton.Props, "nativeButton"> & { nonNative?: boolean } & cva.Props<
      typeof buttonVariants
    >;
}

// exports --->

export { Button, buttonVariants };
```

`index.ts`: `export * from "./button";` (simple) or `export * as Accordion from "./accordion";` (compound - all parts `Root`, `Trigger`, `Content` share one `<name>.tsx`).

Compound example - `ui/accordion/accordion.tsx`:

```tsx
"use client";

import { Accordion as BaseAccordion } from "baseui/accordion";
import { cn } from "@/lib/utils";

// accordion root --->

function Accordion_Root({ className, ...props }: Accordion_Root.Props) {
  return (
    // ...
  );
}
namespace Accordion_Root {
  export type Props = BaseAccordion.Root.Props;
}

// accordion trigger --->

function Accordion_Trigger({ className, children, nonNative, ...props }: Accordion_Trigger.Props) {
  return (
    // ...
  );
}
namespace Accordion_Trigger {
  export type Props = Omit<BaseAccordion.Trigger.Props, "nativeButton"> & { nonNative?: boolean };
}

// accordion content --->

function Accordion_Content({ className, children, ...props }: Accordion_Content.Props) {
  return (
    // ...
  );
}
namespace Accordion_Content {
  export type Props = BaseAccordion.Panel.Props;
}

// exports --->

export { Accordion_Root as Root, Accordion_Trigger as Trigger, Accordion_Content as Content };
```

Callers: `<Accordion.Root>`, types `Accordion.Root.Props`. ALL exports live in the `// exports --->` block - nothing exported inline.

- `"use client"` on `<name>.tsx` only when using interactive Base UI or Next client APIs. Never on `index.ts`.
- Comment markers: `// button --->`, `// exports --->`.
- Props: `Name.Props`. Omit props that must not leak via `Omit<...>`.
- `nativeButton` -> public `nonNative?: boolean`; pass `nativeButton={nonNative ? false : undefined}`.
- Native host props: `React.ComponentProps<"div">` / `"label"`. Base wrap: `BaseX.Root.Props` etc.

## Variants (`cva`)

`cva` is imported from `@/lib/utils` (re-export of the `cva` package) - never import `class-variance-authority` directly. Object API: `cva({ base, variants, defaultVariants })`. Prefer `base` as default variant key.

```ts
const buttonVariants = cva({
  base: "...",
  variants: { variant: { base: "..." }, size: { base: "..." } },
  defaultVariants: { variant: "base", size: "base" },
}); // cva.Props<typeof buttonVariants> for variant props
```

<!-- END: component-guideline -->

Host gets `data-slot="<kebab-name>"`, `data-variant={variant}` when variant exists, `cn(variants({...}), className)` with public `className` last, then `{...props}`. Export `xVariants` next to component when callers need it.

## Markup habits

- `data-slot` kebab-case: `button`, `accordion-trigger`, `checkbox-indicator`.
- Primitive owns hidden inner nodes (Accordion `Trigger` owns `Header`; `Content` -> `BaseAccordion.Panel`). Map public name -> Base part when names differ.
- Group variants for siblings: `group/accordion-trigger` + `group-aria-expanded/accordion-trigger:...`.

<!-- BEGIN: style-guideline -->

## Styles

Single source: `src/styles/globals.css` (Tailwind v4 + `twextras`). Theme tokens via `@theme inline` - use token utilities, never hardcode hex/oklch:

- Colors: `bg-background`, `text-foreground`, `bg-card`, `bg-popover`, `bg-primary`, `text-primary-foreground`, `bg-secondary`, `bg-muted`, `text-muted-foreground`, `bg-accent`, `text-accent-foreground`, `bg-destructive`, `border-border`, `border-input`, `ring-ring`.
- Radii: `rounded-sm/md/lg/xl/...` from `--radius` scale. Dark mode via `.dark` class (`dark:` variant registered).
- No `components.css`/`utilities.css` - repeated decorative CSS -> `<name>.module.css` in component folder, first line `@reference "#globals";`.

## Style guideline

shadcn theme with shadcn-style Tailwind tokens (`bg-background`, `text-foreground`, `bg-primary`, `border-border`, etc. - defined in `src/styles/globals.css`).

shadcn components use `ring` utilities for focus and hide the outline - do NOT copy that. Use the twextras `highlight` utility instead: `focus-visible:highlight`, tinted via `highlight-<color>` (e.g. `highlight-red-500`; `highlight-*` sets `--tw-highlight`).

Target icons with the `icon:` variant (custom variant for `svg[data-icon]`, instead of raw `svg` selectors:
`[&>svg]:` -> `icon:`,
`[&>svg:not([class*='size-'])]:` -> `icon:not-[[class*='size-']]:`.

Target `data-slot` elements with twextras `slot-*` utilities instead of `data-[slot=*]` selectors: `slot-<value>:` for the element itself, `*:slot-<value>:` for direct children, `**:slot-<value>:` for descendants. Details: `src/styles/AGENTS.md`.

Full twextras docs: `node_modules/twextras/AGENTS.md`. Token/utility details: `src/styles/AGENTS.md`.

<!-- END: style-guideline -->

## Stories (Storybook)

Co-locate `<name>.stories.tsx` next to `<name>.tsx`; the `stories` glob in `.storybook/main.ts` picks it up. import `Meta`/`StoryObj` types from from `@storybook/react`.

- Import the component and sibling components via relative paths (`./button`, `../button`) - never the `@/components` alias inside stories.
- CSF3: `meta` with `component`, `tags: ["autodocs"]`, `parameters.layout: "centered"`; expose `variant`/`size`/boolean props via `argTypes` (`control: "select"`/`"boolean"`).
- Callbacks: `args: { onClick: fn() }` with `fn` from `storybook/test`.
- Add one story per variant value plus a `render`-based matrix story (e.g. `Variants`, `Sizes`) showing them side by side.
- Title format: `UI/Button` - `<group>/<Name>`.

## Do not

- Deep-imports; flat files under `ui/`/`layout/`/`admin/` (`ui/button.tsx`).
- `tv`, `lucide-react`, or icon packages outside `@/lib/icons`.
- Logic in `index.ts`; leak `nativeButton` (public API is `nonNative`).
- Inline `export` anywhere - all exports go in the `// exports --->` block.
- CSS module "just in case", if tailwind is not enough - start with `cn`/`cva`.
- Hardcode colors or invent tokens not in `globals.css`.
- Raw `svg` selectors like `[&>svg]`/`[&_svg]` for icon styling - use the `icon:` variant instead (`icon:not-[[class*='size-']]:` for the no-size guard).
- Verbose `data-[slot=*]` arbitrary variants - use twextras `slot-*` utilities (`slot-*`, `*:slot-*`, `**:slot-*`) instead.

## Verify

`bun run typecheck` and `bun run lint` after component changes.
