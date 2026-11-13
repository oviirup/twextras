# Icons

SVG icon system for `src/components`. Keep this folder to icon rendering only: no behavior, app state, layout, or composite UI.

## Files

- `icon.tsx` - `createIconNode` factory plus `IconProps`, `IconNode`, `IconNodes`, and `IconNodeOptions` types.
- `registry.ts` - public icon catalog. Every app-facing icon is an exported registry component.
- `index.ts` - namespace barrel only: `export * as Icons from "./registry"`.

## Public API

Callers import the namespace and use registry components:

```tsx
import { Icons } from "@/components/icons";

<Icons.ArrowUp className="size-4 text-muted" />
<Icons.ArrowUp size={16} />
```

Registry components accept SVG props plus `size?: number`. `size` sets `width`/`height`; `className` styles the `<svg>`. Every icon renders `role="presentation"`, `aria-hidden="true"`, and `data-icon="<kebab-name>"`, so color comes from `currentColor`/text classes and `icon:` utilities can target the SVG.

## Registry pattern

`hugeicons` is the package alias for `@hugeicons/core-free-icons`. Its exports are `IconSvgObject` node tuples (`[tag, attrs][]`), not React components.

Add icons in `registry.ts` with `createIconNode`:

```ts
import * as HugeIcons from "hugeicons";
import { createIconNode, IconProps } from "./icon";

const baseProps: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const Check = createIconNode({
  name: "check",
  nodes: HugeIcons.CheckIcon,
  props: baseProps,
});
```

Rules:

- One `export const` per icon. Public names are PascalCase and drop the Hugeicons `Icon` suffix: `HugeIcons.CheckIcon` -> `Icons.Check`.
- `name` is stable kebab-case; it becomes `data-icon` and the React `displayName`.
- `nodes` comes from `HugeIcons.*Icon`. Do not hand-author a Hugeicons replacement when the package has the mark.
- Pass `props: baseProps` unless the icon needs different SVG defaults. Attributes on individual nodes still take precedence over inherited SVG defaults.
- Group entries under short comments such as `// Arrows --->`.
- Keep `index.ts` as the `Icons` namespace barrel. Do not export individual icons or the factory from it.

## Custom SVG nodes

When Hugeicons does not have the mark, use `createIconNode` with `IconNodes` tuples: `[tag, attrs]` pairs such as `["path", { d: "...", stroke: "currentColor" }]`. Custom shared icons still belong in `registry.ts` and are used through `Icons.*`.

For one-off custom SVGs outside the registry, import the factory from `@/components/icons/icon`; do not bypass `createIconNode` with ad hoc `<svg>` markup for shared icons.

## Do not

- Import `hugeicons`, `@hugeicons/*`, `lucide-react`, or another icon package outside this folder.
- Create per-icon files or folders; registry entries are the components.
- Add props or behavior beyond SVG props and `size`.
- Change `role="presentation"`, `aria-hidden`, or `data-icon` behavior without checking `icon:` utility usage.
- Deep-import `registry.ts` or `icon.tsx` from outside this folder; use `@/components/icons` for `Icons` and `@/components/icons/icon` only for the factory.

## Verify

Run `bun run typecheck` and `bun run lint` after registry changes.
