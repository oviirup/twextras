# shadcn CLI Reference

Config read from `components.json`.

> **IMPORTANT:** Always run with project's package runner: `npx shadcn@latest`, `pnpm dlx shadcn@latest`, or `bunx --bun shadcn@latest`. Check `packageManager` from project context. Examples use `npx shadcn@latest`; substitute correct runner.

> **IMPORTANT:** Only use documented flags. Undocumented flag = doesn't exist. CLI auto-detects package manager from lockfile; no `--package-manager` flag.

## Contents

- Commands: init, apply, add (dry-run, smart merge), search, view, docs, info, build
- Templates: next, vite, start, react-router, astro
- Presets: named, code, URL formats + fields
- Switching presets

---

## Commands

### `init` — Initialize or create project

```bash
npx shadcn@latest init [components...] [options]
```

Initializes shadcn/ui in existing project or creates new (with `--name`). Optionally installs components same step.

| Flag                    | Short | Description                                               | Default |
| ----------------------- | ----- | --------------------------------------------------------- | ------- |
| `--template <template>` | `-t`  | Template (next, start, vite, next-monorepo, react-router) | —       |
| `--preset [name]`       | `-p`  | Preset config (named, code, or URL)                       | —       |
| `--yes`                 | `-y`  | Skip confirmation prompt                                  | `true`  |
| `--defaults`            | `-d`  | Use defaults (`--template=next --preset=base-nova`)       | `false` |
| `--force`               | `-f`  | Force overwrite existing config                           | `false` |
| `--cwd <cwd>`           | `-c`  | Working directory                                         | current |
| `--name <name>`         | `-n`  | Name for new project                                      | —       |
| `--silent`              | `-s`  | Mute output                                               | `false` |
| `--rtl`                 |       | Enable RTL support                                        | —       |
| `--reinstall`           |       | Re-install existing UI components                         | `false` |
| `--monorepo`            |       | Scaffold monorepo project                                 | —       |
| `--no-monorepo`         |       | Skip monorepo prompt                                      | —       |

`npx shadcn@latest create` = alias for `init`.

### `apply` — Apply preset to existing project

```bash
npx shadcn@latest apply [preset] [options]
```

Applies preset to existing project, overwriting preset-driven config, fonts, CSS variables, detected UI components.

| Flag                | Short | Description                         | Default |
| ------------------- | ----- | ----------------------------------- | ------- |
| `--preset <preset>` | —     | Preset config (named, code, or URL) | —       |
| `--yes`             | `-y`  | Skip confirmation prompt            | `false` |
| `--cwd <cwd>`       | `-c`  | Working directory                   | current |
| `--silent`          | `-s`  | Mute output                         | `false` |

`[preset]` shorthand for `--preset <preset>`. Both → must match. No preset → CLI offers custom preset builder on `ui.shadcn.com/create`.

### `add` — Add components

> **IMPORTANT:** To compare local components vs upstream or preview changes, ALWAYS `npx shadcn@latest add <component> --dry-run`, `--diff`, or `--view`. NEVER fetch raw files from GitHub manually. CLI handles registry resolution, file paths, CSS diffing.

```bash
npx shadcn@latest add [components...] [options]
```

Accepts component names, registry-prefixed (`@magicui/shimmer-button`), GitHub item addresses (`owner/repo/item`), URLs, local paths.

| Flag            | Short | Description                                                                                   | Default |
| --------------- | ----- | --------------------------------------------------------------------------------------------- | ------- |
| `--yes`         | `-y`  | Skip confirmation prompt                                                                      | `false` |
| `--overwrite`   | `-o`  | Overwrite existing files                                                                      | `false` |
| `--cwd <cwd>`   | `-c`  | Working directory                                                                             | current |
| `--all`         | `-a`  | Add all available components                                                                  | `false` |
| `--path <path>` | `-p`  | Target path for component                                                                     | —       |
| `--silent`      | `-s`  | Mute output                                                                                   | `false` |
| `--dry-run`     |       | Preview all changes without writing files                                                     | `false` |
| `--diff [path]` |       | Show diffs. No path → first 5 files. With path → that file only (implies `--dry-run`)         | —       |
| `--view [path]` |       | Show file contents. No path → first 5 files. With path → that file only (implies `--dry-run`) | —       |

#### Dry-Run Mode

`--dry-run` previews `add` without writing. `--diff` + `--view` imply `--dry-run`.

