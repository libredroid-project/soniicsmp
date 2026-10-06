"use client";

import { Heart, Code2 } from "lucide-react";
import { SoniicWordmark } from "./soniic-wordmark";
import { ServerIpCopy } from "./server-ip-copy";
import {
  TIP4SERV_SHOP_URL,
  TIP4SERV_TOS_URL,
  TIP4SERV_PP_URL,
  DISCORD_URL,
  SERVER_IP,
  SERVER_NAME,
  MADE_BY,
  MADE_BY_URL,
} from "@/lib/store";

const FOOTER_GROUPS = [
  {
    title: "Store",
    links: [
      { label: "Ranks", href: "#ranks" },
      { label: "Checkout", href: "#checkout" },
      { label: "How it works", href: "#how" },
      { label: "Open Tip4Serv", href: TIP4SERV_SHOP_URL, external: true },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discord", href: DISCORD_URL, external: true },
      { label: "FAQ", href: "#faq" },
      { label: "Support ticket", href: DISCORD_URL, external: true },
      { label: "Season 3 changelog", href: "#features" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: `Copy IP: ${SERVER_IP}`, href: "#top" },
      { label: "Java & Bedrock crossplay", href: "#features" },
      { label: "Server status", href: "#top" },
      { label: "Staff team", href: DISCORD_URL, external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Imprint", href: "/imprint" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Tip4Serv Terms (TOS)", href: TIP4SERV_TOS_URL, external: true },
      { label: "Tip4Serv Privacy (PP)", href: TIP4SERV_PP_URL, external: true },
      { label: "Open Tip4Serv shop", href: TIP4SERV_SHOP_URL, external: true },
    ],
  },
];

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.028ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer
      className="mt-auto border-t border-[var(--md-outline-variant)] bg-[var(--md-surface-container-low)]"
      role="contentinfo"
    >
      <div className="container-m3 py-12">
        <div className="grid lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10">
          {/* Brand block */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span
                className="grid place-items-center rounded-lg overflow-hidden flex-shrink-0"
                style={{
                  width: 36,
                  height: 36,
                  background: "var(--md-surface-container-high)",
                  boxShadow: "var(--elev-1)",
                }}
              >
                <span className="grid grid-cols-3 gap-[2px] p-1.5">
                  {[
                    "#4498DB", "#52BDD0", "#5FE2C5",
                    "#30F19F", "#00FF79", "#77924F",
                    "#EE2525", "#F03535", "#F24545",
                  ].map((c, i) => (
                    <span
                      key={i}
                      className="block rounded-[1px]"
                      style={{ width: 5, height: 5, background: c }}
                    />
                  ))}
                </span>
              </span>
              <SoniicWordmark className="text-2xl" />
            </div>
            <p className="text-sm text-[var(--md-on-surface-variant)] max-w-xs text-pretty">
              A community-funded Minecraft survival server. Java & Bedrock
              crossplay, season-based resets, and a store that keeps the lights on.
            </p>
            <div className="flex items-center gap-2">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="grid place-items-center w-10 h-10 rounded-full bg-[var(--md-surface-container)] text-[var(--md-on-surface-variant)] hover:text-[var(--brand)] hover:bg-[var(--brand-container)] transition-colors"
              >
                <DiscordIcon className="w-5 h-5" />
              </a>
              <a
                href={TIP4SERV_SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tip4Serv store"
                className="grid place-items-center w-10 h-10 rounded-full bg-[var(--md-surface-container)] text-[var(--md-on-surface-variant)] hover:text-[var(--brand)] hover:bg-[var(--brand-container)] transition-colors text-xs font-bold"
              >
                T4S
              </a>
            </div>
            <div className="mt-1">
              <ServerIpCopy variant="card" />
            </div>
          </div>

          {/* Link groups */}
          {FOOTER_GROUPS.map((g) => (
            <nav key={g.title} aria-label={g.title} className="flex flex-col gap-3">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[var(--md-on-surface-variant)]">
                {g.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    {"external" in l && l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--md-on-surface)] hover:text-[var(--brand)] transition-colors"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <a
                        href={l.href}
                        className="text-sm text-[var(--md-on-surface)] hover:text-[var(--brand)] transition-colors"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--md-outline-variant)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--md-on-surface-variant)]">
          <p>
            © {new Date().getFullYear()} {SERVER_NAME}. Not affiliated with Mojang or Microsoft.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[var(--brand)]" />
              Payments by Tip4Serv
            </span>
            <span className="text-[var(--md-outline)]">·</span>
            <a
              href={MADE_BY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[var(--brand)] transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
              made by <span className="font-semibold text-[var(--md-on-surface)]">{MADE_BY}</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
