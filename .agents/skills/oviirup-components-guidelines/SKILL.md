---

name: oviirup-components-guidelines
description: Author and edit React UI components under src/components using oviirup conventions (per-component folders, index.ts barrels, baseui (@base-ui/react), export function + export namespace Props, cva/cn, data-slot, nonNative). Use when creating, wrapping, or refactoring src/components/ui, src/components/layout, or src/lib/icons, or when the user mentions Button.Props, Accordion.Root, data-slot, or .module.css.
---

# oviirup component guidelines

Match nearest sibling in `src/components`. No parallel pattern. Canonical refs: `ui/accordion/` (compound), `ui/button/` (simple + cva), `ui/checkbox/`, `ui/tabs/`, `layout/container/`.

One folder per component. Implementation is never `index.ts`. Where a new component lives (`core/` vs `layout/` vs `ui/` vs `src/lib/icons/` vs `graphics/`): see [structure.md](structure.md).

```
src/components/ui/<name>/
  index.ts           # public barrel
  <name>.tsx         # main implementation
  <name>.module.css  # optional, only if Tailwind/cn is not enough
```

Same under `src/components/layout/`. Callers import the folder: `@/components/ui/button`, `@/components/ui/accordion`. Never `@/components/ui/button/button`.

## Base UI docs

