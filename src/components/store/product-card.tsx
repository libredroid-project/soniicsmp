"use client";

import * as Icons from "lucide-react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import {
  type Product,
  type Category,
  formatPrice,
  tip4servUrl,
} from "@/lib/store";

const BADGE_STYLES: Record<
  NonNullable<Product["badge"]>,
  { bg: string; color: string; label: string }
> = {
  POPULAR: { bg: "rgba(0,255,121,0.15)", color: "#00FF79", label: "POPULAR" },
  "BEST VALUE": { bg: "rgba(95,226,197,0.15)", color: "#5FE2C5", label: "BEST VALUE" },
  NEW: { bg: "rgba(68,152,219,0.15)", color: "#4498DB", label: "NEW" },
  LIMITED: { bg: "rgba(238,37,37,0.15)", color: "#EE2525", label: "LIMITED" },
};

export function ProductCard({
  product,
  category,
}: {
  product: Product;
  category: Category;
}) {
  const Icon =
    (Icons as unknown as Record<string, Icons.LucideIcon>)[category.icon] ??
    Icons.Box;
  const badge = product.badge ? BADGE_STYLES[product.badge] : null;
  const accent = product.accent;

  return (
    <article
      className="m3-card m3-card-hover rounded-2xl p-5 flex flex-col gap-4 relative"
      style={
        {
          "--accent": accent,
        } as React.CSSProperties
      }
    >
      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between gap-3">
        <span
          className="grid place-items-center w-12 h-12 rounded-xl flex-shrink-0"
          style={{
            background: `${accent}1f`,
            color: accent,
            boxShadow: `0 0 24px ${accent}22, inset 0 0 0 1px ${accent}55`,
          }}
        >
          <Icon className="w-6 h-6" />
        </span>
        {badge && (
          <span
            className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full"
            style={{ background: badge.bg, color: badge.color }}
          >
            {badge.label}
          </span>
        )}
      </div>

      {/* Name + tagline */}
      <div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <h3
            className="text-lg font-bold leading-tight"
            style={{ color: accent }}
          >
            {product.name}
          </h3>
          {product.quantity && (
            <span className="text-xs font-mono text-[var(--md-on-surface-variant)] bg-[var(--md-surface-container-high)] px-2 py-0.5 rounded-full">
              {product.quantity}
            </span>
          )}
        </div>
        <p className="text-sm font-medium text-[var(--md-on-surface)] mt-0.5">
          {product.tagline}
        </p>
        <p className="text-xs text-[var(--md-on-surface-variant)] mt-1.5 leading-relaxed text-pretty">
          {product.description}
        </p>
      </div>

      {/* Perks */}
      <div className="flex-1 min-h-0">
        <div className="max-h-44 overflow-y-auto scrollbar-mc pr-1 flex flex-col gap-1.5">
          {product.perks.map((p, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-[var(--md-on-surface-variant)]">
              <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: accent }} />
              <span className="leading-relaxed">{p}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price + CTA */}
      <div className="pt-3 border-t border-[var(--md-outline-variant)] flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--md-on-surface-variant)]">
            Price
          </div>
          <div className="text-xl font-bold text-[var(--md-on-surface)]">
            {formatPrice(product.price)}
          </div>
        </div>
        <a
          href={tip4servUrl(product)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Purchase ${product.name} on Tip4Serv`}
          className="m3-btn m3-btn-filled"
        >
          Purchase
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Featured shimmer (only for featured products) */}
      {product.featured && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-30"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${accent}22, transparent 60%)`,
          }}
        />
      )}
    </article>
  );
}
