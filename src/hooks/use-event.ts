"use client";

import { useIsoEffect } from "./use-iso-effect";
import { useSyncRef } from "./use-sync-ref";

export function useEvent<K extends keyof WindowEventMap>(
  eventName: K,
  callback: (event: WindowEventMap[K]) => void,
  opts?: AddEventListenerOptions | null,
  element?: undefined,
): void;

export function useEvent<K extends keyof HTMLElementEventMap, T extends HTMLElement>(
  eventName: K,
  callback: (event: HTMLElementEventMap[K]) => void,
  opts?: AddEventListenerOptions | null,
  element?: React.RefObject<T | null>,
): void;

export function useEvent<K extends keyof DocumentEventMap>(
  eventName: K,
  callback: (event: DocumentEventMap[K]) => void,
  opts?: AddEventListenerOptions | null,
  element?: React.RefObject<Document | null>,
): void;

/**
 * Subscribes to a DOM event. The latest callback is always used.
 * @param eventName Event name on window, document, or an element.
 * @param callback Listener invoked for each event.
 * @param opts Options passed to `addEventListener`. Cleanup owns `signal`.
 * @param element Target ref. Omitted target is `window`. Empty ref skips subscribe.
 */
export function useEvent(
  eventName: string,
  callback: (event: Event) => void,
  opts?: AddEventListenerOptions | null,
  element?: React.RefObject<EventTarget | null>,
): void {
  const handler = useSyncRef(callback);
  const optsRef = useSyncRef(opts);

  useIsoEffect(() => {
    const target = element === undefined ? window : element.current;
    if (!target?.addEventListener) return;

    const ctrl = new AbortController();
    target.addEventListener(eventName, (event) => handler.current(event), {
      ...(optsRef.current ?? {}),
      signal: ctrl.signal,
    });

    return () => ctrl.abort();
  }, [eventName, element]);
}
