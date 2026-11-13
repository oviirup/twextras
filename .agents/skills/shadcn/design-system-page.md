# The Design System Page

What goes on design system page + how to show it. Distilled from Primer, Carbon, Atlassian, GitLab Pajamas, Cloudscape, Twilio Paste, Salesforce Lightning, Material 3, Evergreen, Orbit, EightShapes' component documentation guidance.

## Contents

- Principles
- Page outline
- Foundations
- Components: tiers + block anatomy
- States without interaction
- Edge cases
- Do and Don't
- Recipes + example screens
- Helpers
- Checklist

---

## Principles

1. **Foundations → components → compositions.** Every mature system follows order (Primer, Carbon, Paste, Cloudscape, M3).
2. **Roles, not palettes.** Each color shown as surface + foreground + measured contrast. Raw palette second.
3. **Lead with typical case.** Each component opens most common use in real content. Then variants priority order, shared axes (size, icon), states.
4. **Pin states so reviewers see them.** Hover, focus, pressed render side by side, no interaction. One consistent label, never state name inside component.
5. **Don't render every combination.** Primitives get variant × state matrix. Composed get typical example + additions. Exhaustive combos belong in tests (Material 3 cut list kit 700+ variants → ~45).
6. **Real content in brand's voice.** No lorem ipsum. Include awkward cases: long text, empty, error, loading.
7. **Composition proves system.** End with DESIGN.md's recipes + one realistic screen built only from tokens + components.
8. **Make DESIGN.md rules visible.** Do's + Don'ts → rendered do/don't pairs.

---

## Page Outline

| #   | Section                  | Contents                                                                                                                             |
| --- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Header                   | System name, "Themed from DESIGN.md", section anchors, light/dark toggle, primary CTA.                                               |
| 2   | Overview                 | DESIGN.md hero recipe: display type, one-line personality, signature artifact.                                                       |
| 3   | Foundations              | Color roles, palette, typography, spacing, radius, elevation, motion (if specified), icons.                                          |
| 4   | Actions                  | Button, ButtonGroup, Toggle, ToggleGroup, Badge, Kbd.                                                                                |
| 5   | Inputs                   | Field, Input, InputGroup, Textarea, Select, NativeSelect, Combobox, Checkbox, RadioGroup, Switch, Slider, InputOTP, Calendar, Label. |
| 6   | Navigation               | Tabs, Breadcrumb, Pagination, NavigationMenu, Menubar, Sidebar.                                                                      |
| 7   | Data display             | Card, Table, Chart, Item, Avatar, Accordion, Collapsible, Carousel, ScrollArea, Resizable, AspectRatio, Separator.                   |
| 8   | Feedback                 | Alert, toast (and Sonner in Base UI projects), Progress, Spinner, Skeleton, Empty.                                                   |
| 9   | Overlays                 | Dialog, AlertDialog, Sheet, Drawer, Popover, HoverCard, Tooltip, DropdownMenu, ContextMenu, Command.                                 |
| 10  | Conversation             | MessageScroller, Message, Bubble, Attachment, Marker, Questionnaire. See [rules/chat.md](./rules/chat.md).                           |
| 11  | Do and Don't             | Rendered pairs for DESIGN.md rules.                                                                                                  |
| 12  | Recipes + example screen | DESIGN.md's named components, then one realistic screen.                                                                             |
| 13  | Footer                   | DESIGN.md footer recipe.                                                                                                             |

`DirectionProvider` wherever RTL matters (RTL row in Inputs or Navigation).

Alternate section surfaces pace DESIGN.md bands. `className="dark"` on section → dark band, same components.

---

## Foundations

### Color roles

Grid of pairs, each rendered surface + "Aa" in foreground color, plus token names, resolved value, measured contrast (Paste, Material 3, Pajamas):

| Pair                                  | Required     |
| ------------------------------------- | ------------ |
| `background` / `foreground`           | Yes          |
| `card` / `card-foreground`            | Yes          |
| `popover` / `popover-foreground`      | Yes          |
| `primary` / `primary-foreground`      | Yes          |
| `secondary` / `secondary-foreground`  | Yes          |
| `muted` / `muted-foreground`          | Yes          |
| `accent` / `accent-foreground`        | Yes          |
| `destructive` on `background`         | Yes          |
| Each extra text token on `background` | When defined |

