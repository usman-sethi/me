"use client";

import { useSyncExternalStore } from "react";

/**
 * Implemented with useSyncExternalStore instead of useState+useEffect: the
 * media query list IS the external system being subscribed to, which is
 * exactly what useSyncExternalStore is for, and it avoids the extra
 * render pass that `setMatches(...)` inside an effect would cause.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onChange);
      return () => mediaQueryList.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    // Server has no viewport/pointer to query — default to false and let
    // the client snapshot correct it before paint.
    () => false,
  );
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Coarse pointer (touch) — used to disable desktop-only cursor effects. */
export function useIsTouchDevice() {
  return useMediaQuery("(pointer: coarse)");
}
