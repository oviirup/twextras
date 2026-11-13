# Customization & Theming

Components reference semantic CSS variable tokens. Change variables → change every component.

## Contents

- How it works (CSS variables → Tailwind utilities → components)
- Color variables + OKLCH format
- Dark mode setup
- Changing theme (presets, CSS variables)
- Adding custom colors (Tailwind v3 + v4)
- Border radius
- Customizing components (variants, className, wrappers)
- Checking for updates

---

## How It Works

1. CSS variables in `:root` (light) + `.dark` (dark mode).
2. Tailwind maps to utilities: `bg-primary`, `text-muted-foreground`, etc.
3. Components use utilities — change variable, change all components referencing it.

---

## Color Variables

Every color follows `name`/`name-foreground`: base = backgrounds, `-foreground` = text/icons on it.

| Variable                                     | Purpose                     |
| -------------------------------------------- | --------------------------- |
| `--background` / `--foreground`              | Page bg + default text      |
| `--card` / `--card-foreground`               | Card surfaces               |
| `--primary` / `--primary-foreground`         | Primary buttons + actions   |
| `--secondary` / `--secondary-foreground`     | Secondary actions           |
| `--muted` / `--muted-foreground`             | Muted/disabled states       |
| `--accent` / `--accent-foreground`           | Hover + accent states       |
| `--destructive` / `--destructive-foreground` | Error + destructive actions |
| `--border`                                   | Default border color        |
| `--input`                                    | Form input borders          |
| `--ring`                                     | Focus ring color            |
| `--chart-1` through `--chart-5`              | Chart/data viz              |
| `--sidebar-*`                                | Sidebar-specific colors     |
| `--surface` / `--surface-foreground`         | Secondary surface           |

Colors use OKLCH: `--primary: oklch(0.205 0 0)` = lightness (0–1), chroma (0 = gray), hue (0–360).

---

## Dark Mode

Class-based toggle via `.dark` on root. Next.js → `next-themes`:

```tsx
import { ThemeProvider } from "next-themes";

<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>;
```

---

## Changing the Theme

```bash
# Apply preset code from ui.shadcn.com.
npx shadcn@latest apply --preset a2r6bw

# Positional shorthand also works.
npx shadcn@latest apply a2r6bw

# Switch to named preset, overwrite existing components.
npx shadcn@latest apply --preset nova

# Preserve existing components instead.
npx shadcn@latest init --preset nova --force --no-reinstall

# Custom theme URL.
npx shadcn@latest apply --preset "https://ui.shadcn.com/init?base=radix&style=nova&theme=blue&..."
```

Or edit CSS variables directly in `globals.css`.

---

## Adding Custom Colors

Add variables to file at `tailwindCssFile` from `npx shadcn@latest info` (typically `globals.css`). Never create new CSS file for this.

```css
/* 1. Define in global CSS. */
:root {
  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 46);
}
.dark {
  --warning: oklch(0.41 0.11 46);
  --warning-foreground: oklch(0.99 0.02 95);
}
```

```css
/* 2a. Register with Tailwind v4 (@theme inline). */
@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

`tailwindVersion` `"v3"` (check `npx shadcn@latest info`) → register in `tailwind.config.js`:

```js
// 2b. Register with Tailwind v3 (tailwind.config.js).
module.exports = {
  theme: {
    extend: {
      colors: {
        warning: "oklch(var(--warning) / <alpha-value>)",
        "warning-foreground": "oklch(var(--warning-foreground) / <alpha-value>)",
      },
    },
  },
};
```

```tsx
// 3. Use in components.
<div className="bg-warning text-warning-foreground">Warning</div>;
```

---

## Border Radius

`--radius` controls border radius globally. Components derive: `rounded-lg` = `var(--radius)`, `rounded-md` = `calc(var(--radius) - 2px)`.

Brand spec with own radius scale → pin each step in `@theme inline` (`--radius-sm` … `--radius-4xl`) instead of deriving from `--radius`. See [design-system.md](./design-system.md#radius).

---

## Customizing Components

See [rules/styling.md](./rules/styling.md) for Incorrect/Correct examples.

Prefer in order:

### 1. Built-in variants

```tsx
<Button variant="outline" size="sm">
  Click
</Button>;
```

### 2. Tailwind classes via `className`

```tsx
<Card className="mx-auto max-w-md">...</Card>;
```

### 3. Add new variant

Edit component source, add variant via `cva`:

```tsx
// components/ui/button.tsx
warning: "bg-warning text-warning-foreground hover:bg-warning/90",
```

### 4. Wrapper components

Compose shadcn/ui primitives into higher-level components:

```tsx
export function ConfirmDialog({ title, description, onConfirm, children }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

---

## Checking for Updates

```bash
npx shadcn@latest add button --diff
```

Preview changes before updating — `--dry-run` + `--diff`:

```bash
npx shadcn@latest add button --dry-run        # see all affected files
npx shadcn@latest add button --diff button.tsx # see diff for specific file
```

Full smart merge workflow → [Updating Components in SKILL.md](./SKILL.md#updating-components).
