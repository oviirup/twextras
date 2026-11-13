---

name: shadcn
description: Manages shadcn components and projects — adding, searching, fixing, debugging, styling, and composing UI, including chat interfaces. Provides project context, component docs, and usage examples. Applies when working with shadcn/ui, component registries, presets, --preset codes, or any project with a components.json file. Also triggers for "shadcn init", "create an app with --preset", "switch to --preset", and for building a design system or applying a DESIGN.md or brand spec to shadcn/ui.
---

# shadcn/ui

Framework for building ui, components, design systems. Components added as source code via CLI.

> **IMPORTANT:** Run all CLI commands with project's package runner: `npx shadcn@latest`, `pnpm dlx shadcn@latest`, or `bunx --bun shadcn@latest` — per project's `packageManager`. Examples use `npx shadcn@latest`; substitute correct runner.

## Current Project Context

```json
!`npx shadcn@latest info --json`
```

JSON above = project config + installed components. `npx shadcn@latest docs <component>` → docs + example URLs for any component.

## Principles

1. **Existing components first.** `npx shadcn@latest search` before custom UI. Check community registries too.
2. **Compose, don't reinvent.** Settings page = Tabs + Card + form controls. Dashboard = Sidebar + Card + Chart + Table.
3. **Built-in variants before custom styles.** `variant="outline"`, `size="sm"`, etc.
4. **Semantic colors.** `bg-primary`, `text-muted-foreground` — never raw `bg-blue-500`.

## Critical Rules

Always enforced. Each links file with Incorrect/Correct pairs.

### Styling & Tailwind → [styling.md](./rules/styling.md)

- **`className` for layout, not styling.** Never override component colors/typography.
- **No `space-x-*`/`space-y-*`.** `flex` + `gap-*`; vertical stacks `flex flex-col gap-*`.
- **`size-*` when width = height.** `size-10` not `w-10 h-10`.
- **`truncate` shorthand.** Not `overflow-hidden text-ellipsis whitespace-nowrap`.
- **No manual `dark:` overrides.** Semantic tokens (`bg-background`, `text-muted-foreground`).
- **`cn()` for conditional classes.** No manual template literal ternaries.
- **No manual `z-index` on overlays.** Dialog, Sheet, Popover etc. handle stacking.

### Forms & Inputs → [forms.md](./rules/forms.md)

- **Forms use `FieldGroup` + `Field`.** Never raw `div` + `space-y-*`/`grid gap-*`.
- **`InputGroup` uses `InputGroupInput`/`InputGroupTextarea`.** Never raw `Input`/`Textarea` inside.
- **Buttons inside inputs use `InputGroup` + `InputGroupAddon`.**
- **Option sets (2–7 choices) use `ToggleGroup`.** No manual `Button` loop + active state.
- **`FieldSet` + `FieldLegend` for grouping related checkboxes/radios.** No `div` + heading.
- **Validation = `data-invalid` + `aria-invalid`.** `data-invalid` on `Field`, `aria-invalid` on control. Disabled: `data-disabled` on `Field`, `disabled` on control.

### Component Structure → [composition.md](./rules/composition.md)

- **Items inside their Group.** `SelectItem` → `SelectGroup`. `DropdownMenuItem` → `DropdownMenuGroup`. `CommandItem` → `CommandGroup`.
- **`asChild` (radix) / `render` (base) for custom triggers.** Check `base` field from `npx shadcn@latest info`. → [base-vs-radix.md](./rules/base-vs-radix.md)
- **Dialog, Sheet, Drawer always need Title.** `DialogTitle`/`SheetTitle`/`DrawerTitle` required. `className="sr-only"` if visually hidden.
- **Full Card composition.** `CardHeader`/`CardTitle`/`CardDescription`/`CardContent`/`CardFooter`. Don't dump all in `CardContent`.
- **Button has no `isPending`/`isLoading`.** Compose `Spinner` + `data-icon` + `disabled`.
- **`TabsTrigger` inside `TabsList`.** Never triggers directly in `Tabs`.
- **`Avatar` always needs `AvatarFallback`.** Image load failure.

### Use Components, Not Custom Markup → [composition.md](./rules/composition.md)

- **Existing components before custom markup.** Check component exists before styled `div`.
- **Callouts use `Alert`.** No custom styled divs.
- **Empty states use `Empty`.** No custom empty markup.
- **Toast follows project base.** `toast` from `toast` component (Base UI); `toast()` from `sonner` (Radix/React Aria).
- **`Separator`** not `<hr>`/`<div className="border-t">`.
- **`Skeleton`** for loading. No custom `animate-pulse` divs.
- **`Badge`** not custom styled spans.

### Icons → [icons.md](./rules/icons.md)

