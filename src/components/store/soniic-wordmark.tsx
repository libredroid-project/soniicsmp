"use client";

import { cn } from "@/lib/utils";

// Minecraft color codes from the user, mapped per-letter of "SoniicSMP":
// S=#4498DB o=#52BDD0 n=#5FE2C5 i=#30F19F i=#00FF79 c=#77924F
// S=#EE2525 M=#F03535 P=#F24545
const LETTERS: { ch: string; color: string }[] = [
  { ch: "S", color: "#4498DB" },
  { ch: "o", color: "#52BDD0" },
  { ch: "n", color: "#5FE2C5" },
  { ch: "i", color: "#30F19F" },
  { ch: "i", color: "#00FF79" },
  { ch: "c", color: "#77924F" },
  { ch: "S", color: "#EE2525" },
  { ch: "M", color: "#F03535" },
  { ch: "P", color: "#F24545" },
];

interface Props {
  className?: string;
  as?: "h1" | "h2" | "span" | "div";
  glow?: boolean;
}

/**
 * SoniicSMP wordmark — each letter rendered in its Minecraft color
 * with a soft text-shadow glow. Purely decorative, no images.
 */
export function SoniicWordmark({ className, as = "span", glow = true }: Props) {
  const Tag = as as "h1";
  return (
    <Tag
      className={cn("mc-wordmark inline-flex items-baseline", className)}
      aria-label="SoniicSMP"
    >
      {LETTERS.map((l, i) => (
        <span
          key={i}
          style={{
            color: l.color,
          }}
        >
          {l.ch}
        </span>
      ))}
    </Tag>
  );
}
