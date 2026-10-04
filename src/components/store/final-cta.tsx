"use client";

import { ArrowRight } from "lucide-react";
import { SoniicWordmark } from "./soniic-wordmark";
import { ServerIpCopy } from "./server-ip-copy";

export function FinalCta() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container-m3">
        <div
          className="m3-card rounded-[28px] px-6 py-12 sm:px-12 sm:py-16 text-center"
        >
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-balance">
            Ready to join{" "}
            <SoniicWordmark as="span" className="text-3xl sm:text-5xl align-baseline" />
            ?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-[var(--md-on-surface-variant)] text-pretty">
            Scroll back up to the checkout form, enter your Minecraft
            username &amp; email, and we&apos;ll take you straight to the
            Tip4Serv secure checkout. Every purchase keeps
            SoniicSMP alive. Thank you.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#checkout" className="m3-btn m3-btn-filled">
              Go to checkout
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#ranks" className="m3-btn m3-btn-outlined">
              View ranks
            </a>
            <ServerIpCopy />
          </div>
        </div>
      </div>
    </section>
  );
}
