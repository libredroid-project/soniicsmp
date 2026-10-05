"use client";

import { CreditCard, MousePointerClick, PackageCheck, ArrowRight } from "lucide-react";
import { SoniicWordmark } from "./soniic-wordmark";

const STEPS = [
  {
    icon: MousePointerClick,
    title: "Pick your rank",
    body: "Choose between the flagship Sonic Rank and the seasonal Halloween Rank. Both are permanent. Pay once, keep it forever.",
    accent: "#4498DB",
    n: "01",
  },
  {
    icon: CreditCard,
    title: "Enter your details & pay",
    body: "Fill in your Minecraft username & email on the checkout form below. Our checkout API pre-fills Tip4Serv's secure payment page — Stripe / PayPal — with your rank.",
    accent: "#52BDD0",
    n: "02",
  },
  {
    icon: PackageCheck,
    title: "Receive in-game",
    body: "Your rank lands on your in-game account within 60 seconds of payment. Run /sync in-game if anything is missing. We've got your back.",
    accent: "#5FE2C5",
    n: "03",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-12 lg:py-20">
      <div className="container-m3">
        <header className="max-w-2xl mb-8 lg:mb-10">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase font-semibold text-[var(--brand)]">
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

        {/* Vertical timeline panel — one unified m3-card with a left rail */}
        <div className="m3-card rounded-[28px] overflow-hidden">
          {/* The rail (vertical gradient line) */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute top-6 bottom-6 left-[31px] sm:left-[39px] w-[2px]"
              style={{
                background:
                  "linear-gradient(to bottom, #4498DB 0%, #52BDD0 50%, #5FE2C5 100%)",
              }}
            />

            <ol className="relative flex flex-col">
              {STEPS.map((s, i) => (
                <li
                  key={s.n}
                  className={`flex gap-4 sm:gap-5 p-6 sm:p-7 ${
                    i !== STEPS.length - 1
                      ? "border-b border-[var(--md-outline-variant)]"
                      : ""
                  }`}
                >
                  {/* Numbered node on the rail */}
                  <div className="relative flex-shrink-0">
                    <span
                      className="relative z-10 grid place-items-center w-16 h-16 sm:w-20 sm:h-20 rounded-full"
                      style={{
                        background: "var(--md-surface-container-high)",
                        border: `2px solid ${s.accent}`,
                      }}
                    >
                      <s.icon
                        className="w-6 h-6 sm:w-7 sm:h-7"
                        style={{ color: s.accent }}
                      />
                    </span>
                  </div>

                  {/* Step content */}
                  <div className="flex flex-col gap-2 pt-1 sm:pt-2 min-w-0 flex-1">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span
                        className="font-mono text-2xl sm:text-3xl font-extrabold leading-none"
                        style={{ color: s.accent }}
                      >
                        {s.n}
                      </span>
                      <h3 className="text-lg sm:text-xl font-semibold text-[var(--md-on-surface)]">
                        {s.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[var(--md-on-surface-variant)] leading-relaxed text-pretty max-w-2xl">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Footer CTA inside the panel */}
          <div className="border-t border-[var(--md-outline-variant)] px-6 sm:px-7 py-5 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm text-[var(--md-on-surface-variant)]">
              Play on{" "}
              <SoniicWordmark as="span" className="text-sm font-bold" />?
            </span>
            <a href="#checkout" className="m3-btn m3-btn-tonal">
              Go to checkout
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
