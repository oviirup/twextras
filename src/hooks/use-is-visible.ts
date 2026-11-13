"use client";

import { useState } from "react";
import { useIsoEffect } from "./use-iso-effect";
import { useSyncRef } from "./use-sync-ref";

/**
 * Reports whether a given element is visible in the viewport or a given root.
 * @param ref The element ref to observe.
 * @param options IntersectionObserver options.
 * @returns Whether the element is currently visible.
 */
export function useIsVisible(
  ref: React.RefObject<HTMLElement | null>,
  options: IntersectionObserverInit = {},
): boolean {
  const [isVisible, setIsVisible] = useState(false);
  const syncOptions = useSyncRef(options);

  useIsoEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry?.isIntersecting ?? false);
    }, syncOptions.current);
    observer.observe(el);

    return () => observer.disconnect();
  }, [syncOptions, ref]);

  return isVisible;
}
