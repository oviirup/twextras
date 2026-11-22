"use client";

import { toPascalCase } from "@oviirup/utils/string";
import { createContext, use } from "react";

type BaseContextOptions<T> = {
  name: string;
  initial?: T | null | undefined;
  error?: string;
};

/**
 * Creates a typed React context with a provider-safe consumer hook.
 * @param options.name Context name (required)
 * @param options.initial initial value
 * @param options.error custom error message
 * @returns A `[Context, useContext]` tuple.
 */
export function createBaseContext<T>(options: BaseContextOptions<T>) {
  const name = toPascalCase(options.name);
  const Context = createContext<T | null>(options.initial ?? null);
  Context.displayName = name;

  // biome-ignore lint/correctness/noComponentHookFactories: context factory pattern
  function useBaseContext() {
    const value = use(Context);
    if (value === null) {
      throw new Error(options.error ?? `use${name} must be used within its provider`);
    }
    return value;
  }

  return [Context, useBaseContext] as const;
}
