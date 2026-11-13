"use client";

import { useSyncExternalStore } from "react";
import { NOOP } from "@/lib/empty";

/**
 * Reports whether the component is rendering on the client after hydration.
 * @returns `true` on the client after hydration, otherwise `false`.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    () => NOOP,
    () => true,
    () => false,
  );
}
