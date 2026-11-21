## Package Manager

Always use `bun` or `bunx` to run scripts and package binaries. Do not use `npm` or `pnpm` for commands in this repository.

<!-- BEGIN: env-usage -->

## Environment Variables

Always use the typed `env` object from `src/config/env.ts` (import as `@/config/env`). Never read `process.env` directly in application code. Add new variables to the `env.ts` schema (`server` for server-only, `shared` for isomorphic) and to `vars`, plus document them in `.env.example`. `env.ts` only exposes keys declared in `vars`.

<!-- END: env-usage -->

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` - verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN: oviirup-component-guideline -->

## Component Guidelines

All components should be created using shadcn ui components only.

Whenever installing or adding a shadcn component, you must follow the guidelines at `.agents/skills/oviirup-components-guidelines/SKILL.md`

<!-- END: oviirup-component-guideline -->

<!-- BEGIN: database -->

## Database

_PostgreSQL_ via _Prisma ORM v7_. Local dev database is Supabase running on localhost.

- Start Supabase before running the dev server with `bun run db:start`. Check state anytime with `bun run db:status`.
- Schema lives in `prisma/schema/` (multi-file): `schema.prisma` holds generator + datasource, model files like `auth.prisma` hold models. Generated client outputs to `prisma/generated` - import `PrismaClient` from `@/prisma/generated/client`.
- DB access goes through `src/lib/db/prisma.ts` (`prisma` singleton). Never instantiate `PrismaClient` elsewhere.
- After changing `prisma/schema/*`, run `bunx prisma generate` to regenerate types, and `bunx prisma migrate dev --name <name>` to create/apply migrations.
- Naming: all table and column names in the database must be `lower_snake_case`. Tables use `@@map("snake_name")`, columns use `@map("snake_name")` - add `@map` ONLY when the default column name is not already snake_case (e.g. map `emailVerified` -> `email_verified`, but do NOT map `id`, `email`, `token`). Keep Prisma field names camelCase; `@map` only affects the database column.

<!-- END: database -->


## Nested Agent Rules

Scoped `AGENTS.md` files exist deeper in the repo. Read the one covering the area you touch:

- `src/components/AGENTS.md` - component folder structure, file shape, imports, cva variants, markup/style conventions, Storybook rules.
- `src/lib/hooks/AGENTS.md` - client hook conventions (`use-*.ts`, latest-callback pattern, cleanup rules).
- `src/lib/icons/AGENTS.md` - icon registry system (`createIconNode`, `Icons.*` namespace, no other icon packages).
- `src/styles/AGENTS.md` - twextras/Tailwind v4 utilities and theme tokens (points to `node_modules/twextras/AGENTS.md`).
