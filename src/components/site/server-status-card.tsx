"use client";

import * as React from "react";
import { parseMotdLine } from "@/lib/motd";
import { SITE, WORDMARK } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Status = {
  online: boolean;
  players: { online: number; max: number };
  version: string | null;
  motd: string | null;
  motdRaw: string[];
  icon: string | null;
};

/** Render one §-coded MOTD line as colored spans (Minecraft palette). */
function MotdLine({ line }: { line: string }) {
  const segs = React.useMemo(() => parseMotdLine(line), [line]);
  return (
    <>
      {segs.map((s, i) => (
        <span
          key={i}
          style={{
            color: s.color,
            fontWeight: s.bold ? 700 : undefined,
            fontStyle: s.italic ? "italic" : undefined,
            textDecoration:
              s.underline || s.strike
                ? [s.underline ? "underline" : null, s.strike ? "line-through" : null]
                    .filter(Boolean)
                    .join(" ")
                : undefined,
          }}
        >
          {s.text}
        </span>
      ))}
    </>
  );
}

/** Minecraft-style signal strength bars (5 steps, right side of a server entry). */
function PingBars({ online }: { online: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="flex items-end gap-[2px]"
      title={online ? "Connection good" : "No connection"}
    >
      {[6, 9, 12, 15, 18].map((h, i) => (
        <span
          key={h}
          style={{ height: h }}
          className={cn(
            "w-[3px] rounded-[1px]",
            online
              ? "bg-emerald-400"
              : // offline: only the first bar glows dim red, like MC's dead signal
                i === 0
                ? "bg-red-400/70"
                : "bg-[#2e2e2e]"
          )}
        />
      ))}
    </span>
  );
}

/** Brand-colored fallback MOTD line 1 (SoniicSMP in the old rainbow). */
const BRAND_MOTD = WORDMARK.map(
  (l) => `§#${l.color.slice(1)}${l.ch}`
).join("");

function SkeletonLine({ w }: { w: string }) {
  return <span className={cn("block h-3 animate-pulse rounded-sm bg-[#1c1c1c]", w)} />;
}

/**
 * Live server entry, styled after the Minecraft multiplayer server list:
 * favicon, the real colored MOTD (§ codes and all), player count, ping bars.
 * The whole card is a button that copies the server IP.
 * Data comes from /api/server-status (mcsrvstat.us, 60s refresh).
 */
export function ServerStatusCard({ className }: { className?: string }) {
  const [status, setStatus] = React.useState<Status | null>(null);
  const [copied, setCopied] = React.useState(false);

  const load = React.useCallback(async () => {
    try {
      const res = await fetch("/api/server-status", { cache: "no-store" });
      if (res.ok) setStatus((await res.json()) as Status);
    } catch {
      /* keep last known state */
    }
  }, []);

  React.useEffect(() => {
    load();
    const id = setInterval(load, 60_000);
    return () => clearInterval(id);
  }, [load]);

  const copyIp = async () => {
    try {
      await navigator.clipboard.writeText(SITE.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const loaded = status !== null;
  const online = status?.online === true;
  const dot = !loaded ? "bg-[#3a3a3a]" : online ? "bg-emerald-400" : "bg-red-400";

  // MOTD lines: live raw MOTD when present, otherwise Minecraft-style fallbacks.
  const motdLines: string[] = loaded
    ? online
      ? status.motdRaw.length
        ? status.motdRaw.slice(0, 2)
        : [BRAND_MOTD, "§7survival · crossplay · community"]
      : ["§cCan't reach the server right now"]
    : [];

  const playerLabel = !loaded
    ? "…"
    : status.players.max > 0
      ? `${status.players.online}/${status.players.max}`
      : `${status.players.online} online`;

  const statusLabel = !loaded
    ? "checking status"
    : online
      ? "online"
      : "offline";

  return (
    <div className={cn("mt-10 flex w-full max-w-xl flex-col items-center gap-2.5", className)}>
      <button
        type="button"
        onClick={copyIp}
        title={
          status?.motd
            ? `${status.motd.replace(/\n/g, " ")} · click to copy the IP`
            : "Click to copy the IP"
        }
        className="group w-full rounded-xl border border-border bg-[#111111] text-left transition-colors duration-300 hover:bg-[#131313] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {/* main row: favicon · motd · players/ping */}
        <div className="flex items-center gap-4 p-4">
          {status?.icon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={status.icon}
              alt=""
              width={56}
              height={56}
              className="size-14 shrink-0 rounded-md border border-border/60 object-cover [image-rendering:pixelated]"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex size-14 shrink-0 items-center justify-center rounded-md border border-border/60 bg-[#181818] font-heading text-lg font-bold text-white"
            >
              S
            </span>
          )}

          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-sm font-medium text-white">{SITE.ip}</p>
            <div className="mt-1.5 space-y-1 font-mono text-[13px] leading-snug">
              {!loaded ? (
                <>
                  <SkeletonLine w="w-3/5" />
                  <SkeletonLine w="w-4/5" />
                </>
              ) : (
                motdLines.map((line, i) => (
                  <p key={i} className="whitespace-pre">
                    <MotdLine line={line} />
                  </p>
                ))
              )}
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2.5 pl-1">
            <span className="font-mono text-xs tabular-nums text-dim">{playerLabel}</span>
            <PingBars online={loaded && online} />
          </div>
        </div>

        {/* footer strip: live status · version · platform · copy hint */}
        <div className="flex items-center justify-between gap-3 border-t border-border/70 px-4 py-2.5 text-[11px] font-medium text-dim">
          <span className="flex items-center gap-2">
            <span className="relative flex size-1.5">
              <span
                className={cn(
                  "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
                  loaded && dot
                )}
              />
              <span className={cn("relative inline-flex size-1.5 rounded-full", dot)} />
            </span>
            {statusLabel}
          </span>
          <span className="flex items-center gap-2">
            {status?.version && <span>{status.version}</span>}
            {status?.version && (
              <span aria-hidden="true" className="text-[#3a3a3a]">
                ·
              </span>
            )}
            <span>Java &amp; Bedrock</span>
            <span
              className="w-14 text-right font-mono text-[10px] uppercase tracking-wide opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              role="status"
            >
              {copied ? "copied!" : "copy ip"}
            </span>
          </span>
        </div>
      </button>
      <p className="text-xs text-dim">
        Live from the server ping (mcsrvstat.us) · click the card to copy the IP
      </p>
    </div>
  );
}
