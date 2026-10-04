"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { SoniicWordmark } from "./soniic-wordmark";
import {
  DISCORD_URL,
  MADE_BY,
  MADE_BY_URL,
} from "@/lib/store";

const NAV_LINKS = [
  { href: "#ranks", label: "Ranks" },
  { href: "#checkout", label: "Checkout" },
  { href: "#how", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.028ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
    </svg>
  );
}

function LibreDroidBadge({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={MADE_BY_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Made by ${MADE_BY}`}
      className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--md-outline-variant)] bg-[var(--md-surface-container)] px-2.5 py-1 text-[10px] font-medium text-[var(--md-on-surface-variant)] hover:text-[var(--brand)] hover:border-[var(--brand)] transition-colors ${compact ? "" : "hidden sm:inline-flex"}`}
    >
      {!compact && <span className="opacity-70">made by</span>}
      <span className="font-semibold text-[var(--md-on-surface)]">{MADE_BY}</span>
    </a>
  );
}

export function TopAppBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`top-app-bar ${scrolled ? "scrolled" : ""}`}
      role="banner"
    >
      <div className="container-m3">
        <div className="flex items-center h-16 gap-3">
          {/* Logo */}
          <a
            href="#top"
            className="flex items-center gap-2.5 mr-auto group"
            aria-label="SoniicSMP Store home"
          >
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
                    style={{ width: 5, height: 5, background: c, boxShadow: `0 0 4px ${c}99` }}
                  />
                ))}
              </span>
            </span>
            <SoniicWordmark className="text-xl sm:text-2xl" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 lg:px-4 py-2 rounded-full text-sm font-medium text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)] hover:bg-white/5 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* libreDroid badge (desktop only, takes a spot in the bar) */}
          <span className="hidden lg:inline-flex">
            <LibreDroidBadge />
          </span>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join our Discord"
              className="hidden sm:grid place-items-center w-10 h-10 rounded-full text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)] hover:bg-white/5 transition-colors"
            >
              <DiscordIcon className="w-5 h-5" />
            </a>
            {/* Mobile libreDroid badge */}
            <span className="lg:hidden hidden sm:inline-flex">
              <LibreDroidBadge compact />
            </span>
            <a
              href="#checkout"
              aria-label="Open the Tip4Serv checkout"
              className="grid place-items-center w-10 h-10 rounded-full text-[var(--md-on-surface-variant)] hover:text-[var(--brand)] hover:bg-[var(--brand-container)] transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
            </a>
            <a href="#checkout" className="m3-btn m3-btn-filled hidden sm:inline-flex">
              Checkout
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="md:hidden grid place-items-center w-10 h-10 rounded-full text-[var(--md-on-surface)] hover:bg-white/5"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-[var(--md-outline-variant)] bg-[var(--md-surface-container)]">
          <nav className="container-m3 py-3 flex flex-col gap-1" aria-label="Mobile">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-[var(--md-on-surface)] hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#checkout"
              onClick={() => setOpen(false)}
              className="m3-btn m3-btn-filled mt-2"
            >
              Checkout
            </a>
            <div className="mt-2 flex justify-center">
              <LibreDroidBadge />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
