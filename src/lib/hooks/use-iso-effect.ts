"use client";

import { useLayoutEffect } from "react";
import { NOOP } from "@/lib/empty";

/**
 * Runs a layout effect on the client and a no-op during server rendering
 * @returns `useLayoutEffect` on the client, or a no-op function on the server
 */
export const useIsoEffect: typeof useLayoutEffect =
  typeof document !== "undefined" ? useLayoutEffect : NOOP;
