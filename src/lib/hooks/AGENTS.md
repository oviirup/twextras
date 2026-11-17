# src/lib/hooks

Client hooks, one per file, named `use-*.ts`. No barrel - import direct: `import { useCopy } from "@/lib/hooks/use-copy"`. `"use client"` on all except `use-is-mobile`, `use-is-online`, `use-media-query` (render-safe both sides). Docs live in JSDoc on each hook; this file is the map.

## Primitives (built first, reused by rest)

- `useSyncRef` - ref that always holds latest render value (`ref.current = value` every render). Foundation for "latest callback" pattern.
- `useLazyRef` - ref initialized once by `init(initArg?)`. `UNSET` sentinel; `init` never reruns.
- `useIsoEffect` - `useLayoutEffect` on client, no-op on server.

## Ref composition

- `useComposeRefs<T>(...refs)` - joins refs into one callback ref; cleanup support for function refs; returns `null` when all refs nullish. Instantiated once via `useLazyRef`, updated only when the list changes.

## Composition / events

- `useComposeEvent<T>(outer, inner)` - joins two handlers, outer first, inner result wins. Stable identity; returns `undefined` when both nullish.
- `useEvent(eventName, callback, opts?, element?)` - DOM event subscribe, latest callback always used. Overloads for `WindowEventMap`, `HTMLElementEventMap` (+ element ref), `DocumentEventMap`. No target = `window`. Empty ref = no subscribe. Uses `AbortController` signal for unsubscribe via `useIsoEffect`.
- `useInterval(callback, delay, immediate?)` - repeating timer, latest callback. `delay` nullish = paused. `immediate: true` = one tick before the first interval starts.

## State / environment

- `useCopy({ onSuccess, onError, timeout = 2000 })` - clipboard write via `navigator.clipboard.writeText`. State: `"ready" | "success" | "error"`, auto-resets after `timeout`. `copy(text)` takes string or `() => string`. Types namespaced under `useCopy.State/Text/Options/Result`.
- `useMediaQuery(query)` - media query matches. `useSyncExternalStore`, server snapshot `false`.
- `useIsMobile` - `useMediaQuery("(max-width: 40rem)")` wrapper. Mobile breakpoint = ≤40rem.

## Conventions

- Latest-callback pattern everywhere: wrap callback in `useSyncRef` so the effect never resubscribes on identity change.
- Subscriptions cleaned up with `AbortController.abort()` or explicit cleanup from `useIsoEffect`.
- Public types defined next to the hook; some get `<hook>.<type>` namespaces (see `useCopy`).
