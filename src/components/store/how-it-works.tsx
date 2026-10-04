"use client";

import { CreditCard, MousePointerClick, PackageCheck, ArrowRight } from "lucide-react";
import { SoniicWordmark } from "./soniic-wordmark";
import { TIP4SERV_SHOP_URL } from "@/lib/store";

const STEPS = [
  {
    icon: MousePointerClick,
    title: "Pick your perk",
    body: "Choose a rank, crate key bundle, coins, kit or cosmetic from the store below. All prices are one-time — no subscription.",
    accent: "#4498DB",
    n: "01",
  },
  {
    icon: CreditCard,
    title: "Pay on Tip4Serv",
    body: "Click Purchase and you'll be sent to soniic.tip4serv.com to complete a secure Stripe or PayPal checkout. We never see your card details.",
    accent: "#00FF79",
    n: "02",
  },
  {
    icon: PackageCheck,
    title: "Receive in-game",
    body: "Items and ranks are delivered to your in-game account within 60 seconds. Type /sync in-game if anything is missing — we've got your back.",
    accent: "#EE2525",
    n: "03",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-12 lg:py-20">
      <div className="container-m3">
        <header className="max-w-2xl mb-10 lg:mb-12">
          <span className="text-xs uppercase tracking-wider font-semibold text-[var(--brand)]">
            How it works
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-medium tracking-tight text-balance">
            From cart to in-game in three steps.
          </h2>
          <p className="mt-3 text-[var(--md-on-surface-variant)] text-pretty">
            No waiting, no staff intervention, no Discord tickets for basic
            deliveries. The whole flow is automated end-to-end.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-6 relative">
          {/* Connecting line */}
          <div
            aria-hidden
            className="hidden md:block absolute top-[44px] left-[16%] right-[16%] h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(0,255,121,0.4) 20%, rgba(238,37,37,0.4) 80%, transparent)",
            }}
          />

          {STEPS.map((s) => (
            <div
              key={s.n}
              className="m3-card m3-card-hover rounded-2xl p-6 flex flex-col gap-4 relative"
            >
              <div className="flex items-center justify-between">
                <span
                  className="grid place-items-center w-12 h-12 rounded-2xl"
                  style={{
                    background: `${s.accent}1f`,
                    color: s.accent,
                    boxShadow: `0 0 24px ${s.accent}22, inset 0 0 0 1px ${s.accent}55`,
                  }}
                >
                  <s.icon className="w-6 h-6" />
                </span>
                <span
                  className="font-mono text-3xl font-bold opacity-30"
                  style={{ color: s.accent }}
                >
                  {s.n}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--md-on-surface)]">
                {s.title}
              </h3>
              <p className="text-sm text-[var(--md-on-surface-variant)] leading-relaxed text-pretty">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-center">
          <span className="text-sm text-[var(--md-on-surface-variant)]">
            Play on{" "}
            <SoniicWordmark as="span" className="text-sm font-bold" />?
          </span>
          <a
            href={TIP4SERV_SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="m3-btn m3-btn-tonal"
          >
            Open the store
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