Primitive API, parts, composition, styling, animation, TypeScript: [Base UI llms.txt](https://base-ui.com/llms.txt). Fetch that index, then the component `.md` (`https://base-ui.com/react/components/<name>.md`) plus handbook pages as needed. Docs use `@base-ui/react`; this repo imports the same package through the `baseui` tsconfig alias - translate doc imports accordingly. Tailwind examples are v4 - match this project (v4). Wrap per this skill; do not copy docs markup or class names.

## Imports

- Base UI from the `baseui` alias (tsconfig path for `@base-ui/react`): `baseui` / `baseui/<part>`. Never write `@base-ui/react` in imports.
- Rename primitive `Base*`: `import { Accordion as BaseAccordion } from "baseui/accordion"`; `import { Button as BaseButton } from "baseui"`.
- Classes: `cn`, `cx`, and `cva` from `@/lib/utils` (`src/lib/utils.ts` wraps the `cn` and `cva` packages). Variant props type: `cva.Props<typeof buttonVariants>` - the utils namespace alias for the package's `VariantProps`.
- Registry icons: `import { Icons } from "@/lib/icons"` then `Icons.ChevronDown`. New custom SVG: `createIconNode` from `@/lib/icons/icon`. No `lucide-react` from UI.

## File shape

Each part is **`export function`**, then **`export namespace`**, same identifier. No unexported locals, no trailing remapping block.

```tsx
function Button({ className, variant, size, icon, ...props }: Button.Props) {
  // ...
}
namespace Button {
  export type Props = Omit<BaseButton.Props, "nativeButton"> & {
    nonNative?: boolean;
  } & cva.Props<typeof buttonVariants>;
}

// exports --->

export { Button, buttonVariants };
```

Comment each block: `// button --->`, `// tabs list --->`, `// exports --->`.

`"use client"` when the file uses interactive Base UI or Next client APIs. Server-safe wrappers (skeleton, label, separator, container) stay client-free. Put `"use client"` on `<name>.tsx`, not on `index.ts`.

### Simple (one public component)

`<name>.tsx` holds implementation + named exports. `index.ts` re-exports them.

```
src/components/ui/button/button.tsx
src/components/ui/button/index.ts
```

```ts
export * from "./button";
```

```tsx
export function Button({ className, variant, size, icon, nonNative, ...props }: Button.Props) {
  // ...
}
export namespace Button {
  export type Props = Omit<BaseButton.Props, "nativeButton"> & {
    nonNative?: boolean;
  } & cva.Props<typeof buttonVariants>;
}

export { buttonVariants };
```

Export extra named values (`buttonVariants`) next to the function. Native host: `React.ComponentProps<"div">` / `"label"`. Base wrap: `BaseX.Props` or `BaseX.Root.Props`.

### Compound (multiple public parts)

All parts in one `<name>.tsx`. Name each part with the **public name** (`Root`, `Item`, `List`, `Trigger`, `Content`, …) - the barrel already namespaces the module. Same shape as `ui/accordion/accordion.tsx` for tabs, container, tooltip, field, and any new compound.

```
src/components/ui/accordion/accordion.tsx
src/components/ui/accordion/index.ts
```

```ts
export * as Tabs from "./tabs";
```

```ts
export * as Container from "./container";
```

```tsx
// accordion root --->

export function Root({ className, ...props }: Root.Props) {
  return (
    <BaseAccordion.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}
export namespace Root {
  export type Props = BaseAccordion.Root.Props;
}

// accordion trigger --->

export function Trigger({ className, children, nonNative, ...props }: Trigger.Props) {
  return (
    <BaseAccordion.Header className="flex">
      <BaseAccordion.Trigger
        data-slot="accordion-trigger"
        className={cn("...", className)}
        nativeButton={nonNative ? false : undefined}
        {...props}>
        {children}
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}
export namespace Trigger {
  export type Props = Omit<BaseAccordion.Trigger.Props, "nativeButton"> & {
    nonNative?: boolean;
  };
}

// accordion content --->

export function Content({ className, children, ...props }: Content.Props) {
  return (
    <BaseAccordion.Panel data-slot="accordion-content" className="..." {...props}>
      <div className={cn("...", className)}>{children}</div>
    </BaseAccordion.Panel>
  );
}
export namespace Content {
  export type Props = BaseAccordion.Panel.Props;
}
```

Callers: `<Accordion.Root />`, types `Accordion.Root.Props`. Never prefix internals (`AccordionRoot`). Import the folder barrel, not `./accordion` from outside the folder.

## Namespaced Props

Namespace **same name as function**. Annotate `Name.Props`. No top-level `ButtonProps` / `AccordionRootProps`.

Omit Base props that must not leak:

```tsx
export namespace Root {
  export type Props = Omit<BaseAccordion.Root.Props, "orientation">;
}
```

Intersect variants on the part that owns them (still `export function List` / `export namespace List`):

```tsx
export namespace List {
  export type Props = BaseTabs.List.Props & cva.Props<typeof tabsListVariants>;
}
```

### `nativeButton` → `nonNative`

When the primitive has `nativeButton`, omit it from public Props and expose `nonNative?: boolean`. Pass `nativeButton={nonNative ? false : undefined}` (needed when `render` is a non-button, e.g. `Link`).

## Variants (`cva`)

This project uses the **`cva` package** (`cva@beta`), not `class-variance-authority`. Most shadcn registry components use `class-variance-authority`, whose call shape is `cva("base classes", { variants })` - base styles are the first argument. Do not copy that shape or those imports. Here everything lives in one config object: `cva({ base, variants, compoundVariants, defaultVariants })`.

Prefer variant key `base` not `default` when that is default look. `compoundVariants` entries take `class` or `className` (never both). `cx` is the package's class concatenator; `defineConfig({ cx })` binds `cva`/`cx` to a custom merger such as `cn`. Variant props for `Props` intersections: `cva.Props<typeof buttonVariants>` (utils alias for the package's `VariantProps`).

```tsx
const buttonVariants = cva({
  base: "...",
  variants: { variant: { base: "..." }, size: { base: "..." } },
  compoundVariants: [{ variant: "base", size: "base", class: "..." }],
  defaultVariants: { variant: "base", size: "base" },
});
```

Host: `data-slot`, `data-variant={variant}` when variant exists, `cn(variants({ ... }), className)`, then `{...props}`.

Export `buttonVariants` / `tabsListVariants` next to the component when callers need them.

Default visual extras in the wrapper (`variant = "pill"`, `render={render ?? <nav />}`).

## Markup habits

- `data-slot` kebab-case: `button`, `accordion-item`, `checkbox-indicator`.
- Spread `className` through `cn(...)` last so callers extend. If the public `className` belongs on an inner wrapper (accordion content padding), put layout/animation on the Base node and `cn(..., className)` on the inner div.
- Hide nested Base nodes when not public API. Accordion `Trigger` owns `Header`. Accordion `Content` maps to `Panel`. Checkbox owns `Indicator` + `render` SVG. Map public name to Base part when names differ (`Trigger` → `BaseTabs.Tab`, `Content` → `BaseAccordion.Panel`).
- Group variants for sibling parts: `group/accordion-trigger` + `group-aria-expanded/accordion-trigger:...`.

