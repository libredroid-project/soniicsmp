"use client";

import { ArrowRight } from "lucide-react";
import { SoniicWordmark } from "./soniic-wordmark";
import { ServerIpCopy } from "./server-ip-copy";

export function FinalCta() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container-m3">
        <div
          className="relative overflow-hidden rounded-[28px] border border-[var(--md-outline-variant)] px-6 py-12 sm:px-12 sm:py-16 text-center"
          style={{
            background:
              "radial-gradient(ellipse 80% 120% at 50% 0%, rgba(0,255,121,0.16), transparent 60%), var(--md-surface-container)",
            boxShadow: "var(--elev-3), 0 0 80px rgba(0,255,121,0.08)",
          }}
        >
          {/* Decorative pixel grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #00FF79 1px, transparent 1px), linear-gradient(to bottom, #00FF79 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage:
                "radial-gradient(ellipse 70% 70% at 50% 50%, #000, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 70% at 50% 50%, #000, transparent 75%)",
            }}
          />

          <div className="relative">
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-balance">
              Ready to join{" "}
              <SoniicWordmark as="span" className="text-3xl sm:text-5xl align-baseline" />
              ?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-[var(--md-on-surface-variant)] text-pretty">
              Pick a rank above, then scroll down to the embedded Tip4Serv
              store and checkout in seconds. Every purchase keeps
              SoniicSMP alive — thank you for the support.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#ranks" className="m3-btn m3-btn-filled">
                View the ranks
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#store" className="m3-btn m3-btn-outlined">
                Open live store
              </a>
              <ServerIpCopy />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
