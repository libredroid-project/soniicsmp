"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Users,
  Server,
  type LucideIcon,
} from "lucide-react";

interface ServerStatus {
  online: boolean;
  host: string;
  ip: string | null;
  port: number | null;
  motd: string | null;
  playersOnline: number;
  playersMax: number;
  version: string | null;
  fetchedAt: string;
  error?: string;
}

interface StatTile {
  label: string;
  icon: LucideIcon;
  render: (s: ServerStatus | null, loading: boolean) => React.ReactNode;
}

const TILES: StatTile[] = [
  {
    label: "Server status",
    icon: Activity,
    render: (s, loading) =>
      loading ? (
        <span className="text-base font-bold text-[var(--md-on-surface-variant)]">…</span>
      ) : s?.online ? (
        <span className="inline-flex items-center gap-2 text-base font-bold text-[var(--md-success)]">
          <span className="pulse-dot" />
          Online
        </span>
      ) : (
        <span className="inline-flex items-center gap-2 text-base font-bold text-[var(--md-error)]">
          <span className="pulse-dot offline" />
          Offline
        </span>
      ),
  },
  {
    label: "Players online",
    icon: Users,
    render: (s, loading) =>
      loading ? (
        <span className="text-2xl font-bold text-[var(--md-on-surface-variant)]">…</span>
      ) : (
        <span className="text-2xl font-bold text-[var(--md-on-surface)]">
          {s?.online ? s.playersOnline : 0}
          <span className="text-[var(--brand)]">/{s?.playersMax ?? 0}</span>
        </span>
      ),
  },
  {
    label: "Server version",
    icon: Server,
    render: (s, loading) =>
      loading ? (
        <span className="text-base font-mono font-semibold text-[var(--md-on-surface-variant)]">…</span>
      ) : (
        <span className="text-base font-mono font-semibold text-[var(--md-on-surface)]">
          {s?.version || "n/a"}
        </span>
      ),
  },
  {
    label: "Server MOTD",
    icon: Server,
    render: (s, loading) =>
      loading ? (
        <span className="text-sm text-[var(--md-on-surface-variant)]">…</span>
      ) : (
        <span className="text-sm text-[var(--md-on-surface-variant)] truncate max-w-[180px]">
          {s?.motd || "n/a"}
        </span>
      ),
  },
];

export function StatsBar() {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const res = await fetch("/api/server-status", { cache: "no-store" });
      const json: ServerStatus = await res.json();
      setStatus(json);
    } catch {
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, 60000); // refresh every 60s
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-4">
      <div className="container-m3">
        <div className="m3-card rounded-2xl grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[var(--md-outline-variant)] overflow-hidden">
          {TILES.map((t) => (
            <div key={t.label} className="flex items-center gap-3 p-5">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-[var(--brand-container)] text-[var(--brand)] flex-shrink-0">
                <t.icon className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <div className="text-xs text-[var(--md-on-surface-variant)] truncate mb-0.5">
                  {t.label}
                </div>
                {t.render(status, loading)}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-[11px] text-[var(--md-on-surface-variant)]">
          Live data from the Minecraft server status ping (mcsrvstat.us) · refreshed every 60s
        </p>
      </div>
    </section>
  );
}
