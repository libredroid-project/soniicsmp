"use client";

import * as Icons from "lucide-react";
import { stats } from "@/lib/store";

export function StatsBar() {
  return (
    <section className="py-4">
      <div className="container-m3">
        <div className="m3-card rounded-2xl grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[var(--md-outline-variant)] overflow-hidden">
          {stats.map((s) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[s.icon] ?? Icons.Activity;
            return (
              <div key={s.label} className="flex items-center gap-3 p-5">
                <span className="grid place-items-center w-10 h-10 rounded-xl bg-[var(--brand-container)] text-[var(--brand)] flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-2xl font-bold leading-none text-[var(--md-on-surface)]">
                    {s.value}
                    <span className="text-[var(--brand)]">{s.suffix}</span>
                  </div>
                  <div className="text-xs text-[var(--md-on-surface-variant)] truncate">
                    {s.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
