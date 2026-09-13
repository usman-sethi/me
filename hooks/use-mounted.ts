"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  // Mount state never changes after the initial commit, so there is
  // nothing to subscribe to — this hook only exists to distinguish the
  // server-rendered pass from the first client render.
  return () => {};
}

/**
 * Returns true only once the component has hydrated on the client.
 * Implemented with useSyncExternalStore (server snapshot: false, client
 * snapshot: true) rather than `useState` + `useEffect(() => setTrue())`,
 * which the current react-hooks lint rules flag as an unnecessary render
 * cascade — see https://react.dev/learn/you-might-not-need-an-effect.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
