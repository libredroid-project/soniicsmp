import { NextRequest, NextResponse } from "next/server";
import {
  ranks,
  TIP4SERV_API_URL,
  TIP4SERV_STORE_ID,
} from "@/lib/store";

/**
 * POST /api/checkout — creates a Tip4Serv checkout session for a rank.
 *
 * Forwards the basket to the public Tip4Serv checkout API (no API key
 * required for this endpoint) and returns the pre-filled hosted checkout
 * URL the user is redirected to. Rank id and product slug are resolved
 * server-side so the endpoint can't be used as an open proxy for
 * arbitrary products, and redirect URLs are derived from the request
 * origin, never from the client body.
 */
export async function POST(request: NextRequest) {
  let body: { rankId?: string; username?: string; email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const username = (body.username ?? "").trim();
  const email = (body.email ?? "").trim();

  const rank = ranks.find((r) => r.id === body.rankId);
  if (!rank || !rank.live || !rank.checkoutSlug) {
    return NextResponse.json(
      { error: "This rank is not available for checkout yet." },
      { status: 400 },
    );
  }
  if (!/^[a-zA-Z0-9_]{3,16}$/.test(username)) {
    return NextResponse.json(
      { error: "Enter a valid Minecraft username (3–16 letters, numbers or underscores)." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const origin = request.nextUrl.origin;
  const query = new URLSearchParams({ store: String(TIP4SERV_STORE_ID) });

  try {
    const res = await fetch(`${TIP4SERV_API_URL}/store/checkout?${query}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({
        products: [{ product_slug: rank.checkoutSlug, quantity: 1 }],
        user: { email, minecraft_username: username },
        redirect_success_checkout: `${origin}/?checkout=success`,
        redirect_pending_checkout: `${origin}/?checkout=pending`,
        redirect_canceled_checkout: `${origin}/#checkout`,
      }),
    });
    const data = (await res.json().catch(() => null)) as { url?: string; error?: string } | null;
    if (!res.ok || !data?.url) {
      return NextResponse.json(
        {
          error:
            data?.error ??
            "Tip4Serv is currently unreachable. Please try again or open the Tip4Serv shop directly.",
        },
        { status: 502 },
      );
    }
    return NextResponse.json({ url: data.url });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the Tip4Serv checkout API. Please try again." },
      { status: 502 },
    );
  }
}
