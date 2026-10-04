"use client";

import { useMemo, useState } from "react";
import * as Icons from "lucide-react";
import { ShieldCheck, ShoppingBag } from "lucide-react";
import { categories, products, type CategoryId } from "@/lib/store";
import { ProductCard } from "./product-card";
import { TIP4SERV_SHOP_URL } from "@/lib/store";

type Filter = CategoryId | "all";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...categories.map((c) => ({ id: c.id as Filter, label: c.label })),
];

// Map a category id to its anchor id so the nav links (#ranks, #crates, #coins) jump correctly
const CATEGORY_ANCHOR: Record<CategoryId, string> = {
  ranks: "ranks",
  crates: "crates",
  coins: "coins",
  kits: "kits",
  cosmetics: "cosmetics",
};

export function Shop() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section id="shop" className="py-12 lg:py-20 scroll-mt-20">
      <div className="container-m3">
        {/* Heading */}
        <header className="max-w-2xl mb-8">
          <span className="text-xs uppercase tracking-wider font-semibold text-[var(--brand)]">
            The store
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-medium tracking-tight text-balance">
            Pick your perks. Support the server.
          </h2>
          <p className="mt-3 text-[var(--md-on-surface-variant)] text-pretty">
            Browse the full catalog below. Every purchase is processed securely
            by Tip4Serv and delivered to your in-game account within a minute.
          </p>
        </header>

        {/* Tip4Serv trust banner */}
        <div className="m3-card rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <span className="grid place-items-center w-10 h-10 rounded-xl bg-[var(--brand-container)] text-[var(--brand)] flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <p className="text-sm text-[var(--md-on-surface-variant)] flex-1">
            <strong className="text-[var(--md-on-surface)]">Secure checkout by Tip4Serv.</strong>{" "}
            We never see your card details. Stripe, PayPal & local methods supported.
          </p>
          <a
            href={TIP4SERV_SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="m3-btn m3-btn-text"
          >
            <ShoppingBag className="w-4 h-4" />
            Open full store
          </a>
        </div>

        {/* Category chips */}
        <div
          className="flex gap-2 overflow-x-auto scrollbar-mc pb-3 -mx-1 px-1 mb-6"
          role="tablist"
          aria-label="Filter products by category"
        >
          {FILTERS.map((f) => {
            const cat = categories.find((c) => c.id === f.id);
            const Icon = cat
              ? (Icons as unknown as Record<string, Icons.LucideIcon>)[cat.icon] ?? Icons.Box
              : Icons.LayoutGrid;
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                data-active={active}
                onClick={() => setFilter(f.id)}
                className="m3-chip"
              >
                <Icon className="w-4 h-4" />
                {f.label}
                <span className="text-[10px] opacity-60 ml-1">
                  ({f.id === "all" ? products.length : products.filter((p) => p.category === f.id).length})
                </span>
              </button>
            );
          })}
        </div>

        {/* Category section anchors (for #ranks, #crates, #coins nav links) */}
        {filter === "all" ? (
          <div className="flex flex-col gap-14">
            {categories.map((cat) => {
              const Icon =
                (Icons as unknown as Record<string, Icons.LucideIcon>)[cat.icon] ??
                Icons.Box;
              const list = products.filter((p) => p.category === cat.id);
              return (
                <div
                  key={cat.id}
                  id={CATEGORY_ANCHOR[cat.id]}
                  className="scroll-mt-24"
                >
                  <div className="flex items-end justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <span
                        className="grid place-items-center w-11 h-11 rounded-xl"
                        style={{
                          background: `${cat.accent}1f`,
                          color: cat.accent,
                          boxShadow: `0 0 24px ${cat.accent}22`,
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--md-on-surface)]">
                          {cat.label}
                        </h3>
                        <p className="text-sm text-[var(--md-on-surface-variant)]">
                          {cat.blurb}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-[var(--md-on-surface-variant)] hidden sm:block">
                      {list.length} items
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {list.map((p) => (
                      <ProductCard key={p.id} product={p} category={cat} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            id={filter !== "all" ? CATEGORY_ANCHOR[filter] : undefined}
            className="scroll-mt-24"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  category={categories.find((c) => c.id === p.category)!}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty state guard */}
        {filtered.length === 0 && (
          <p className="text-center text-[var(--md-on-surface-variant)] py-12">
            No products in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