Use `ColorPair` from helpers. Measures contrast live, re-measures on theme change. Report any pair <4.5:1 for body-size text, even when DESIGN.md specifies it — brand primary at 3:1 behind 14px labels = real finding.

### Palette

Swatches grouped as DESIGN.md groups them (brand, surfaces, text, status, accents). Label each with DESIGN.md name + token: "Warm Stone · `surface-warm`". Show `border`, `input`, `ring`, `chart-1…5`, `sidebar-*` here too.

### Typography

Specimen table, one row per type token (Cloudscape, Carbon, Atlassian):

| Column   | Content                                   |
| -------- | ----------------------------------------- |
| Token    | `type-display-lg`                         |
| Spec     | size / line height / weight / tracking    |
| Use      | "Section heads", from DESIGN.md           |
| Specimen | Real copy in token, truncated to one line |

Group display → title → body → label/caption → code. Below table: one paragraph running text at body size, link + inline code — line length + rhythm visible.

### Spacing

Base unit + scale as labeled horizontal bars (Carbon, Atlassian), then semantic ladder: inside component, related items, groups, sections (Pajamas). Skip if DESIGN.md defines no spacing.

### Radius

Same box at every step, labeled token + value + what uses it (Material 3): `md · 8px · buttons, inputs`.

### Elevation

Each level as raised surface + components resting there (Pajamas, Material 3): flat canvas/bands, hairline cards, soft popovers/menus, deep dialogs.

### Motion and icons

Motion only if DESIGN.md defines durations/easings: table token, milliseconds, use. Icons: one row icon library at each size used, `foreground` + `muted-foreground`.

---

## Components: Tiers + Block Anatomy

### Tiers

| Tier         | Components                                                                                                                                                                                                            | How to show                                                    |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Primitives   | Button, Badge, Toggle, ToggleGroup, Input, Textarea, Select, NativeSelect, Checkbox, RadioGroup, Switch, Slider, Tabs                                                                                                 | Variant × state matrix, size ladder, icon row.                 |
| Fields       | Field, InputGroup, Combobox, InputOTP, Calendar, Label                                                                                                                                                                | Typical field, then description, error, disabled, required.    |
| Composed     | Card, Table, Item, Avatar, Alert, Empty, toast, Sonner, Accordion, Collapsible, Breadcrumb, Pagination, Progress, Skeleton, Spinner, Carousel, Chart, ScrollArea, Resizable, AspectRatio, Separator, Kbd, ButtonGroup | Typical example, one element added at a time, then edge cases. |
| Overlays     | Dialog, AlertDialog, Sheet, Drawer, Popover, HoverCard, Tooltip, DropdownMenu, ContextMenu, Menubar, NavigationMenu, Command                                                                                          | Real trigger per overlay, labeled what it opens.               |
| Shell        | Sidebar, DirectionProvider                                                                                                                                                                                            | Inline in framed preview (`collapsible="none"`).               |
| Conversation | MessageScroller, Message, Bubble, Attachment, Marker, Questionnaire                                                                                                                                                   | One realistic thread, then variant rows.                       |

### Block anatomy

Each component block, in order. Skip non-applicable:

1. **Name + one line when to use.** Wording from DESIGN.md recipe when exists.
2. **Typical example** in real content.
3. **Variants** priority order (primary → secondary → ghost), each with one-line "when".
4. **Sizes** ladder, smallest → largest.
5. **With icon**: leading, trailing, icon-only.
6. **States**: matrix for primitives, single examples rest.
7. **Edge cases** (below).

Wide components (Table, NavigationMenu, Menubar, Sidebar, Chart, MessageScroller) span full row.

---

## States Without Interaction

Pin interaction states via `data-preview` attribute. Override hover, focus-visible, active variants so each also matches attribute. Copy [assets/showcase/preview-states.css](./assets/showcase/preview-states.css) into `tailwindCssFile`:

```css
@custom-variant hover {
  @media (hover: hover) {
    &:hover {
      @slot;
    }
  }
  &[data-preview~="hover"] {
    @slot;
  }
}
@custom-variant focus-visible (&:focus-visible, &[data-preview~="focus"]);
@custom-variant active (&:active, &[data-preview~="active"]);
```

