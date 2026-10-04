"use client";

import { Check, ArrowDown, Sparkles, Ghost, Wand2 } from "lucide-react";
import {
  ranks,
  formatPrice,
  getDiscount,
  type Rank,
} from "@/lib/store";

function RankCard({ rank }: { rank: Rank }) {
  const discount = getDiscount(rank);
  const accent = rank.accent;
  const isPurple = rank.theme === "purple";

  // Surface variables per theme (flat, no glow)
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
      className="m3-card m3-card-hover rounded-[28px] p-6 sm:p-7 flex flex-col gap-5"
      style={
        {
          "--accent": accent,
          background: surface,
          borderColor: outlineVariant,
        } as React.CSSProperties
      }
    >
      {/* Badge + tagline */}
      <div className="flex items-center justify-between gap-3">
        <h3
          className="text-xl font-bold"
          style={{ color: accent }}
        >
          {rank.name}
        </h3>
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
            {discount && rank.badge !== "-20%" ? ` · -${discount}%` : ""}
          </span>
        )}
      </div>

      <p className="text-sm leading-relaxed text-pretty" style={{ color: onSurfaceVariant }}>
        {rank.description}
      </p>

      {/* Price — NO strikethrough, plain small text for old price */}
      <div className="flex items-baseline gap-2">
        <span
          className="text-3xl font-extrabold font-mono"
          style={{ color: accent }}
        >
          {formatPrice(rank.price)}
        </span>
        {rank.originalPrice && (
          <span
            className="text-sm font-mono"
            style={{ color: onSurfaceVariant }}
          >
            was {formatPrice(rank.originalPrice)}
          </span>
        )}
      </div>
      {rank.live === false && (
        <p className="text-[11px] -mt-3" style={{ color: onSurfaceVariant }}>
          Coming soon to the Tip4Serv checkout below
        </p>
      )}

      {/* Perks */}
      <div
        className="rounded-2xl border p-4"
        style={{ background: surfaceLow, borderColor: outlineVariant }}
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

      {/* CTA */}
      <a href="#checkout" className="m3-btn m3-btn-filled w-full">
        {rank.live ? "Purchase" : "Get notified"}
        <ArrowDown className="w-4 h-4" />
      </a>
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
              Buy Halloween directly and you get every Sonic perk too.
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
