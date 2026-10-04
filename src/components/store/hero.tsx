"use client";

import Image from "next/image";
import { ArrowRight, ArrowDown, Sparkles } from "lucide-react";
import { SoniicWordmark } from "./soniic-wordmark";
import { ServerIpCopy } from "./server-ip-copy";
import { DISCORD_URL, TIP4SERV_SHOP_URL } from "@/lib/store";

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.028ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
    </svg>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-10 sm:pt-16 lg:pt-20 pb-12 lg:pb-20"
    >
      {/* Ambient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,121,0.18), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 -left-20 w-80 h-80 rounded-full blur-3xl opacity-30 float-y"
        style={{ background: "radial-gradient(circle, rgba(68,152,219,0.25), transparent 60%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-60 -right-20 w-80 h-80 rounded-full blur-3xl opacity-25 float-y"
        style={{ animationDelay: "-3s", background: "radial-gradient(circle, rgba(238,37,37,0.22), transparent 60%)" }}
      />

      <div className="container-m3 relative">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-12 items-center">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--md-outline-variant)] bg-[var(--md-surface-container)] px-3 py-1.5 text-xs font-medium text-[var(--md-on-surface-variant)] mb-6">
              <span className="pulse-dot" />
              Server online
              <span className="text-[var(--md-outline)]">·</span>
              <span className="text-[var(--brand)]">Season 3 live</span>
            </div>

            <h1 className="font-sans font-medium text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance">
              Your{" "}
              <SoniicWordmark as="span" className="text-4xl sm:text-5xl lg:text-6xl align-baseline" />
              <br className="hidden sm:block" />
              <span className="text-[var(--md-on-surface)]"> adventure, supercharged.</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[var(--md-on-surface-variant)] max-w-xl mx-auto lg:mx-0 text-pretty">
              Ranks, crate keys, coins, kits & cosmetics for the SoniicSMP
              survival server. Every purchase keeps the server online and
              ad-free. Secure checkout powered by Tip4Serv.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a href="#shop" className="m3-btn m3-btn-filled">
                Browse Store
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="m3-btn m3-btn-tonal"
              >
                <DiscordIcon className="w-4 h-4" />
                Join Discord
              </a>
              <ServerIpCopy />
            </div>

            <p className="mt-6 text-xs text-[var(--md-on-surface-variant)] flex items-center justify-center lg:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--brand)]" />
              Instant delivery in-game · Stripe & PayPal · Non pay-to-win
            </p>
          </div>

          {/* Right: hero visual */}
          <div className="relative">
            <div
              className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-[28px] overflow-hidden border border-[var(--md-outline-variant)] shadow-[var(--elev-4)]"
              style={{ boxShadow: "var(--elev-4), 0 0 0 1px var(--md-outline-variant), 0 0 80px rgba(0,255,121,0.12)" }}
            >
              <Image
                src="/hero-bg.png"
                alt="SoniicSMP survival world at golden hour"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(16,20,15,0.95) 0%, rgba(16,20,15,0.45) 40%, rgba(16,20,15,0.1) 100%)",
                }}
              />
              {/* Floating stat chips */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end gap-3">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--md-on-surface-variant)]">
                      Now live
                    </div>
                    <div className="text-xl font-semibold text-white drop-shadow">
                      <SoniicWordmark as="span" className="text-xl" />
                    </div>
                  </div>
                  <div className="glass-card rounded-xl px-3 py-2 text-right">
                    <div className="text-[10px] uppercase tracking-wider text-[var(--md-on-surface-variant)]">
                      Players
                    </div>
                    <div className="text-lg font-bold text-[var(--brand)]">
                      127
                    </div>
                  </div>
                </div>
                <div className="glass-card rounded-xl px-3 py-2 flex items-center gap-2.5">
                  <ServerIpCopy variant="row" />
                </div>
              </div>
            </div>

            {/* Decorative corner badge */}
            <div
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 rotate-3 rounded-2xl px-3 py-2 text-xs font-bold text-[var(--brand-on)] shadow-[var(--elev-3)]"
              style={{ background: "var(--brand)" }}
            >
              SEASON 3
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-12 flex justify-center">
          <a
            href="#shop"
            aria-label="Scroll to store"
            className="inline-flex flex-col items-center gap-1 text-[var(--md-on-surface-variant)] hover:text-[var(--brand)] transition-colors"
          >
            <span className="text-[10px] uppercase tracking-wider">Explore the store</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
