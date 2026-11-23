import { NextResponse } from "next/server";

/**
 * Server status proxy: pings mcsrvstat.us for soniicsmp.de.
 * Cached for 60s so the client can poll without hammering the API.
 * Returns the raw §-coded MOTD + favicon so the server-list entry
 * can render the real, colored MOTD exactly like Minecraft does.
 */

type McSrvStat = {
  online?: boolean;
  players?: { online?: number; max?: number };
  version?: string;
  motd?: { clean?: string[]; raw?: string[] };
  icon?: string;
};

let cache: { at: number; data: unknown } | null = null;
const TTL = 60_000;

const OFFLINE = {
  online: false,
  players: { online: 0, max: 0 },
  version: null,
  motd: null,
  motdRaw: [],
  icon: null,
};

export async function GET() {
  const now = Date.now();
  if (cache && now - cache.at < TTL) {
    return NextResponse.json(cache.data);
  }

  try {
    const res = await fetch("https://api.mcsrvstat.us/3/soniicsmp.de", {
      next: { revalidate: 60 },
      headers: { "User-Agent": "SoniicSMP-Store/1.0" },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`mcsrvstat responded ${res.status}`);
    const raw = (await res.json()) as McSrvStat;

    const data = {
      online: Boolean(raw.online),
      players: {
        online: raw.players?.online ?? 0,
        max: raw.players?.max ?? 0,
      },
      version: raw.version ?? null,
      motd: (raw.motd?.clean ?? []).join("\n").trim() || null,
      motdRaw: raw.motd?.raw ?? [],
      icon: raw.icon ?? null,
    };

    cache = { at: now, data };
    return NextResponse.json(data);
  } catch {
    // Serve stale data if we have it, otherwise report offline.
    if (cache) return NextResponse.json(cache.data);
    return NextResponse.json(OFFLINE);
  }
}
