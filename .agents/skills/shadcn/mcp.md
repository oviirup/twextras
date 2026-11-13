# shadcn MCP Server

CLI includes MCP server letting AI assistants search, browse, view, install items from registries.

---

## Setup

```bash
shadcn mcp        # start MCP server (stdio)
shadcn mcp init   # write config for your editor
```

Editor config files:

| Editor      | Config file                     |
| ----------- | ------------------------------- |
| Claude Code | `.mcp.json`                     |
| Cursor      | `.cursor/mcp.json`              |
| VS Code     | `.vscode/mcp.json`              |
| OpenCode    | `opencode.json`                 |
| Codex       | `~/.codex/config.toml` (manual) |

---

## Tools

> **Tip:** MCP tools handle registry ops (search, view, install). Project config (aliases, framework, Tailwind version) → `npx shadcn@latest info`. No MCP equivalent.

### `shadcn:get_project_registries`

Returns registry names from `components.json`. Errors if none exists.

**Input:** none

### `shadcn:list_items_in_registries`

Lists all items from one+ registries. Registries = configured namespaces (`@acme`), public GitHub sources (`owner/repo`), or registry catalog URLs. Omit `registries` → every registry in `components.json`.

**Input:** `registries` (string[], optional — omit for all), `types` (string[], optional — e.g. `["ui", "block"]`), `limit` (number, optional, default 100), `offset` (number, optional)

### `shadcn:search_items_in_registries`

Fuzzy search across registries (namespaces, GitHub sources, catalog URLs). Omit `registries` → all configured, e.g. "find me a hero" across all.

**Input:** `registries` (string[], optional — omit for all), `query` (string), `types` (string[], optional), `limit` (number, optional, default 100), `offset` (number, optional)

### `shadcn:view_items_in_registries`

Item details incl. full file contents.

**Input:** `items` (string[]) — e.g. `["@shadcn/button", "@shadcn/card", "owner/repo/item"]`

### `shadcn:get_item_examples_from_registries`

Usage examples + demos with source code. Omit `registries` → all configured.

**Input:** `registries` (string[], optional — omit for all), `query` (string) — e.g. `"accordion-demo"`, `"button example"`

### `shadcn:get_add_command_for_items`

Returns CLI install command.

**Input:** `items` (string[]) — e.g. `["@shadcn/button"]`

### `shadcn:get_audit_checklist`

Checklist verifying components (imports, deps, lint, TypeScript).

**Input:** none

---

## Configuring Registries

Namespaced + authenticated registries set in `components.json`. `@shadcn` registry always built-in. Public GitHub registries usable directly as `owner/repo` sources when repo has root `registry.json`; no `components.json` config needed.

```json
{
  "registries": {
    "@acme": "https://acme.com/r/{name}.json",
    "@private": {
      "url": "https://private.com/r/{name}.json",
      "headers": { "Authorization": "Bearer ${MY_TOKEN}" }
    }
  }
}
```

- Names must start `@`.
- URLs must contain `{name}`.
- `${VAR}` resolved from env vars.

Community registry index: `https://ui.shadcn.com/r/registries.json`
