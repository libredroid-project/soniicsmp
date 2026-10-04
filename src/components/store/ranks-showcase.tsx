"use client";

import {
  Check,
  ArrowDown,
  Sparkles,
  Ghost,
  Wand2,
} from "lucide-react";
import {
  ranks,
  formatPrice,
  getDiscount,
  type Rank,
} from "@/lib/store";

/** Big 3D-style rank "logo" rendered in CSS, matching the screenshot vibe. */
function RankLogo({ rank }: { rank: Rank }) {
  const words = rank.name.split(" ");
  const accent = rank.accent;
  const accent2 = rank.accent2 ?? rank.accent;
  return (
    <div
      className="select-none font-extrabold tracking-tight leading-none"
      style={{
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
        letterSpacing: "-0.02em",
      }}
      aria-hidden
    >
      {words.map((w, wi) => (
        <div key={wi} className="flex justify-center">
          {w.split("").map((ch, ci) => {
            const t = words.length === 1
              ? ci / Math.max(1, w.length - 1)
              : wi / Math.max(1, words.length - 1);
            // Interpolate between accent and accent2 for a gradient across the word
            const lerpColor = mix(accent, accent2, t);
            return (
              <span
                key={ci}
                className="inline-block"
                style={{
                  color: lerpColor,
                  textShadow: `
                    1px 1px 0 ${accent2},
                    2px 2px 0 ${accent2}aa,
                    3px 3px 6px rgba(0,0,0,0.6)
                  `,
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function mix(c1: string, c2: string, t: number): string {
  const p = (h: string) => {
    const m = h.replace("#", "");
    const v = m.length === 3
      ? m.split("").map((x) => x + x).join("")
      : m;
    return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
  };
  const a = p(c1);
  const b = p(c2);
  const r = (i: number) => Math.round(a[i] + (b[i] - a[i]) * t);
  return `rgb(${r(0)}, ${r(1)}, ${r(2)})`;
}

function RankCard({ rank }: { rank: Rank }) {
  const discount = getDiscount(rank);
  const accent = rank.accent;
  const accent2 = rank.accent2 ?? rank.accent;
  const isPurple = rank.theme === "purple";

  // Surface variables per theme
  const surface = isPurple
    ? "var(--md-purple-container)"
    : "var(--md-surface-container)";
  const surfaceLow = isPurple
    ? "var(--md-purple-surface)"
    : "var(--md-surface-container-low)";
  const onSurfaceVariant = isPurple
    ? "var(--md-purple-on-surface)"
    : "var(--md-on-surface-variant)";
  const outlineVariant = isPurple
    ? "var(--md-purple-outline-variant)"
    : "var(--md-outline-variant)";

  return (
    <article
      className="m3-card m3-card-hover rounded-[28px] p-6 sm:p-7 flex flex-col gap-5 relative overflow-hidden"
      style={
        {
          "--accent": accent,
          "--accent2": accent2,
          background: surface,
          borderColor: outlineVariant,
        } as React.CSSProperties
      }
    >
      <div className="relative flex flex-col gap-4">
        {/* Badge */}
        {rank.badge && (
          <div className="flex justify-center">
            <span
              className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full"
              style={{
                background: `${accent}26`,
                color: accent,
                boxShadow: `inset 0 0 0 1px ${accent}55`,
              }}
            >
              {rank.badge}
              {rank.badge === "-20%" && " OFF"}
              {discount && rank.badge !== "-20%" ? ` · -${discount}%` : ""}
            </span>
          </div>
        )}

        {/* Rank logo */}
        <div className="flex justify-center py-2">
          <RankLogo rank={rank} />
        </div>

        {/* Tagline + description */}
        <div className="text-center">
          <p className="text-sm font-semibold" style={{ color: accent }}>
            {rank.tagline}
          </p>
          <p
            className="mt-1.5 text-sm leading-relaxed text-pretty"
            style={{ color: onSurfaceVariant }}
          >
            {rank.description}
          </p>
        </div>

        {/* Price block */}
        <div className="flex items-end justify-center gap-2.5 py-1">
          {rank.originalPrice && (
            <span
              className="text-lg line-through font-mono"
              style={{ color: onSurfaceVariant }}
            >
              {formatPrice(rank.originalPrice)}
            </span>
          )}
          <span
            className="text-4xl font-extrabold font-mono"
            style={{ color: accent }}
          >
            {formatPrice(rank.price)}
          </span>
        </div>
        {rank.live === false && (
          <p
            className="text-center text-[11px] -mt-3"
            style={{ color: onSurfaceVariant }}
          >
            Coming soon to the Tip4Serv checkout below
          </p>
        )}

        {/* Perks */}
        <div
          className="rounded-2xl border p-4"
          style={{
            background: surfaceLow,
            borderColor: outlineVariant,
          }}
        >
          <p
            className="text-[10px] uppercase tracking-wider font-semibold mb-2.5"
            style={{ color: onSurfaceVariant }}
          >
            What&apos;s included
          </p>
          <ul className="flex flex-col gap-2 max-h-56 overflow-y-auto scrollbar-mc pr-1">
            {rank.perks.map((p, i) => (
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
        </div>

        {/* CTA: scroll to the checkout form */}
        <a href="#checkout" className="m3-btn m3-btn-filled w-full">
          {rank.live ? "Purchase" : "Get notified"}
          <ArrowDown className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}

export function RanksShowcase() {
  return (
    <section id="ranks" className="py-12 lg:py-20 scroll-mt-20">
      <div className="container-m3">
        <header className="max-w-2xl mx-auto text-center mb-10 lg:mb-12">
          <span className="text-xs uppercase tracking-wider font-semibold text-[var(--brand)] inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            SoniicSMP ranks
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-medium tracking-tight text-balance">
            Two ranks. Zero subscriptions.
          </h2>
          <p className="mt-3 text-[var(--md-on-surface-variant)] text-pretty">
            Pay once, keep it forever. The flagship{" "}
            <strong className="text-[var(--md-on-surface)]">Sonic Rank</strong>{" "}
            is live now, and the limited{" "}
            <strong className="text-[var(--md-on-surface)]">Halloween Rank</strong>{" "}
            drops for October.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {ranks.map((r) => (
            <RankCard key={r.id} rank={r} />
          ))}
        </div>

        {/* Quick comparison strip */}
        <div className="mt-6 max-w-4xl mx-auto m3-card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-3 text-sm">
            <span
              className="grid place-items-center w-9 h-9 rounded-xl"
              style={{ background: "#FF6B001f", color: "#FF6B00" }}
            >
              <Ghost className="w-5 h-5" />
            </span>
            <p className="text-[var(--md-on-surface-variant)]">
              <strong className="text-[var(--md-on-surface)]">Halloween includes Sonic.</strong>{" "}
              Buy Halloween directly and you get every Sonic perk too — no need
              to buy both.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span
              className="grid place-items-center w-9 h-9 rounded-xl"
              style={{ background: "#9C5FE21f", color: "#9C5FE2" }}
            >
              <Wand2 className="w-5 h-5" />
            </span>
            <p className="text-[var(--md-on-surface-variant)]">
              <strong className="text-[var(--md-on-surface)]">Non pay-to-win.</strong>{" "}
              All perks are convenience &amp; cosmetics only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
