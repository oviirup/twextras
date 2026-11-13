import { useSyncExternalStore } from "react";

/**
 * Reports whether the user is online.
 * @returns `true` when the user is online.
 */
export function useIsOnline(): boolean {
  return useSyncExternalStore(
    (fn) => {
      const ctrl = new AbortController();
      window.addEventListener("online", fn, { signal: ctrl.signal });
      window.addEventListener("offline", fn, { signal: ctrl.signal });
      return () => ctrl.abort();
    },
    () => window.navigator.onLine,
    () => true,
  );
}