```bash
# Preview all changes.
npx shadcn@latest add button --dry-run

# Show diffs for all files (top 5).
npx shadcn@latest add button --diff

# Show diff for specific file.
npx shadcn@latest add button --diff button.tsx

# Show contents for all files (top 5).
npx shadcn@latest add button --view

# Show full content of specific file.
npx shadcn@latest add button --view button.tsx

# Works with URLs too.
npx shadcn@latest add https://api.npoint.io/abc123 --dry-run

# Works with public GitHub registries too.
npx shadcn@latest add owner/repo/item --dry-run

# CSS diffs.
npx shadcn@latest add button --diff globals.css
```

**When to use dry-run:**

- "What files will this add?" / "What will this change?" → `--dry-run`.
- Before overwriting existing components → `--diff` first.
- Inspect component source without installing → `--view`.
- Check CSS changes to `globals.css` → `--diff globals.css`.
- Review/audit third-party registry code before installing → `--view` source.

> **`add --dry-run` vs `view`:** Prefer `add --dry-run`/`--diff`/`--view` over `view` for project previews — shows resolved paths, diffs vs existing, CSS updates. `view` only shows raw registry metadata, no project context.

#### Smart Merge from Upstream

Full workflow → [Updating Components in SKILL.md](./SKILL.md#updating-components).

### `search` — Search registries

```bash
npx shadcn@latest search [registries...] [options]
```

Fuzzy search across registries. Alias: `npx shadcn@latest list`. Supports namespaces (`@acme`), public GitHub sources (`owner/repo`), catalog URLs. No `-q` → lists all items. No registries → searches every registry in `components.json`.

| Flag                | Short | Description                                                  | Default |
| ------------------- | ----- | ------------------------------------------------------------ | ------- |
| `--query <query>`   | `-q`  | Search query                                                 | —       |
| `--type <type>`     | `-t`  | Filter by item type (`ui`, `block`, `hook`); comma-separated | —       |
| `--limit <number>`  | `-l`  | Max items                                                    | `100`   |
| `--offset <number>` | `-o`  | Items to skip                                                | `0`     |
| `--json`            |       | Output as JSON                                               | `false` |
| `--cwd <cwd>`       | `-c`  | Working directory                                            | current |

### `view` — View item details

```bash
npx shadcn@latest view <items...> [options]
```

Item info incl. file contents. Examples: `npx shadcn@latest view @shadcn/button`, `npx shadcn@latest view owner/repo/item`.

### `docs` — Component documentation URLs

```bash
npx shadcn@latest docs <components...> [options]
```

Resolved URLs for docs, examples, API references. Accepts one+ component names. Fetch URLs for actual content.

Example output for `npx shadcn@latest docs input button`:

```
base  radix

input
  docs      https://ui.shadcn.com/docs/components/radix/input
  examples  https://raw.githubusercontent.com/.../examples/input-example.tsx

button
  docs      https://ui.shadcn.com/docs/components/radix/button
  examples  https://raw.githubusercontent.com/.../examples/button-example.tsx
```

Some components include `api` link to underlying library (e.g. `cmdk` for command).

### `diff` — Check for updates

Do not use. Use `npx shadcn@latest add --diff` instead.

### `info` — Project information

```bash
npx shadcn@latest info [options]
```

Project info + `components.json` config. Run first to discover framework, aliases, Tailwind version, resolved paths.

| Flag          | Short | Description       | Default |
| ------------- | ----- | ----------------- | ------- |
| `--cwd <cwd>` | `-c`  | Working directory | current |

**Project Info fields:**

| Field                | Type      | Meaning                                                            |
| -------------------- | --------- | ------------------------------------------------------------------ |
| `framework`          | `string`  | Detected framework (`next`, `vite`, `react-router`, `start`, etc.) |
| `frameworkVersion`   | `string`  | Framework version (e.g. `15.2.4`)                                  |
| `isSrcDir`           | `boolean` | Uses `src/` directory                                              |
| `isRSC`              | `boolean` | React Server Components enabled                                    |
| `isTsx`              | `boolean` | Uses TypeScript                                                    |
| `tailwindVersion`    | `string`  | `"v3"` or `"v4"`                                                   |
| `tailwindConfigFile` | `string`  | Tailwind config file path                                          |
| `tailwindCssFile`    | `string`  | Global CSS file path                                               |
| `aliasPrefix`        | `string`  | Import alias prefix (e.g. `@`, `~`, `@/`)                          |
| `packageManager`     | `string`  | Detected package manager (`npm`, `pnpm`, `yarn`, `bun`)            |

**Components.json fields:**

| Field                | Type      | Meaning                                                                                    |
| -------------------- | --------- | ------------------------------------------------------------------------------------------ |
| `base`               | `string`  | Primitive library (`radix` or `base`) — determines component APIs + props                  |
| `style`              | `string`  | Visual style (e.g. `nova`, `vega`)                                                         |
| `rsc`                | `boolean` | RSC flag from config                                                                       |
| `tsx`                | `boolean` | TypeScript flag                                                                            |
| `tailwind.config`    | `string`  | Tailwind config path                                                                       |
| `tailwind.css`       | `string`  | Global CSS path — custom CSS variables go here                                             |
| `iconLibrary`        | `string`  | Icon library — determines icon import package (e.g. `lucide-react`, `@tabler/icons-react`) |
| `aliases.components` | `string`  | Component import alias (e.g. `@/components`)                                               |
| `aliases.utils`      | `string`  | Utils import alias (e.g. `@/lib/utils`)                                                    |
| `aliases.ui`         | `string`  | UI component alias (e.g. `@/components/ui`)                                                |
| `aliases.lib`        | `string`  | Lib alias (e.g. `@/lib`)                                                                   |
| `aliases.hooks`      | `string`  | Hooks alias (e.g. `@/hooks`)                                                               |
| `resolvedPaths`      | `object`  | Absolute file-system paths per alias                                                       |
| `registries`         | `object`  | Configured custom registries                                                               |

**Links fields:**

`info` output includes **Links** section with templated URLs for component docs, source, examples. Resolved URLs → `npx shadcn@latest docs <component>`.

### `build` — Build custom registry

```bash
npx shadcn@latest build [registry] [options]
```

Builds `registry.json` into individual JSON files for distribution. Default input `./registry.json`, output `./public/r`.

Authoring rules, `include`, item definitions, `registryDependencies`, GitHub registry behavior → [registry.md](./registry.md).

| Flag              | Short | Description       | Default      |
| ----------------- | ----- | ----------------- | ------------ |
| `--output <path>` | `-o`  | Output directory  | `./public/r` |
| `--cwd <cwd>`     | `-c`  | Working directory | current      |

---

## Templates

| Value          | Framework      | Monorepo support |
| -------------- | -------------- | ---------------- |
| `next`         | Next.js        | Yes              |
| `vite`         | Vite           | Yes              |
| `start`        | TanStack Start | Yes              |
| `react-router` | React Router   | Yes              |
| `astro`        | Astro          | Yes              |
| `laravel`      | Laravel        | No               |

All support monorepo via `--monorepo` (uses monorepo-specific template dir e.g. `next-monorepo`, `vite-monorepo`). Neither `--monorepo` nor `--no-monorepo` → interactive prompt. Laravel: no monorepo.

---

## Presets

Three `--preset` forms:

1. **Named:** `--preset nova` or `--preset lyra`
2. **Code:** `--preset a2r6bw` (version-prefixed base62, e.g. `a2r6bw` or `b0`)
3. **URL:** `--preset "https://ui.shadcn.com/init?base=radix&style=nova&..."`

> **IMPORTANT:** Never decode/fetch/resolve preset codes manually — opaque, pass directly to `init --preset <code>`, let CLI resolve. `apply --preset <code>` overwrites existing project's preset.

## Switching Presets

Ask user first: **overwrite**, **merge**, or **skip** existing components?

- **Overwrite / Re-install** → `npx shadcn@latest apply --preset <code>`. Overwrites all detected component files with new preset styles. User hasn't customized components.
- **Merge** → `npx shadcn@latest init --preset <code> --force --no-reinstall`, then `npx shadcn@latest info` for installed list, then [smart merge workflow](./SKILL.md#updating-components) per component preserving local changes. User has customized components.
- **Skip** → `npx shadcn@latest init --preset <code> --force --no-reinstall`. Config + CSS variables only, components as-is.

Always run preset commands inside user's project dir. `apply` needs existing project with `components.json`. CLI auto-preserves current `base` (`base` vs `radix`) from `components.json`. Scratch/temp dir (e.g. `--dry-run` comparisons) → pass `--base <current-base>` explicitly — preset codes don't encode base.
