"use client";

import { Callback } from "@/types";
import { useLazyRef } from "./use-lazy-ref";

type Input<T> = React.Ref<T> | undefined | null;
type Result<T> = React.RefCallback<T> | null;
type Cleanup = Callback<void> | undefined | null;

type Clone<T> = {
  refs: readonly Input<T>[];
  callback: Result<T>;
};

/**
 * Composes multiple refs into a single ref.
 * @param refs refs to compose
 * @returns a ref callback, or `null` when every ref is nullish
 */
export function useComposeRefs<T>(...refs: readonly Input<T>[]): Result<T> {
  const clones = useLazyRef(createClone, refs).current;
  if (isChanged(clones, refs)) updateClone(clones, refs);
  return clones.callback;
}

function isChanged<T>(clone: Clone<T>, refs: readonly Input<T>[]): boolean {
  return clone.refs.length !== refs.length || clone.refs.some((r, i) => r !== refs[i]);
}

function createClone<T>(refs: readonly Input<T>[]): Clone<T> {
  const clone: Clone<T> = { refs: [], callback: null };
  updateClone(clone, refs);
  return clone;
}

function updateClone<T>(clone: Clone<T>, refs: readonly Input<T>[]) {
  clone.refs = refs;
  if (refs.every((ref) => ref == null)) {
    clone.callback = null;
    return;
  }
  clone.callback = (instance: T) => {
    if (instance == null) return;
    const cleanups: Cleanup[] = [];
    const length = refs.length;
    for (let i = 0; i < length; i++) {
      const ref = refs[i];
      if (ref == null) continue;
      if (typeof ref === "function") {
        const fn = ref(instance);
        if (typeof fn === "function") cleanups[i] = fn;
      } else {
        ref.current = instance;
      }
    }
    return () => {
      for (let i = 0; i < length; i++) {
        const ref = refs[i];
        if (ref == null) continue;
        if (typeof ref === "function") {
          const fn = cleanups[i];
          if (typeof fn === "function") fn();
          else void ref(null);
        } else {
          ref.current = null;
        }
      }
    };
  };
}
