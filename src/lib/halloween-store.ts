"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Shared state for the Halloween overlay effects
 * (src/components/store/halloween-effects.tsx).
 * ON by default during the season — the top bar ghost button toggles
 * them off/on; the preference is persisted per browser in localStorage.
 */
interface HalloweenState {
  effectsOn: boolean;
  toggle: () => void;
}

export const useHalloweenStore = create<HalloweenState>()(
  persist(
    (set) => ({
      effectsOn: true,
      toggle: () => set((s) => ({ effectsOn: !s.effectsOn })),
    }),
    { name: "soniicsmp-halloween-effects" },
  ),
);

export function isHalloweenSeason(): boolean {
  return new Date().getMonth() === 9; // October
}
