import { NextResponse } from "next/server";

// =========================================================================
// SoniicSMP — Real Minecraft server status API
// =========================================================================
// Fetches the LIVE status of soniicsmp.de via the public mcsrvstat.us API
// (SLP ping). Returns only real, verifiable data — no fake numbers.
//
// The frontend StatsBar uses this to show: online status, real player count
// (X/Y), server version and the live MOTD.
// =========================================================================

export const revalidate = 60; // refresh at most once per minute

export interface ServerStatus {
  online: boolean;
  host: string;
  ip: string | null;
  port: number | null;
  motd: string | null;
  playersOnline: number;
  playersMax: number;
  version: string | null;
  icon: string | null;
  fetchedAt: string;
}

export async function GET() {
  const host = "soniicsmp.de";
  const upstream = `https://api.mcsrvstat.us/3/${host}`;

  try {
    const res = await fetch(upstream, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        {
          online: false,
          host,
          ip: null,
          port: null,
          motd: null,
          playersOnline: 0,
          playersMax: 0,
          version: null,
          icon: null,
          fetchedAt: new Date().toISOString(),
          error: `Upstream returned HTTP ${res.status}`,
        } satisfies ServerStatus & { error: string },
        { status: 200 },
      );
    }

    const data = await res.json();

    // mcsrvstat.us v3: `online` boolean, `players.online`/`players.max`,
    // `motd.clean` (array of strings), `version` (string), `icon` (base64).
    const motd: string | null = Array.isArray(data?.motd?.clean)
      ? data.motd.clean.filter((s: unknown) => typeof s === "string" && s.length).join(" · ")
      : typeof data?.motd?.clean === "string"
        ? data.motd.clean
        : null;

    const status: ServerStatus = {
      online: Boolean(data?.online),
      host,
      ip: data?.ip ?? null,
      port: data?.port ?? null,
      motd: motd ?? null,
      playersOnline: Number(data?.players?.online ?? 0),
      playersMax: Number(data?.players?.max ?? 0),
      version: typeof data?.version === "string" ? data.version : null,
      icon: typeof data?.icon === "string" ? data.icon : null,
      fetchedAt: new Date().toISOString(),
    };

    return NextResponse.json(status);
  } catch (err) {
    return NextResponse.json(
      {
        online: false,
        host,
        ip: null,
        port: null,
        motd: null,
        playersOnline: 0,
        playersMax: 0,
        version: null,
        icon: null,
        fetchedAt: new Date().toISOString(),
        error: err instanceof Error ? err.message : "Unknown error",
      } satisfies ServerStatus & { error: string },
      { status: 200 },
    );
  }
}
