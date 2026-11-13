"use client";

import { useRef } from "react";

const UNSET = Symbol("useLazyRef");

/**
 * Returns a ref whose `current` value is initialized once by a function
 * @param init Function used to initialize the ref
 * @param initArg Argument passed to `init`
 * @returns A ref object with the initialized value
 */
export function useLazyRef<T>(init: () => T): React.RefObject<T>;
export function useLazyRef<T, U>(init: (arg: U) => T, initArg: U): React.RefObject<T>;
export function useLazyRef<T, U>(init: (arg?: U) => T, initArg?: U): React.RefObject<T> {
  const ref = useRef<T>(UNSET as any);
  if (ref.current === UNSET) {
    ref.current = init(initArg);
  }
  return ref;
}
