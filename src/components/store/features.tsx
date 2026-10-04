"use client";

import { Shield, Zap, Gift, Headset, Wallet, Infinity as InfinityIcon } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Instant delivery",
    body: "Your rank lands in-game within 60 seconds of payment. No staff needed, no waiting.",
    accent: "#00FF79",
  },
  {
    icon: Shield,
    title: "Pay inline on this page",
    body: "The full Tip4Serv store is embedded below — browse, add to cart and pay with Stripe or PayPal without leaving soniicsmp.de.",
    accent: "#4498DB",
  },
  {
    icon: Wallet,
    title: "Keeps the server free",
    body: "Every euro goes to hosting, plugins and developer time. No ads, no paywalls, ever.",
    accent: "#5FE2C5",
  },
  {
    icon: Gift,
    title: "Permanent ranks",
    body: "Pay once, keep it forever. Sonic and Halloween ranks never expire — and future perks land free.",
    accent: "#77924F",
  },
  {
    icon: Headset,
    title: "Real human support",
    body: "Open a ticket on Discord and a staff member will sort out any issue within hours.",
    accent: "#EE2525",
  },
  {
    icon: InfinityIcon,
    title: "Non pay-to-win",
    body: "All rank perks are convenience & cosmetics — fly, kits, prefixes. Never combat advantage in fair PvP.",
    accent: "#9C5FE2",
  },
];

export function Features() {
  return (
    <section id="features" className="py-12 lg:py-20">
      <div className="container-m3">
        <header className="max-w-2xl mb-10 lg:mb-12">
          <span className="text-xs uppercase tracking-wider font-semibold text-[var(--brand)]">
            Why support us
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-medium tracking-tight text-balance">
            Built for real players, not for profit.
          </h2>
          <p className="mt-3 text-[var(--md-on-surface-variant)] text-pretty">
            SoniicSMP is a community-funded survival server. Every rank
            purchase is a direct contribution to keeping the world online and
            improving it for everyone — and you get some cool perks back.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="m3-card m3-card-hover rounded-2xl p-6 flex flex-col gap-3"
            >
              <span
                className="grid place-items-center w-11 h-11 rounded-xl"
                style={{
                  background: `${f.accent}1f`,
                  color: f.accent,
                  boxShadow: `0 0 24px ${f.accent}22`,
                }}
              >
                <f.icon className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-semibold text-[var(--md-on-surface)]">
                {f.title}
              </h3>
              <p className="text-sm text-[var(--md-on-surface-variant)] leading-relaxed">
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
