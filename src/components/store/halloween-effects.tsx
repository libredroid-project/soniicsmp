"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Halloween overlay effects:
 *  1. Drifting ghosts floating up across the whole page (pure CSS loop).
 *  2. A ghost that chases the mouse cursor (rAF lerp follow).
 *
 * Only rendered during October (Halloween season) and disabled for
 * users who prefer reduced motion / have no fine pointer (touch).
 */

function GhostSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden>
      <path d="M6 30 V14 a10 10 0 0 1 20 0 V30 l-4 -2.8 -4 2.8 -4 -2.8 -4 2.8 -4 -2.8 Z" />
      <circle cx="12.2" cy="15" r="2.1" fill="var(--md-surface)" />
      <circle cx="19.8" cy="15" r="2.1" fill="var(--md-surface)" />
    </svg>
  );
}

// Deterministic configs (no Math.random — keeps renders stable)
const DRIFTING_GHOSTS = [
  { left: "6%", size: 26, duration: 34, delay: 0, opacity: 0.14, drift: 70 },
  { left: "18%", size: 40, duration: 44, delay: 9, opacity: 0.1, drift: -50 },
  { left: "31%", size: 22, duration: 30, delay: 17, opacity: 0.18, drift: 90 },
  { left: "47%", size: 34, duration: 40, delay: 4, opacity: 0.12, drift: -80 },
  { left: "63%", size: 24, duration: 32, delay: 22, opacity: 0.16, drift: 60 },
  { left: "78%", size: 44, duration: 48, delay: 12, opacity: 0.09, drift: -60 },
  { left: "91%", size: 28, duration: 36, delay: 27, opacity: 0.15, drift: 80 },
];

function isHalloweenSeason(): boolean {
  return new Date().getMonth() === 9; // October
}

export function HalloweenEffects() {
  const [enabled, setEnabled] = useState(false);
  const chaserRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isHalloweenSeason() || reducedMotion) return;
    setEnabled(true);
  }, []);

  // Ghost chasing the cursor
  useEffect(() => {
    if (!enabled) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const el = chaserRef.current;
    if (!el) return;

    const pos = { x: -120, y: -120 };
    const target = { x: -120, y: -120 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (el.style.opacity === "0") el.style.opacity = "";
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.075;
      pos.y += (target.y - pos.y) * 0.075;
      const dx = target.x - pos.x;
      // Face travel direction; tilt slightly into the movement
      const flip = dx < -2 ? -1 : 1;
      const tilt = Math.max(-12, Math.min(12, dx * 0.15));
      el.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) rotate(${tilt}deg) scaleX(${flip})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Drifting ghosts — behind content interactions, above the page bg */}
      <div className="hween-layer" aria-hidden>
        {DRIFTING_GHOSTS.map((g, i) => (
          <div
            key={i}
            className="hween-ghost"
            style={
              {
                left: g.left,
                width: g.size,
                animationDuration: `${g.duration}s`,
                animationDelay: `${g.delay}s`,
                "--g-o": g.opacity,
                "--g-d": `${g.drift}px`,
              } as React.CSSProperties
            }
          >
            <GhostSvg className="w-full h-auto" />
          </div>
        ))}
      </div>

      {/* Cursor-chasing ghost */}
      <div ref={chaserRef} className="hween-chaser" style={{ opacity: 0 }} aria-hidden>
        <div className="hween-chaser-bob">
          <GhostSvg className="w-full h-auto" />
        </div>
      </div>
    </>
  );
}
