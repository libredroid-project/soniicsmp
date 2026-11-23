"use client";

import * as React from "react";
import Lenis from "lenis";

/**
 * Buttery slow smooth scrolling (Lenis) for the whole page.
 * - lerp 0.08: long, gentle glide on every wheel tick
 * - anchors: nav links (#ranks, #faq...) glide too, offset for the fixed header
 * - disabled entirely when the user prefers reduced motion
 */
export function SmoothScroll() {
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      anchors: { offset: -96 },
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