- **Icons in `Button` use `data-icon`.** `data-icon="inline-start"`/`"inline-end"`.
- **No sizing classes on icons inside components.** Components size via CSS. No `size-4`/`w-4 h-4`.
- **Icons as objects, not string keys.** `icon={CheckIcon}`, not string lookup.

### Chat & Messaging → [chat.md](./rules/chat.md)

- **Chat UI composes chat primitives.** Conversations `MessageScroller`, rows `Message`, surfaces `Bubble`. No hand-rolled bubble divs/raw scroll container.
- **`MessageScroller` owns scroll behavior.** Streaming follow, anchoring, jump-to-latest (`MessageScrollerButton`) built in. No `useStickToBottom`/`ResizeObserver`.
- **Attachments `Attachment`; system notes/dividers `Marker`.** Not `Item` cards or `Separator` + label.
- **Assistant activity `Trace`.** Reasoning, tool calls, sources, steps = `TraceLine`s in `Trace`, one per run of message parts. Behavior wraps line: `TraceCollapsible`, sheet trigger, link. Not hand-rolled `Collapsible`/`Marker`.

### CLI

- **Never decode preset codes or build preset URLs manually.** `npx shadcn@latest preset decode <code>`, `preset url <code>`, `preset open <code>`. Project-aware detection → `preset resolve`.
- **Apply preset codes directly.** `npx shadcn@latest apply <code>` existing projects; `init --preset <code>` initializing.

## Key Patterns

Most common differentiators. Edge cases → linked rule files.

```tsx
// Form layout: FieldGroup + Field, not div + Label.
<FieldGroup>
  <Field>
    <FieldLabel htmlFor="email">Email</FieldLabel>
    <Input id="email" />
  </Field>
</FieldGroup>

// Validation: data-invalid on Field, aria-invalid on control.
<Field data-invalid>
  <FieldLabel>Email</FieldLabel>
  <Input aria-invalid />
  <FieldDescription>Invalid email.</FieldDescription>
</Field>

// Icons in buttons: data-icon, no sizing classes.
<Button>
  <SearchIcon data-icon="inline-start" />
  Search
</Button>

// Spacing: gap-*, not space-y-*.
<div className="flex flex-col gap-4">  // correct
<div className="space-y-4">           // wrong

// Equal dimensions: size-*, not w-* h-*.
<Avatar className="size-10">   // correct
<Avatar className="w-10 h-10"> // wrong

// Status colors: Badge variants or semantic tokens, not raw colors.
<Badge variant="secondary">+20.1%</Badge>    // correct
<span className="text-emerald-600">+20.1%</span> // wrong
```

## Component Selection

| Need                   | Use                                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| Button/action          | `Button` with appropriate variant                                                                   |
| Form inputs            | `Input`, `Select`, `Combobox`, `Switch`, `Checkbox`, `RadioGroup`, `Textarea`, `InputOTP`, `Slider` |
| Toggle 2–5 options     | `ToggleGroup` + `ToggleGroupItem`                                                                   |
| Data display           | `Table`, `Card`, `Badge`, `Avatar`                                                                  |
| Navigation             | `Sidebar`, `NavigationMenu`, `Breadcrumb`, `Tabs`, `Pagination`                                     |
| Overlays               | `Dialog` (modal), `Sheet` (side), `Drawer` (bottom), `AlertDialog` (confirm)                        |
| Feedback               | `toast` (Base UI), `sonner` (Radix/Aria), `Alert`, `Progress`, `Skeleton`, `Spinner`                |
| Command palette        | `Command` inside `Dialog`                                                                           |
| Charts                 | `Chart` (wraps Recharts)                                                                            |
| Layout                 | `Card`, `Separator`, `Resizable`, `ScrollArea`, `Accordion`, `Collapsible`                          |
| Empty states           | `Empty`                                                                                             |
| Menus                  | `DropdownMenu`, `ContextMenu`, `Menubar`                                                            |
| Tooltips/info          | `Tooltip`, `HoverCard`, `Popover`                                                                   |
| Chat / conversation UI | `MessageScroller`, `Message`, `Bubble`, `Attachment`, `Marker`, `Trace`                             |

## Key Fields

Injected project context key fields:

- **`aliases`** → actual alias prefix for imports (`@/`, `~/`) — never hardcode.
- **`isRSC`** → `true` → components using `useState`, `useEffect`, event handlers, browser APIs need `"use client"` top of file. Always reference when advising on directive.
- **`tailwindVersion`** → `"v4"` uses `@theme inline` blocks; `"v3"` uses `tailwind.config.js`.
- **`tailwindCssFile`** → global CSS file where custom CSS variables defined. Always edit this file, never create new.
- **`style`** → component visual treatment (e.g. `nova`, `vega`).
- **`base`** → primitive library (`radix` or `base`). Affects component APIs + props.
- **`iconLibrary`** → icon imports. `lucide-react` for `lucide`, `@tabler/icons-react` for `tabler`, etc. Never assume `lucide-react`.
- **`resolvedPaths`** → exact file-system destinations for components, utils, hooks.
- **`framework`** → routing + file conventions (Next.js App Router vs Vite SPA).
- **`packageManager`** → non-shadcn dependency installs (`pnpm add date-fns` vs `npm install date-fns`).
- **`preset`** → resolved preset code + values. `npx shadcn@latest preset resolve --json` for preset info only.

