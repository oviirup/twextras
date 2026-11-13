"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSyncRef } from "./use-sync-ref";

export type UseCopyState = "ready" | "success" | "error";
export type UseCopyText = string | (() => string);
export type UseCopyOptions = {
  timeout?: number; // in milliseconds
  onSuccess?: (text: string) => void;
  onError?: (error: Error) => void;
};
export type UseCopyResult = {
  state: UseCopyState;
  copy: (text: UseCopyText) => Promise<void>;
};

/**
 * Copies text to the clipboard and tracks ready, success, and error states.
 * @param options Callbacks and reset timeout for the copy cycle.
 * @returns The current copy state and a function that writes text to the clipboard.
 */
export function useCopy({
  onSuccess,
  onError,
  timeout = 2000,
}: UseCopyOptions = {}): UseCopyResult {
  const [state, setState] = useState<UseCopyState>("ready");
  const timer = useRef<ReturnType<typeof setTimeout>>(null);
  const options = useSyncRef({ onSuccess, onError, timeout });

  useEffect(() => {
    return () => {
      timer.current && clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(async (text: UseCopyText) => {
    if (timer.current) clearTimeout(timer.current);
    try {
      if (!navigator?.clipboard?.writeText) {
        throw new Error("Clipboard API is not available");
      }
      const content = typeof text === "function" ? text() : text;
      await navigator.clipboard.writeText(content);
      setState("success");
      options.current.onSuccess?.(content);
    } catch (error) {
      setState("error");
      options.current.onError?.(error instanceof Error ? error : new Error(String(error)));
    } finally {
      timer.current = setTimeout(() => setState("ready"), options.current.timeout);
    }
  }, []);

  return { state, copy };
}

export namespace useCopy {
  export type State = UseCopyState;
  export type Text = UseCopyText;
  export type Options = UseCopyOptions;
  export type Result = UseCopyResult;
}
