"use client";

import { useRef } from "react";

/**
 * Returns a ref whose `current` value stays in sync with the latest render.
 * @param value value to keep on the ref
 * @returns ref object with the value
 */
export function useSyncRef<T>(value: T): React.RefObject<T> {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
