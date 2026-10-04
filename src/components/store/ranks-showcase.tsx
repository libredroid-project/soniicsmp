"use client";

import { Check, ArrowDown, Ghost, Wand2 } from "lucide-react";
import {
  ranks,
  formatPrice,
  getDiscount,
  type Rank,
} from "@/lib/store";

/**
 * Rank Showdown — a completely new, never-seen rank presentation.
 *
 * Instead of a grid of simple cards, this is ONE unified panel split
 * diagonally (desktop) / stacked (mobile) into two "paths":
 *   PATH 01 = Sonic Rank (blue)
 *   PATH 02 = Halloween Rank (dark purple)
 * A central gradient seam with a node sits where the two paths meet.
 */
function PathHalf({ rank, side }: { rank: Rank; side: "left" | "right" }) {
  const accent = rank.accent;
  const isPurple = rank.theme === "purple";
  const discount = getDiscount(rank);

  const surfaceBg = isPurple
    ? "var(--md-purple-container)"
    : "linear-gradient(135deg, rgba(68,152,219,0.10), transparent 70%)";
  const surfaceLow = isPurple
    ? "var(--md-purple-surface)"
    : "var(--md-surface-container-low)";
  const onVariant = isPurple
    ? "var(--md-purple-on-surface)"
    : "var(--md-on-surface-variant)";
  const outlineVar = isPurple
    ? "var(--md-purple-outline-variant)"
    : "var(--md-outline-variant)";

  // Pick the 4 most distinctive perks for the showdown view
  const showcasePerks = rank.perks.slice(0, 5);

  return (
    <div
      className="flex flex-col gap-4 p-7 sm:p-9 flex-1 relative"
      style={{ background: surfaceBg }}
    >
      {/* Tier label */}
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-[10px] tracking-[0.25em] uppercase"
          style={{ color: onVariant }}
        >
          Path {side === "left" ? "01" : "02"}
        </span>
        {rank.badge && (
          <span
            className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
            style={{
              background: `${accent}1f`,
              color: accent,
              border: `1px solid ${accent}55`,
            }}
          >
            {rank.badge}
            {rank.badge === "-20%" && " OFF"}
            {discount && rank.badge !== "-20%" ? ` · ${discount}% off` : ""}
          </span>
        )}
      </div>

      {/* Rank name — large */}
      <h3
        className="text-3xl sm:text-4xl font-extrabold leading-tight"
        style={{ color: accent }}
      >
        {rank.name}
      </h3>

      <p
        className="text-sm leading-relaxed text-pretty"
        style={{ color: onVariant }}
      >
        {rank.description}
      </p>

      {/* Price block */}
      <div className="flex items-baseline gap-2">
        <span
          className="text-3xl font-extrabold font-mono"
          style={{ color: accent }}
        >
          {formatPrice(rank.price)}
        </span>
        {rank.originalPrice && (
          <span className="text-sm font-mono" style={{ color: onVariant }}>
            was {formatPrice(rank.originalPrice)}
          </span>
        )}
      </div>
      {rank.live === false && (
        <p className="text-[11px] -mt-2" style={{ color: onVariant }}>
          Coming soon to the Tip4Serv checkout
        </p>
      )}

      {/* Showcase perks */}
      <ul
        className="flex flex-col gap-1.5 border-t pt-3"
        style={{ borderColor: outlineVar }}
      >
        {showcasePerks.map((p, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-[var(--md-on-surface)]"
          >
            <Check
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              style={{ color: accent }}
            />
            <span className="leading-relaxed">{p}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#checkout"
        className="m3-btn m3-btn-filled w-full mt-auto"
        style={
          rank.live
            ? undefined
            : { background: surfaceLow, color: accent, border: `1px solid ${accent}55` }
        }
      >
        {rank.live ? "Purchase" : "Get notified"}
        <ArrowDown className="w-4 h-4" />
      </a>
    </div>
  );
}

export function RanksShowcase() {
  const [sonic, halloween] = ranks;

  return (
    <section id="ranks" className="py-12 lg:py-20 scroll-mt-20">
      <div className="container-m3">
        <header className="max-w-2xl mx-auto text-center mb-10 lg:mb-12">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase font-semibold text-[var(--brand)]">
            Choose your path
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-medium tracking-tight text-balance">
            Two ranks. One decision.
          </h2>
          <p className="mt-3 text-[var(--md-on-surface-variant)] text-pretty">
            Pay once, keep it forever. The flagship{" "}
            <strong className="text-[var(--md-on-surface)]">Sonic Rank</strong>{" "}
            is live now. The limited{" "}
            <strong className="text-[var(--md-on-surface)]">Halloween Rank</strong>{" "}
            drops for October and includes everything in Sonic.
          </p>
        </header>

        {/* The Showdown panel — one unified panel, diagonally split on desktop */}
        <div
          className="m3-card rounded-[28px] overflow-hidden relative"
          style={{ minHeight: "480px" }}
        >
          {/* Desktop: diagonal split via two absolutely-positioned halves */}
          <div className="hidden md:grid grid-cols-2 absolute inset-0">
            <div
              className="absolute inset-y-0 left-0"
              style={{
                width: "100%",
                clipPath: "polygon(0 0, 56% 0, 44% 100%, 0 100%)",
                background:
                  "linear-gradient(135deg, rgba(68,152,219,0.12), rgba(68,152,219,0.04) 70%)",
              }}
            />
            <div
              className="absolute inset-y-0 right-0"
              style={{
                width: "100%",
                clipPath: "polygon(56% 0, 100% 0, 100% 100%, 44% 100%)",
                background: "var(--md-purple-container)",
              }}
            />
          </div>

          {/* The seam — a thin diagonal gradient line + center node */}
          <div
            aria-hidden
            className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2"
            style={{ width: "2px" }}
          >
            <div
              className="w-full h-full"
              style={{
                background: "linear-gradient(to bottom, #4498DB, #5FE2C5, #FF6B00, #9C5FE2)",
                transform: "skewX(-8deg)",
              }}
            />
          </div>
          <div
            aria-hidden
            className="hidden md:grid absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 place-items-center w-12 h-12 rounded-full"
            style={{
              background: "var(--md-surface)",
              border: "1px solid var(--md-outline-variant)",
              boxShadow: "var(--elev-1)",
            }}
          >
            <span className="font-mono text-xs font-bold text-[var(--brand)]">+</span>
          </div>

          {/* Content halves (in normal flow, above the background) */}
          <div className="relative grid md:grid-cols-2">
            <div className="md:pr-[18%]">
              <PathHalf rank={sonic} side="left" />
            </div>
            <div className="md:pl-[18%] md:border-l border-t md:border-t-0 border-[var(--md-outline-variant)]">
              <PathHalf rank={halloween} side="right" />
            </div>
          </div>
        </div>

        {/* Footer notes */}
        <div className="mt-5 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 justify-between text-sm">
          <div className="flex items-center gap-3">
            <span
              className="grid place-items-center w-8 h-8 rounded-lg"
              style={{ background: "#FF6B001f", color: "#FF6B00" }}
            >
              <Ghost className="w-4 h-4" />
            </span>
            <p className="text-[var(--md-on-surface-variant)]">
              <strong className="text-[var(--md-on-surface)]">Halloween includes Sonic.</strong>{" "}
              Buy Halloween directly, get every Sonic perk too.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="grid place-items-center w-8 h-8 rounded-lg"
              style={{ background: "#9C5FE21f", color: "#9C5FE2" }}
            >
              <Wand2 className="w-4 h-4" />
            </span>
            <p className="text-[var(--md-on-surface-variant)]">
              <strong className="text-[var(--md-on-surface)]">Non pay-to-win.</strong>{" "}
              Convenience &amp; cosmetics only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
