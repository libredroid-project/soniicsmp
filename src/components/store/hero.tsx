"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SoniicWordmark } from "./soniic-wordmark";
import { ServerIpCopy } from "./server-ip-copy";
import { DISCORD_URL } from "@/lib/store";

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.028ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
    </svg>
  );
}

export function Hero() {
  return (
    <section id="top" className="pt-6 sm:pt-10 lg:pt-14 pb-10 lg:pb-14">
      <div className="container-m3">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Left: REAL Minecraft image — half the screen on desktop */}
          <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[460px] rounded-2xl overflow-hidden border border-[var(--md-outline-variant)]" style={{ boxShadow: "var(--elev-1)" }}>
            <Image
              src="/hero-mc.jpg"
              alt="SoniicSMP survival world"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Right: SoniicSMP wordmark + DC + IP buttons — simple, traditional */}
          <div className="flex flex-col justify-center gap-6 py-2">
            <div>
              <SoniicWordmark as="h1" className="text-5xl sm:text-6xl lg:text-7xl" />
            </div>

            <p className="text-base sm:text-lg text-[var(--md-on-surface-variant)] max-w-md text-pretty">
              The official SoniicSMP store. Pick a rank, enter your details,
              pay securely via Tip4Serv. Join the survival server at{" "}
              <span className="font-mono text-[var(--md-on-surface)]">soniicsmp.de</span>.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a href="#ranks" className="m3-btn m3-btn-filled">
                View ranks
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="m3-btn m3-btn-tonal"
              >
                <DiscordIcon className="w-4 h-4" />
                Discord
              </a>
              <ServerIpCopy />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
