"use client";

import { useCallback } from "react";
import { Func } from "@/types";
import { useSyncRef } from "./use-sync-ref";

/**
 * Joins two event handlers into one. Original runs first. Identity stays stable.
 * @param outer Existing handler. Its signature is the source of types.
 * @param inner Extra handler. Must match original's arguments and return.
 * @returns Composed handler, or `undefined` when both handlers are missing.
 */
export function useComposeEvent<T extends Func>(
  outer: T | null | undefined,
  inner: NoInfer<T> | null | undefined,
): T | undefined {
  const _outer = useSyncRef(outer);
  const _inner = useSyncRef(inner);

  const composed = useCallback((...args: Parameters<T>) => {
    let result: ReturnType<T> | undefined;
    result = _outer.current?.(...args) ?? result;
    result = _inner.current?.(...args) ?? result;
    return result;
  }, []) as T;

  if (outer == null && inner == null) return undefined;
  return composed;
}
