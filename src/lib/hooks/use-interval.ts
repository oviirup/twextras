"use client";

import { useIsoEffect } from "./use-iso-effect";
import { useSyncRef } from "./use-sync-ref";

/**
 * Runs a callback on a repeating timer. The latest callback is always used.
 * @param callback Function invoked on each tick.
 * @param delay Interval in milliseconds. `null` or `undefined` pauses the timer.
 * @param immediate When `true`, invoke `callback` once as soon as the timer starts.
 */
export function useInterval(
  callback: () => void,
  delay: number | null | undefined,
  immediate = false,
): void {
  const tick = useSyncRef(callback);

  useIsoEffect(() => {
    if (delay == null) return;
    if (immediate) tick.current();
    const timer = setInterval(tick.current, delay);
    return () => clearInterval(timer);
  }, [delay, immediate]);
}
