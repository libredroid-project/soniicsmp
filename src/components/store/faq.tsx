"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LifeBuoy } from "lucide-react";
import { faqs, DISCORD_URL } from "@/lib/store";

export function Faq() {
  return (
    <section id="faq" className="py-12 lg:py-20">
      <div className="container-m3">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
          {/* Left column: heading */}
          <div className="lg:sticky lg:top-24 self-start">
            <span className="text-xs uppercase tracking-wider font-semibold text-[var(--brand)]">
              Support
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-medium tracking-tight text-balance">
              Frequently asked questions.
            </h2>
            <p className="mt-3 text-[var(--md-on-surface-variant)] text-pretty">
              Everything about delivery, payments, ranks and refunds. Can&apos;t
              find your answer? Our team is one click away on Discord.
            </p>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="m3-btn m3-btn-tonal mt-6"
            >
              <LifeBuoy className="w-4 h-4" />
              Ask on Discord
            </a>
          </div>

          {/* Right column: accordion */}
          <div>
            <Accordion type="single" collapsible className="flex flex-col gap-2">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="m3-card rounded-2xl px-5 border-none data-[state=open]:border-[var(--brand)]"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-[var(--md-on-surface)] hover:no-underline py-5">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[var(--md-on-surface-variant)] text-sm leading-relaxed pb-5">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