Full field reference → [cli.md — `info` command](./cli.md).

## Component Docs, Examples, Usage

`npx shadcn@latest docs <component>` → URLs for docs, examples, API reference. Fetch URLs for actual content.

```bash
npx shadcn@latest docs button dialog select
```

**Creating, fixing, debugging, or using component → always run `npx shadcn@latest docs` + fetch URLs first.** Correct API/usage, not guessing.

## Workflow

1. **Project context** — injected above. Re-run `npx shadcn@latest info` to refresh.
2. **Check installed first** — before `add`, check `components` list from context or list `resolvedPaths.ui` dir. Don't import unadded components, don't re-add installed.
3. **Find components** — `npx shadcn@latest search`.
4. **Docs + examples** — `npx shadcn@latest docs <component>` → URLs, fetch. `npx shadcn@latest view` browses uninstalled registry items. `npx shadcn@latest add --diff` previews changes to installed.
5. **Install or update** — `npx shadcn@latest add`. Updates → `--dry-run` + `--diff` first (see Updating Components).
6. **Fix imports in third-party components** — After adding community registry components (`@bundui`, `@magicui`), check added non-UI files for hardcoded `@/components/ui/...` imports — won't match project aliases. `npx shadcn@latest info` → correct `ui` alias (e.g. `@workspace/ui/components`), rewrite accordingly. CLI rewrites imports for own UI files; third-party may use default paths.
7. **Review added components** — After adding from any registry, **always read added files, verify correct**. Missing sub-components (`SelectItem` without `SelectGroup`), missing imports, incorrect composition, Critical Rules violations. Replace icon imports with project's `iconLibrary` (registry `lucide-react` vs project `hugeicons` → swap imports + names). Fix all issues before moving on.
8. **Registry must be explicit** — User adds block/component → **don't guess registry**. No registry specified → ask which (`@shadcn`, `@tailark`, `owner/repo`…). Never default on user's behalf.
9. **Switching presets** — Ask user first: **overwrite**, **partial**, **merge**, or **skip**?
   - **Inspect current**: `npx shadcn@latest preset resolve`. `--json` for structured values.
   - **Inspect incoming**: `npx shadcn@latest preset decode <code>`. `preset url <code>`/`preset open <code>` share/open preset builder.
   - **Overwrite**: `npx shadcn@latest apply <code>`. Overwrites detected components, fonts, CSS variables.
   - **Partial**: `npx shadcn@latest apply <code> --only theme,font`. Only selected preset parts, no UI reinstall. Values `theme`, `font`; comma combos allowed. `icon` unsupported — icon changes may need full reinstall + transforms.
   - **Merge**: `npx shadcn@latest init --preset <code> --force --no-reinstall`, then `npx shadcn@latest info` lists installed, then per component `--dry-run` + `--diff` to [smart merge](#updating-components).
   - **Skip**: `npx shadcn@latest init --preset <code> --force --no-reinstall`. Config + CSS only, components as-is.
   - **Important**: Preset commands inside user's project dir. `apply` needs existing project with `components.json`. CLI auto-preserves current `base` (`base` vs `radix`) from `components.json`. Scratch/temp dir (`--dry-run` comparisons) → pass `--base <current-base>` explicitly — preset codes don't encode base.

## Design Systems from DESIGN.md

User asks design system from `DESIGN.md` (or brand spec), with/without preset → follow [design-system.md](./design-system.md) end to end:

1. `init --preset <code> --template <vite|next> --name <app> --no-monorepo -y`. No preset code → pick closest style, pass `--base base --preset <style>`. Then `add --all -y`.
2. Read DESIGN.md frontmatter, Do's + Don'ts, Known Gaps before editing.
3. Map tokens onto shadcn variables in `tailwindCssFile`. Pin radius scale, shadows, fonts, `type-*` utilities.
4. Restyle components by editing `cva` variants. Change control heights together.
5. Build design system page per [design-system-page.md](./design-system-page.md): contrast-checked color roles, type specimens, pinned state matrices, edge cases, do/don't pairs, recipes. Coverage check `scripts/showcase-coverage.mjs`.
6. Verify in browser: typecheck, no console errors, loads at top, no horizontal overflow, dark mode.

## Updating Components

User asks update component from upstream keeping local changes → `--dry-run` + `--diff` intelligent merge. **NEVER fetch raw files from GitHub manually — always CLI.**

1. `npx shadcn@latest add <component> --dry-run` → all affected files.
2. `npx shadcn@latest add <component> --diff <file>` → upstream vs local changes.
3. Decide per file from diff:
   - No local changes → safe overwrite.
   - Local changes → read local file, analyze diff, apply upstream updates preserving local mods.
   - "Just update everything" → `--overwrite`, confirm first.
4. **Never `--overwrite` without explicit user approval.**

## Quick Reference

```bash
# Create new project.
npx shadcn@latest init --name my-app --preset base-nova
npx shadcn@latest init --name my-app --preset a2r6bw --template vite

# Create design system app (then follow design-system.md).
npx shadcn@latest init --name my-ds --preset b0 --template vite --no-monorepo -y
npx shadcn@latest init --name my-ds --base base --preset maia --template vite --no-monorepo -y
npx shadcn@latest add --all -y

# Create monorepo project.
npx shadcn@latest init --name my-app --preset base-nova --monorepo
npx shadcn@latest init --name my-app --preset base-nova --template next --monorepo

# Initialize existing project.
npx shadcn@latest init --preset base-nova
npx shadcn@latest init --defaults  # shortcut: --template=next --preset=nova (base implied)

# Apply preset to existing project.
npx shadcn@latest apply a2r6bw
npx shadcn@latest apply a2r6bw --only theme
npx shadcn@latest apply a2r6bw --only font
npx shadcn@latest apply a2r6bw --only theme,font

# Inspect preset codes + project preset state.
npx shadcn@latest preset decode a2r6bw
npx shadcn@latest preset url a2r6bw
npx shadcn@latest preset open a2r6bw
npx shadcn@latest preset resolve
npx shadcn@latest preset resolve --json

# Add components.
npx shadcn@latest add button card dialog
npx shadcn@latest add @magicui/shimmer-button
npx shadcn@latest add owner/repo/item
npx shadcn@latest add --all

# Preview changes before adding/updating.
npx shadcn@latest add button --dry-run
npx shadcn@latest add button --diff button.tsx
npx shadcn@latest add @acme/form --view button.tsx
npx shadcn@latest add owner/repo/item --dry-run

# Search registries.
npx shadcn@latest search @shadcn -q "sidebar"
npx shadcn@latest search @tailark -q "stats"
npx shadcn@latest search owner/repo -q "login"
npx shadcn@latest search                          # all configured registries
npx shadcn@latest search @shadcn -q "menu" -t ui  # filter by item type

# Component docs + example URLs.
npx shadcn@latest docs button dialog select

# View registry item details (not yet installed).
npx shadcn@latest view @shadcn/button
npx shadcn@latest view owner/repo/item
```

**Named presets:** `nova`, `vega`, `maia`, `lyra`, `mira`, `luma`
**Templates:** `next`, `vite`, `start`, `react-router`, `astro` (all `--monorepo`) + `laravel` (no monorepo)
**Preset codes:** Version-prefixed base62 strings (e.g. `a2r6bw` or `b0`), from [ui.shadcn.com](https://ui.shadcn.com).

## Detailed References

- [rules/forms.md](./rules/forms.md) — FieldGroup, Field, InputGroup, ToggleGroup, FieldSet, validation states
- [rules/composition.md](./rules/composition.md) — Groups, overlays, Card, Tabs, Avatar, Alert, Empty, Toast, Separator, Skeleton, Badge, Button loading
- [rules/chat.md](./rules/chat.md) — MessageScroller, Message, Bubble, Attachment, Marker, Trace; streaming, anchoring, jump-to-latest, assistant activity rows
- [rules/icons.md](./rules/icons.md) — data-icon, icon sizing, icons as objects
- [rules/styling.md](./rules/styling.md) — Semantic colors, variants, className, spacing, size, truncate, dark mode, cn(), z-index
- [rules/base-vs-radix.md](./rules/base-vs-radix.md) — asChild vs render, Select, ToggleGroup, Slider, Accordion
- [cli.md](./cli.md) — Commands, flags, presets, templates
- [registry.md](./registry.md) — Authoring source registries, `include`, item definitions, dependencies, GitHub registry rules
- [customization.md](./customization.md) — Theming, CSS variables, extending components
- [design-system.md](./design-system.md): DESIGN.md (with/without preset) to themed app: style picking, token mapping, radius, fonts, type scale, control heights, showcase traps, verification
- [design-system-page.md](./design-system-page.md): What goes on design system page + how: foundations, component tiers, pinned state matrices, contrast pairs, edge cases, do/don't, recipes