Theme adding unlayered focus rule (outline-style focus) → add `[data-preview~="focus"]` to its selector too.

Render matrix with `StateMatrix` + `previewState` from helpers:

```tsx
const variants = ["default", "secondary", "outline", "ghost", "destructive", "link"] as const

<StateMatrix
  rows={variants}
  render={(variant, state) => (
    <Button variant={variant} {...previewState(state)}>
      Save draft
    </Button>
  )}
/>
```

Columns: default, hover, focus, active, disabled. Add `loading` (Spinner + `disabled`) for Button, `invalid` (`aria-invalid`) for fields:

```tsx
<StateMatrix
  rows={["input"] as const}
  states={["default", "hover", "focus", "disabled", "invalid"]}
  render={(_, state) => (
    <Input
      placeholder="you@company.com"
      aria-invalid={state === "invalid" || undefined}
      {...previewState(state)}
    />
  )}
/>;
```

DESIGN.md says state doesn't change ("primary darkens on press only") → leave column identical. Matrix shows spec followed.

---

## Edge Cases

Show next to component they stress:

| Case          | Where                                                                 |
| ------------- | --------------------------------------------------------------------- |
| Long text     | Button label, Badge, Item title, Table cell, Breadcrumb (truncation). |
| Empty         | Table no rows → Empty, Combobox no matches, empty Command.            |
| Error         | Field with FieldError, Alert destructive, Attachment `state="error"`. |
| Loading       | Button with Spinner, Skeleton for Card/Item, Progress, toast loading. |
| Many items    | AvatarGroup with count, Pagination with ellipsis, ScrollArea list.    |
| Missing image | Avatar falling back to AvatarFallback.                                |
| Disabled      | Every field + Field `data-disabled`.                                  |
| RTL           | One row inside `DirectionProvider` `dir="rtl"`.                       |

---

## Do and Don't

Pick two-four DESIGN.md rules easiest to break, render each as pair (Primer, Orbit, Carbon):

```tsx
<div className="grid gap-4 md:grid-cols-2">
  <Example title="Do">
    <Button>Get started</Button>
    <Button variant="outline">Contact sales</Button>
  </Example>
  <Example title="Don't">
    <Button>Get started</Button>
    <Button>Contact sales</Button>
  </Example>
</div>;
```

Caption each with rule one line: "One primary action per group." Don't marked `destructive` text, not new color.

---

## Recipes + Example Screens

**Recipes.** Build each named component in DESIGN.md (`hero-band`, `feature-card`, `pricing-tier-card`, `callout-card-coral`, `footer`) from shadcn components + tokens. Spec's acceptance tests. Recipe unbuildable without raw values → token mapping incomplete.

**Example screen.** One realistic screen in brand's domain (Cloudscape demos, Paste templates): settings page (FieldGroup, Switch, Select, Button) or list view (Table, Badge, Pagination, Empty). Only tokens + components.

---

## Helpers

Copy from `assets/showcase/` into showcase folder:

| File                 | Purpose                                                                |
| -------------------- | ---------------------------------------------------------------------- |
| `preview-states.css` | Variant overrides pinning hover, focus, active via `data-preview`.     |
| `state-matrix.tsx`   | `StateMatrix` (labeled variant × state table) + `previewState(state)`. |
| `color-pair.tsx`     | `ColorPair`: surface + foreground, live contrast ratio + WCAG level.   |

They import `cn` from `@/lib/utils`. Rewrite path to project's `utils` alias.

---

## Checklist

- [ ] Every installed component renders (coverage script).
- [ ] Color roles as pairs with contrast; pairs <4.5:1 noted in report.
- [ ] Type specimen covers every DESIGN.md type token, real copy.
- [ ] Radius + elevation ladders name components using each step.
- [ ] Primitives have state matrix; Button + fields include loading + invalid.
- [ ] Edge cases: long text, empty, error, loading, missing image.
- [ ] Do/Don't pairs for DESIGN.md key rules.
- [ ] DESIGN.md recipes rebuilt + one example screen.
- [ ] Page-level theme toggle works, one scoped dark band if DESIGN.md has dark surfaces.
- [ ] No lorem ipsum, no state names inside components.
