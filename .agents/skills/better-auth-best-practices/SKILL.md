---

name: better-auth-best-practices
description: Configure Better Auth server and client, set up database adapters, manage sessions, add plugins, and handle environment variables. Use when users mention Better Auth, betterauth, auth.ts, or need to set up TypeScript authentication with email/password, OAuth, or plugin configuration.
---

# Better Auth Integration Guide

## Documentation Version

Match docs to installed Better Auth version. APIs and plugin names differ across release lines.

1. Prefer version user names.
2. Else inspect resolved `better-auth` version in lockfile; fallback package manifest.
3. With Better Auth MCP: call `get_doc` with `/llms.txt` to resolve package version to doc identifier. Pass identifier to every `search_docs`; pass result paths to `get_doc` unchanged.
4. No MCP: start at [better-auth.com/llms.txt](https://better-auth.com/llms.txt), follow matching version index.
5. Use latest docs only if project version unknown or user asks for latest/upgrade.

Upgrade plan: separate guidance for installed version from target version.

---

## Setup Workflow

1. Install: `npm install better-auth`
2. Set env vars: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`
3. Create `auth.ts`: database + config
4. Create route handler for framework
5. Run migrations:
   - **Built-in adapter:** `npx auth@latest migrate`
   - **Drizzle:** `npx auth@latest generate --output src/db/auth-schema.ts` then `npx drizzle-kit push` (dev) or `npx drizzle-kit generate && npx drizzle-kit migrate` (prod)
   - **Prisma:** `npx auth@latest generate --output prisma/schema.prisma` then `npx prisma migrate dev`
6. Verify: `GET /api/auth/ok` returns `{ status: "ok" }`

---

## Quick Reference

### Environment Variables

- `BETTER_AUTH_SECRET` — encryption secret, min 32 chars. Generate: `openssl rand -base64 32`
- `BETTER_AUTH_URL` — base URL, e.g. `https://example.com`

Set `baseURL`/`secret` in config only if env vars not set.

### File Location

CLI looks for `auth.ts` in: `./`, `./lib`, `./utils`, or under `./src`. Custom path: `--config`.

### CLI Commands

- `npx auth@latest migrate` — apply schema (built-in adapter)
- `npx auth@latest generate` — generate schema for Prisma/Drizzle
- `npx auth@latest mcp --cursor` — add MCP to AI tools

**Re-run after adding/changing plugins.**

---

## Core Config Options

| Option             | Notes                                          |
| ------------------ | ---------------------------------------------- |
| `appName`          | Optional display name                          |
| `baseURL`          | Only if `BETTER_AUTH_URL` not set              |
| `basePath`         | Default `/api/auth`. Set `/` for root.         |
| `secret`           | Only if `BETTER_AUTH_SECRET` not set           |
| `database`         | Required for most features. See adapters docs. |
| `secondaryStorage` | Redis/KV for sessions & rate limits            |
| `emailAndPassword` | `{ enabled: true }` to activate                |
| `socialProviders`  | `{ google: { clientId, clientSecret }, ... }`  |
| `plugins`          | Array of plugins                               |
| `trustedOrigins`   | CSRF whitelist                                 |

---

## Database

**Direct connections:** Pass `pg.Pool`, `mysql2` pool, `better-sqlite3`, or `bun:sqlite` instance. Postgres also: `postgres` (postgres.js), `@neondatabase/serverless`.

**ORM adapters:** `better-auth/adapters/drizzle`, `better-auth/adapters/prisma`, `better-auth/adapters/mongodb`.

**Drizzle provider values:** `"pg"` (PostgreSQL), `"mysql"` (MySQL), `"sqlite"` (SQLite). Must match driver.

**Critical:** Better Auth uses adapter model names, NOT table names. Prisma model `User` mapping to table `users`: use `modelName: "user"`, not `"users"`.

---

## Session Management

**Storage priority:**

1. `secondaryStorage` set → sessions go there, not DB
2. `session.storeSessionInDatabase: true` → also persist to DB
3. No database + `cookieCache` → stateless mode

**Cookie cache strategies:**

- `compact` (default) — Base64url + HMAC. Smallest.
- `jwt` — standard JWT. Readable but signed.
- `jwe` — encrypted. Maximum security.

**Key options:** `session.expiresIn` (default 7 days), `session.updateAge` (refresh interval), `session.cookieCache.maxAge`, `session.cookieCache.version` (change to invalidate all sessions).

---

## User & Account Config

**User:** `user.modelName`, `user.fields` (column mapping), `user.additionalFields`, `user.changeEmail.enabled` (default off), `user.deleteUser.enabled` (default off).

**Account:** `account.modelName`, `account.accountLinking.enabled`, `account.storeAccountCookie` (stateless OAuth).

**Required for registration:** `email`, `name` fields.

---

## Email Flows

- `emailVerification.sendVerificationEmail` — required for verification to work
- `emailVerification.sendOnSignUp` / `sendOnSignIn` — auto-send triggers
- `emailAndPassword.sendResetPassword` — password reset email handler

---

## Security

**In `advanced`:**

- `useSecureCookies` — force HTTPS cookies
- `disableCSRFCheck` — ⚠️ security risk
- `disableOriginCheck` — ⚠️ security risk
- `crossSubDomainCookies.enabled` — share cookies across subdomains
- `ipAddress.ipAddressHeaders` — custom IP headers for proxies
- `database.generateId` — custom ID generation or `"serial"`/`"uuid"`/`false`

**Rate limiting:** `rateLimit.enabled`, `rateLimit.window`, `rateLimit.max`, `rateLimit.storage` (`"memory"` | `"database"` | `"secondary-storage"`).

---

## Hooks

**Endpoint hooks:** `hooks.before` / `hooks.after` — array of `{ matcher, handler }`. Use `createAuthMiddleware`. Access `ctx.path`, `ctx.context.returned` (after), `ctx.context.session`.

**Database hooks:** `databaseHooks.user.create.before/after`, same for `session`, `account`. Good for default values, post-creation actions.

**Hook context (`ctx.context`):** `session`, `secret`, `authCookies`, `password.hash()`/`verify()`, `adapter`, `internalAdapter`, `generateId()`, `tables`, `baseURL`.

---

## Plugins

**Import from dedicated paths for tree-shaking:**

```ts
import { twoFactor } from "better-auth/plugins/two-factor";
```
NOT `from "better-auth/plugins"`.

**Popular plugins:** `twoFactor`, `organization`, `passkey`, `magicLink`, `emailOtp`, `username`, `phoneNumber`, `admin`, `apiKey`, `bearer`, `jwt`, `multiSession`, `sso`, `oauthProvider`, `oidcProvider`, `openAPI`, `genericOAuth`.

Client plugins go in `createAuthClient({ plugins: [...] })`.

---

## Client

Import from: `better-auth/client` (vanilla), `better-auth/react`, `better-auth/vue`, `better-auth/svelte`, `better-auth/solid`.

Key methods: `signUp.email()`, `signIn.email()`, `signIn.social()`, `signOut()`, `useSession()`, `getSession()`, `revokeSession()`, `revokeSessions()`.

---

## Type Safety

Infer: `typeof auth.$Infer.Session`, `typeof auth.$Infer.Session.user`.

Separate client/server projects: `createAuthClient<typeof auth>()`.

---

## Common Gotchas

1. **Model vs table name** — config uses ORM model name, not DB table name
2. **Plugin schema** — re-run CLI after adding plugins
3. **Secondary storage** — sessions go there by default, not DB
4. **Cookie cache** — custom session fields NOT cached, always re-fetched
5. **Stateless mode** — no DB = session in cookie only, logout on cache expiry
6. **Change email flow** — sends to current email first, then new email
7. **Drizzle: db not initialized** — `drizzleAdapter(db, ...)` needs `db` from `drizzle()`. See `create-auth` skill for setups (node-postgres, postgres.js, Neon).
8. **Drizzle: missing drizzle.config.ts** — `drizzle-kit` commands need `drizzle.config.ts` pointing to generated schema + DB credentials.

---

## Resources

- [Docs](https://better-auth.com/docs)
- [Options Reference](https://better-auth.com/docs/reference/options)
- [LLMs.txt](https://better-auth.com/llms.txt)
- [GitHub](https://github.com/better-auth/better-auth)
- [Init Options Source](https://github.com/better-auth/better-auth/blob/main/packages/core/src/types/init-options.ts)
