"use client";

import { CreditCard, MousePointerClick, PackageCheck, ArrowRight } from "lucide-react";
import { SoniicWordmark } from "./soniic-wordmark";

const STEPS = [
  {
    icon: MousePointerClick,
    title: "Pick your rank",
    body: "Choose between the flagship Sonic Rank and the seasonal Halloween Rank. Both are permanent — pay once, keep it forever.",
    accent: "#4498DB",
    n: "01",
  },
  {
    icon: CreditCard,
    title: "Enter your details here",
    body: "Fill in your Minecraft username & email on the checkout form below. We pass them to Tip4Serv and take you straight to secure Stripe / PayPal checkout.",
    accent: "#00FF79",
    n: "02",
  },
  {
    icon: PackageCheck,
    title: "Receive in-game",
    body: "Your rank lands on your in-game account within 60 seconds of payment. Run /sync in-game if anything is missing — we've got your back.",
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
            From pick to in-game in three steps.
          </h2>
          <p className="mt-3 text-[var(--md-on-surface-variant)] text-pretty">
            No waiting, no staff intervention, no Discord tickets for basic
            deliveries. The whole flow is automated end-to-end.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-6 relative">
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
                    border: `1px solid ${s.accent}55`,
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
            href="#checkout"
            className="m3-btn m3-btn-tonal"
          >
            Go to checkout
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
