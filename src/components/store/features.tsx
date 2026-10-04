"use client";

import { Shield, Zap, Gift, Headset, Wallet, Infinity as InfinityIcon } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Instant delivery",
    body: "Your rank lands in-game within 60 seconds of payment. No staff needed, no waiting.",
    accent: "#4498DB",
    span: "lg:col-span-2",
  },
  {
    icon: Shield,
    title: "Pay inline on this page",
    body: "Enter your details here and go straight to Tip4Serv's secure Stripe / PayPal checkout.",
    accent: "#5FE2C5",
    span: "",
  },
  {
    icon: Wallet,
    title: "Keeps the server free",
    body: "Every euro goes to hosting, plugins and developer time. No ads, no paywalls, ever.",
    accent: "#52BDD0",
    span: "",
  },
  {
    icon: Gift,
    title: "Permanent ranks",
    body: "Pay once, keep it forever. Sonic and Halloween ranks never expire, and future perks land free.",
    accent: "#77924F",
    span: "",
  },
  {
    icon: Headset,
    title: "Real human support",
    body: "Open a ticket on Discord and a staff member will sort out any issue within hours.",
    accent: "#F03535",
    span: "lg:col-span-2",
  },
  {
    icon: InfinityIcon,
    title: "Non pay-to-win",
    body: "All rank perks are convenience & cosmetics: fly, kits, prefixes. Never combat advantage in fair PvP.",
    accent: "#9C5FE2",
    span: "",
  },
];

export function Features() {
  return (
    <section id="features" className="py-12 lg:py-20">
      <div className="container-m3">
        <header className="max-w-2xl mb-10 lg:mb-12">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase font-semibold text-[var(--brand)]">
            Why support us
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-medium tracking-tight text-balance">
            Built for real players, not for profit.
          </h2>
          <p className="mt-3 text-[var(--md-on-surface-variant)] text-pretty">
            SoniicSMP is a community-funded survival server. Every rank
            purchase is a direct contribution to keeping the world online and
            improving it for everyone, and you get some cool perks back.
          </p>
        </header>

        {/* Bento grid — asymmetric, accent-tinted zones (not standard cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {FEATURES.map((f, i) => (
            <article
              key={f.title}
              className={`group relative overflow-hidden rounded-2xl p-5 sm:p-6 border transition-all duration-200 ${f.span}`}
              style={{
                background: `linear-gradient(135deg, ${f.accent}14, ${f.accent}06 70%)`,
                borderColor: `${f.accent}33`,
                minHeight: i === 0 || f.span ? "160px" : "140px",
              }}
            >
              {/* Large faint background number */}
              <span
                aria-hidden
                className="absolute -top-2 right-3 font-mono font-extrabold leading-none select-none"
                style={{
                  fontSize: "clamp(3.5rem, 8vw, 6rem)",
                  color: f.accent,
                  opacity: 0.10,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative flex flex-col gap-3 h-full">
                <span
                  className="grid place-items-center w-11 h-11 rounded-xl flex-shrink-0"
                  style={{ background: `${f.accent}1f`, color: f.accent }}
                >
                  <f.icon className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-semibold text-[var(--md-on-surface)]">
                  {f.title}
                </h3>
                <p className="text-sm text-[var(--md-on-surface-variant)] leading-relaxed text-pretty">
                  {f.body}
                </p>
              </div>

              {/* Hover accent bar at the bottom */}
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-[2px] transition-all duration-200 group-hover:w-full"
                style={{ width: "0%", background: f.accent }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