## Style sources

Do not invent tokens or utilities. Read `src/styles/AGENTS.md` first; it is the full map of theme tokens, custom utilities, component classes, `twextras`, and `cn` groups. Then the source files:

- `src/styles/globals.css` - Tailwind + `twextras` import, `@theme inline` maps CSS vars to utilities (`bg-accent`, `text-muted`, `ease-quick`, radii, breakpoints). Base layer: dark `color-scheme`, 14px / `sm` 16px, border color, selection.
- `src/styles/base.css` - theme values on `:root` / `[data-theme]`. Colors: `background`, `foreground`, `border`, `muted`, `input`, `card`, `popover`, `primary`, `secondary`, `accent`, `error`, `warning`, `success` (+ `-foreground` / `-dark` where defined). Layout: `--header`, `--radius`.
- `src/styles/components.css` - reusable component styles, name ".\_\_snake_case_class_names",
- `src/styles/utilities.css` - project utilities + data variants.

Use theme color names as Tailwind colors (`bg-accent`, `text-muted`, `border-border-light`). `error` / `warning` / `success` have no `-foreground` mapping yet. Transitions: `ease-quick` / `ease-smooth` from theme. Radii: `rounded-sm` / `rounded-md` / `rounded-full` from `--radius` scale.

### Project utilities (from `utilities.css`)

- `highlight` - focus ring. Pair `focus-visible:highlight`. Tint: `highlight-accent`, `highlight-error`, `highlight-warning` (`highlight-*` sets `--tw-highlight`).
- `icon:` - targets `svg[data-icon]`. Size icons: `icon:not-[[class*='size-']]:size-4 icon:shrink-0`.
- State variants: `data-checked:`, `data-unchecked:`, `data-open:`, `data-closed:`, `data-selected:`, `data-disabled:`, `data-active:`, `data-orientation-horizontal:`, `data-orientation-vertical:`.
- `pseudo:` - `::before` + `::after`.
- `hocus:` from `twextras` - hover + focus together.

Focus recipe: `focus-visible:highlight` plus optional `highlight-<color>` on filled controls.

### CSS modules

Only when Tailwind/`cn` not enough (repeating decorative markup). Live in the component folder as `<name>.module.css`. Import from `<name>.tsx`: `import styles from "./container.module.css"`. First line: `@reference "#globals";`. No shared module at `src/components/ui` root. No `styles.module.css`.

## Icons

Registry: `Icons.*` from `@/lib/icons`. `createIconNode` builds SVG with `data-icon={name}` so `icon:` variant works. `role="presentation"` `aria-hidden`. Custom marks (checkbox check) may inline SVG via Base `render` - still presentation SVG, not Lucide.

## Do not

- Import `@base-ui/react` directly. Use the `baseui` alias (`baseui`, `baseui/<part>`).
- Flat files under `ui/` or `layout/` (`ui/button.tsx`). Always a folder.
- Put implementation in `index.ts`. Barrel only.
- Use `.parts.tsx`. Compound parts share `<name>.tsx`; barrel with `export * as Name`.
- Unexported `function Root` + `export { FooRoot as Root }`. Compound parts are `export function Root` then `export namespace Root`.
- Prefix compound internals (`AccordionRoot`, `TabsList`). Public names are `Root`, `List`, `Trigger`, `Content`, …
- Top-level `export type FooProps`. Props live on `export namespace Name { export type Props }`.
- Use `tv` or `class-variance-authority`. `cva` means the `cva` package object API - never the `cva(base, { ... })` call shape.
- Import `tabs.tsx` / `accordion.tsx` from outside the folder. Callers use the barrel.
- Leak `nativeButton`. Public API is `nonNative`.
- CSS module “just in case”. Start `cn` / `cva`.
- Hardcode hex/oklch in components. Use theme tokens.
- Invent `data-*` variants already in `utilities.css`.
