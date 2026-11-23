"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Tilt: subtle 3D tilt that follows the cursor, like a card picked up
 * off the table. Max ~4 degrees; springs back on leave. Skipped
 * entirely for reduced-motion users and on touch devices.
 */
export function Tilt({
  children,
  className,
  max = 4,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transition = "transform 120ms ease-out";
    el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 500ms cubic-bezier(.2,.7,.25,1.2)";
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("will-change-transform motion-reduce:transform-none", className)}
    >
      {children}
    </div>
  );
}
