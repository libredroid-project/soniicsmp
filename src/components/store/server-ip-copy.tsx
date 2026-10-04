"use client";

import { useState } from "react";
import { Check, Copy, Server } from "lucide-react";
import { SERVER_IP } from "@/lib/store";

/**
 * One-click copy block for the server IP, styled like Kodanetwork's
 * "server IP copy" widget. Uses the modern clipboard API with a fallback.
 */
export function ServerIpCopy({
  variant = "row",
}: {
  variant?: "row" | "card";
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(SERVER_IP);
      } else {
        const ta = document.createElement("textarea");
        ta.value = SERVER_IP;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  if (variant === "card") {
    return (
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy server IP ${SERVER_IP}`}
        className="group glass-card rounded-2xl px-4 py-3 flex items-center gap-3 hover:border-[var(--brand)] transition-colors"
      >
        <span className="grid place-items-center w-10 h-10 rounded-xl bg-[var(--brand-container)] text-[var(--brand)]">
          <Server className="w-5 h-5" />
        </span>
        <span className="text-left">
          <span className="block text-[10px] uppercase tracking-wider text-[var(--md-on-surface-variant)]">
            Server IP
          </span>
          <span className="block font-mono text-sm font-semibold text-[var(--md-on-surface)]">
            {SERVER_IP}
          </span>
        </span>
        <span className="ml-1 grid place-items-center w-8 h-8 rounded-lg text-[var(--brand)] group-hover:scale-110 transition-transform">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy server IP ${SERVER_IP}`}
      className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--md-outline-variant)] bg-[var(--md-surface-container)] pl-3 pr-2 py-2 hover:border-[var(--brand)] transition-colors"
    >
      <span className="grid place-items-center w-7 h-7 rounded-full bg-[var(--brand-container)] text-[var(--brand)]">
        <Server className="w-4 h-4" />
      </span>
      <span className="font-mono text-sm font-semibold text-[var(--md-on-surface)]">
        {SERVER_IP}
      </span>
      <span className="grid place-items-center w-7 h-7 rounded-full text-[var(--md-on-surface-variant)] group-hover:text-[var(--brand)] transition-colors">
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </span>
    </button>
  );
}
