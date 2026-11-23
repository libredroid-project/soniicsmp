import * as React from "react";
import { WORDMARK } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * The SoniicSMP wordmark, in the original store's rainbow-per-letter
 * colors (carried over 1:1 from sonic.kodanetwork.xyz).
 */
export function Wordmark({
  className,
  as: Tag = "span",
}: {
  className?: string;
  as?: "span" | "h1" | "a";
}) {
  return (
    <Tag
      aria-label="SoniicSMP"
      className={cn(
        "inline-flex items-baseline font-heading font-semibold tracking-tight text-foreground",
        className
      )}
    >
      {WORDMARK.map((letter, i) => (
        <span key={i} style={{ color: letter.color }}>
          {letter.ch}
        </span>
      ))}
    </Tag>
  );
}

/**
 * Renders a string with every "SoniicSMP" occurrence shown in the
 * brand's rainbow letter colors, so the name keeps its identity
 * everywhere it appears on the page.
 */
export function BrandText({ children }: { children: string }) {
  const parts = children.split("SoniicSMP");
  if (parts.length === 1) return <>{children}</>;
  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && <Wordmark />}
        </React.Fragment>
      ))}
    </>
  );
}
