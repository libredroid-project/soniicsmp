"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Shared state for the optional Halloween overlay effects
 * (src/components/store/halloween-effects.tsx).
 * The toggle lives in the top app bar; the preference is persisted
 * per browser in localStorage. Effects default to OFF.
 */
interface HalloweenState {
  effectsOn: boolean;
  toggle: () => void;
}

export const useHalloweenStore = create<HalloweenState>()(
  persist(
    (set) => ({
      effectsOn: false,
      toggle: () => set((s) => ({ effectsOn: !s.effectsOn })),
    }),
    { name: "soniicsmp-halloween-effects" },
  ),
);

export function isHalloweenSeason(): boolean {
  return new Date().getMonth() === 9; // October
}
