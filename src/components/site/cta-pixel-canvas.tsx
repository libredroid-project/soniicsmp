"use client";

import * as React from "react";

/**
 * Monochrome pixel-field canvas for the CTA box, a quiet nod to both
 * aesthetic.pub's shader background and Minecraft's pixel grid.
 * Sparse white cells flicker on a ~10px grid, redrawn a few times a second.
 */
export function CtaPixelCanvas({ className }: { className?: string }) {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = -10_000;

    const draw = (step: number) => {
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (w === 0 || h === 0) return;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      ctx.clearRect(0, 0, w, h);
      const cell = 10 * dpr;
      const gap = Math.max(1, Math.round(dpr));
      const cols = Math.ceil(w / cell);
      const rows = Math.ceil(h / cell);
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const s =
            Math.sin(x * 12.9898 + y * 78.233 + step * 0.617) * 43758.5453;
          const r = s - Math.floor(s);
          if (r > 0.93) {
            const a = 0.018 + (r - 0.93) * 0.5;
            ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
            ctx.fillRect(x * cell, y * cell, cell - gap, cell - gap);
          }
        }
      }
    };

    const loop = (t: number) => {
      if (t - last > 240) {
        draw(Math.floor(t / 240));
        last = t;
      }
      raf = requestAnimationFrame(loop);
    };

    draw(0);
    if (!reduced) raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
