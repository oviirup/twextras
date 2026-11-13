import { useMediaQuery } from "./use-media-query";

/**
 * Reports whether the viewport is at or below the mobile breakpoint.
 * @returns `true` when the viewport width is at most `40rem`.
 */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 40rem)");
}
