"use client";

import { useSyncExternalStore } from "react";

/**
 * Reports whether a given media query matches the current viewport.
 * @param query The media query string to evaluate.
 * @returns Whether the media query currently matches.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (fn) => {
      const ctrl = new AbortController();
      const matches = matchMedia(query);
      matches.addEventListener("change", fn, { signal: ctrl.signal });
      return () => ctrl.abort();
    },
    () => matchMedia(query).matches,
    () => false,
  );
}
