"use client";

import { useEffect, useRef, useState } from "react";
import { useHalloweenStore, isHalloweenSeason } from "@/lib/halloween-store";

/**
 * Halloween overlay effects (on by default in October, toggle in top bar):
 *  1. Drifting ghosts floating up across the page (pure CSS loop).
 *  2. Glowing jack-o'-lanterns rising slowly.
 *  3. Bats flapping across the screen.
 *  4. Spiders dangling from the top on threads.
 *  5. An orange/purple ambient color tint.
 *  6. A ghost that chases the mouse cursor (rAF lerp follow).
 *
 * Disabled for users who prefer reduced motion / have no fine pointer.
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

function PumpkinSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M15.2 6.5 C15.4 4.2 16.6 3 18.2 3.2 C17.8 4.4 17.6 5.4 17.6 6.8 Z" fill="#7A4A21" />
      <ellipse cx="16" cy="19" rx="11.5" ry="9.5" fill="#FF6B00" />
      <ellipse cx="9.8" cy="19" rx="5" ry="8.6" fill="#E85D00" opacity="0.75" />
      <ellipse cx="22.2" cy="19" rx="5" ry="8.6" fill="#E85D00" opacity="0.75" />
      <g fill="#FFD75E" style={{ filter: "drop-shadow(0 0 3px rgba(255,215,94,0.9))" }}>
        <path d="M10.6 18.4 L14.2 18.4 L12.4 15.2 Z" />
        <path d="M17.8 18.4 L21.4 18.4 L19.6 15.2 Z" />
        <path d="M10.8 21.6 L12.8 20.2 L14.6 22 L16.4 20.2 L18.2 22 L20 20.4 L19.2 23.4 L11.8 23.4 Z" />
      </g>
    </svg>
  );
}

function BatSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden>
      <ellipse cx="16" cy="17" rx="2.6" ry="4.6" />
      <circle cx="16" cy="11.4" r="2.8" />
      <path d="M13.8 9.8 L12.8 6.2 L15.4 8.2 Z" />
      <path d="M18.2 9.8 L19.2 6.2 L16.6 8.2 Z" />
      <path d="M13.4 14.5 C9.5 9.5 4.5 10.5 1.5 15.5 C4.8 14 6.2 15.5 5.8 18.5 C8.4 16.5 10.4 17.5 11.4 20 C12.4 18 13.2 16.8 13.8 16.2 Z" />
      <path d="M18.6 14.5 C22.5 9.5 27.5 10.5 30.5 15.5 C27.2 14 25.8 15.5 26.2 18.5 C23.6 16.5 21.6 17.5 20.6 20 C19.6 18 18.8 16.8 18.2 16.2 Z" />
    </svg>
  );
}

function SpiderSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none">
        <path d="M12 16 C8 13 5 13 3 15" />
        <path d="M12 18 C8 18 5 19 3.5 21" />
        <path d="M20 16 C24 13 27 13 29 15" />
        <path d="M20 18 C24 18 27 19 28.5 21" />
        <path d="M13.5 20 C11.5 23 10.5 25 10.5 27.5" />
        <path d="M18.5 20 C20.5 23 21.5 25 21.5 27.5" />
      </g>
      <circle cx="16" cy="21.5" r="5.2" fill="currentColor" />
      <circle cx="16" cy="14.8" r="3.4" fill="currentColor" />
      <circle cx="14.9" cy="14.2" r="0.8" fill="#FF6B00" />
      <circle cx="17.1" cy="14.2" r="0.8" fill="#FF6B00" />
    </svg>
  );
}

// Deterministic configs (no Math.random — keeps renders stable)
const DRIFTING_GHOSTS = [
  { left: "6%", size: 26, duration: 34, delay: 0, opacity: 0.14, drift: 70, tint: "#E8EAED" },
  { left: "18%", size: 40, duration: 44, delay: 9, opacity: 0.1, drift: -50, tint: "#FFB367" },
  { left: "31%", size: 22, duration: 30, delay: 17, opacity: 0.18, drift: 90, tint: "#E8EAED" },
  { left: "47%", size: 34, duration: 40, delay: 4, opacity: 0.12, drift: -80, tint: "#C9A5F5" },
  { left: "63%", size: 24, duration: 32, delay: 22, opacity: 0.16, drift: 60, tint: "#E8EAED" },
  { left: "78%", size: 44, duration: 48, delay: 12, opacity: 0.09, drift: -60, tint: "#E8EAED" },
  { left: "91%", size: 28, duration: 36, delay: 27, opacity: 0.15, drift: 80, tint: "#FFB367" },
];

const PUMPKINS = [
  { left: "10%", size: 34, duration: 30, delay: 2, opacity: 0.55, drift: 60 },
  { left: "26%", size: 26, duration: 38, delay: 14, opacity: 0.45, drift: -40 },
  { left: "52%", size: 38, duration: 34, delay: 7, opacity: 0.5, drift: 70 },
  { left: "69%", size: 24, duration: 42, delay: 20, opacity: 0.4, drift: -60 },
  { left: "86%", size: 30, duration: 28, delay: 11, opacity: 0.55, drift: 50 },
];

const BATS = [
  { top: "9%", size: 26, duration: 21, delay: 0, opacity: 0.5 },
  { top: "16%", size: 20, duration: 26, delay: 8, opacity: 0.4 },
  { top: "26%", size: 30, duration: 18, delay: 15, opacity: 0.55 },
  { top: "38%", size: 22, duration: 24, delay: 23, opacity: 0.45 },
];

const SPIDERS = [
  { left: "23%", thread: 96, size: 26, duration: 3.8, delay: 0 },
  { left: "74%", thread: 64, size: 22, duration: 4.6, delay: 1.2 },
];

export function HalloweenEffects() {
  const effectsOn = useHalloweenStore((s) => s.effectsOn);
  const [seasonOk, setSeasonOk] = useState(false);
  const chaserRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isHalloweenSeason() || reducedMotion) return;
    setSeasonOk(true);
  }, []);

  const enabled = seasonOk && effectsOn;

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
      {/* Ambient orange/purple color tint */}
      <div className="hween-tint" aria-hidden />

      {/* Everything floating: ghosts, pumpkins, bats, spiders */}
      <div className="hween-layer" aria-hidden>
        {DRIFTING_GHOSTS.map((g, i) => (
          <div
            key={`g${i}`}
            className="hween-ghost"
            style={
              {
                left: g.left,
                width: g.size,
                color: g.tint,
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

        {PUMPKINS.map((p, i) => (
          <div
            key={`p${i}`}
            className="hween-pumpkin"
            style={
              {
                left: p.left,
                width: p.size,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                "--p-o": p.opacity,
                "--p-d": `${p.drift}px`,
              } as React.CSSProperties
            }
          >
            <PumpkinSvg className="w-full h-auto" />
          </div>
        ))}

        {BATS.map((b, i) => (
          <div
            key={`b${i}`}
            className="hween-bat"
            style={
              {
                top: b.top,
                width: b.size,
                animationDuration: `${b.duration}s`,
                animationDelay: `${b.delay}s`,
                "--b-o": b.opacity,
              } as React.CSSProperties
            }
          >
            <div className="hween-bat-inner">
              <BatSvg className="w-full h-auto" />
            </div>
          </div>
        ))}

        {SPIDERS.map((s, i) => (
          <div
            key={`s${i}`}
            className="hween-spider"
            style={
              {
                left: s.left,
                animationDuration: `${s.duration}s`,
                animationDelay: `${s.delay}s`,
              } as React.CSSProperties
            }
          >
            <div className="hween-thread" style={{ height: s.thread }} />
            <div style={{ width: s.size }}>
              <SpiderSvg className="w-full h-auto" />
            </div>
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
