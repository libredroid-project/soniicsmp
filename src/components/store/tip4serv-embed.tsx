"use client";

import { useState } from "react";
import {
  ShieldCheck,
  CreditCard,
  ExternalLink,
  Ghost,
  Check,
} from "lucide-react";
import {
  ranks,
  formatPrice,
  getDiscount,
  TIP4SERV_SONIC_PRODUCT_URL,
} from "@/lib/store";

/**
 * Checkout section — the Tip4Serv shop is embedded directly as an iframe.
 * The user picks a rank here, adds it to the cart and pays INSIDE the
 * embed, so the cart always contains the item before checkout.
 * (Passing rank/username/email as query params to /checkout does NOT
 * work — Tip4Serv ignores them and the cart stays empty.)
 */
export function Tip4ServEmbed() {
  const [selectedRankId, setSelectedRankId] = useState<string>(
    ranks.find((r) => r.live)?.id ?? ranks[0].id,
  );

  const selectedRank = ranks.find((r) => r.id === selectedRankId);
  const isLive = selectedRank?.live ?? false;

  return (
    <section id="checkout" className="py-12 lg:py-20 scroll-mt-20">
      <div className="container-m3">
        <header className="max-w-2xl mx-auto text-center mb-8">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase font-semibold text-[var(--brand)] inline-flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5" />
            Checkout
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-medium tracking-tight text-balance">
            Pick a rank, pay right here.
          </h2>
          <p className="mt-3 text-[var(--md-on-surface-variant)] text-pretty">
            Choose your rank below — the official Tip4Serv shop opens right
            here. Add it to the cart, enter your Minecraft username &amp; email,
            and check out securely without leaving this page.
          </p>
        </header>

        {/* Rank pills */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 mb-6"
          role="tablist"
          aria-label="Choose your rank"
        >
          {ranks.map((r) => {
            const selected = r.id === selectedRankId;
            const discount = getDiscount(r);
            return (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setSelectedRankId(r.id)}
                className={`m3-btn ${selected ? "m3-btn-filled" : "m3-btn-tonal"}`}
                style={
                  selected ? { background: r.accent, color: "#0F1011" } : undefined
                }
              >
                {selected && <Check className="w-4 h-4" />}
                {r.name}
                <span className="font-mono text-xs font-bold">
                  {formatPrice(r.price)}
                </span>
                {discount && (
                  <span className="text-[10px] font-mono opacity-80">
                    -{discount}%
                  </span>
                )}
                {r.live === false && (
                  <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-full bg-black/20">
                    soon
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {isLive ? (
          <div className="max-w-4xl mx-auto">
            <div
              className="m3-card rounded-[28px] overflow-hidden"
              style={{ boxShadow: "var(--elev-1)" }}
            >
              {/* Embed header bar */}
              <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-[var(--md-outline-variant)] bg-[var(--md-surface-container-low)]">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: selectedRank?.accent }}
                  />
                  <span className="text-sm font-medium truncate">
                    {selectedRank?.name} — Tip4Serv Shop
                  </span>
                </div>
                <a
                  href={TIP4SERV_SONIC_PRODUCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)] inline-flex items-center gap-1 flex-shrink-0"
                >
                  In neuem Tab öffnen
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* The real Tip4Serv shop — cart & payment happen here */}
              <iframe
                src={TIP4SERV_SONIC_PRODUCT_URL}
                title="Tip4Serv shop — add your rank to the cart and check out"
                className="w-full block bg-white"
                style={{ height: "min(760px, 80vh)", border: "0" }}
                loading="lazy"
                allow="payment *"
              />
            </div>

            <p className="mt-4 text-xs text-center text-[var(--md-on-surface-variant)] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--brand)]" />
              Add the rank to the cart inside the shop, then check out. Card
              details are handled on Tip4Serv&apos;s PCI-compliant checkout — we
              never see them.
            </p>
          </div>
        ) : (
          /* Not-yet-live rank panel */
          <div className="m3-card rounded-[28px] p-10 max-w-2xl mx-auto flex flex-col items-center gap-4 text-center">
            <span
              className="grid place-items-center w-14 h-14 rounded-2xl"
              style={{
                background: `${selectedRank?.accent}1f`,
                color: selectedRank?.accent,
              }}
            >
              <Ghost className="w-7 h-7" />
            </span>
            <h3 className="text-xl font-bold" style={{ color: selectedRank?.accent }}>
              {selectedRank?.name} is almost here
            </h3>
            <p className="text-sm text-[var(--md-on-surface-variant)] max-w-md text-pretty">
              The Halloween Rank isn&apos;t on the Tip4Serv shop yet. It drops
              later this October — until then you can grab the{" "}
              <strong className="text-[var(--md-on-surface)]">Sonic Rank</strong>{" "}
              in the tab above and get every base perk now.
            </p>
            <span className="font-mono text-2xl font-extrabold" style={{ color: selectedRank?.accent2 }}>
              {selectedRank ? formatPrice(selectedRank.price) : ""}
            </span>
            {selectedRank?.originalPrice && (
              <span className="text-xs font-mono text-[var(--md-on-surface-variant)] -mt-3">
                was {formatPrice(selectedRank.originalPrice)}
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
