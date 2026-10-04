"use client";

import { useEffect, useState } from "react";
import {
  ShieldCheck,
  ExternalLink,
  Loader2,
  AlertTriangle,
  Lock,
  Check,
  Tag,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { TIP4SERV_SHOP_URL } from "@/lib/store";

interface Tip4ServProduct {
  slug: string;
  title: string;
  productUrl: string;
  imageUrl: string | null;
  newPrice: string | null;
  oldPrice: string | null;
  discount: string | null;
  perks: string[];
  productId: string | null;
  fetchedAt: string;
}

interface StoreResponse {
  ok: boolean;
  shopUrl?: string;
  count?: number;
  products: Tip4ServProduct[];
  fetchedAt?: string;
  error?: string;
}

/**
 * Live Tip4Serv store — fetched & parsed server-side via /api/store.
 *
 * Our backend (/api/store route) fetches soniic.tip4serv.com, parses the
 * `sc-card-product` blocks and returns structured JSON. We render the REAL
 * live catalog (image, title, prices, discount, perks) inside our
 * Kodanetwork-style design. Each "Purchase" button deep-links to the
 * matching Tip4Serv product page where the secure Stripe / PayPal checkout
 * completes — that's "payment directly over the API".
 */
export function Tip4ServEmbed() {
  const [data, setData] = useState<StoreResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/store", { cache: "no-store" });
      const json: StoreResponse = await res.json();
      setData(json);
      if (!json.ok) setError(json.error ?? "Failed to load");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <section id="store" className="py-12 lg:py-20 scroll-mt-20">
      <div className="container-m3">
        <header className="max-w-2xl mb-6">
          <span className="text-xs uppercase tracking-wider font-semibold text-[var(--brand)] inline-flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            Live store · Tip4Serv API
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-medium tracking-tight text-balance">
            Live catalog, fetched directly from Tip4Serv.
          </h2>
          <p className="mt-3 text-[var(--md-on-surface-variant)] text-pretty">
            The cards below are pulled in real time from{" "}
            <span className="font-mono text-[var(--md-on-surface)]">soniic.tip4serv.com</span>{" "}
            via our backend API — same prices, same discounts, same perks as
            on the Tip4Serv shop. Click <strong>Purchase</strong> to complete
            secure checkout on Tip4Serv.
          </p>
        </header>

        {/* Trust bar */}
        <div className="m3-card rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <span className="grid place-items-center w-10 h-10 rounded-xl bg-[var(--brand-container)] text-[var(--brand)] flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <p className="text-sm text-[var(--md-on-surface-variant)] flex-1">
            <strong className="text-[var(--md-on-surface)]">
              Secure checkout by Tip4Serv.
            </strong>{" "}
            Card details are handled on Tip4Serv&apos;s PCI-compliant
            infrastructure — SoniicSMP and libreDroid never see them. The
            catalog below is fetched live every 5 minutes.
          </p>
          <div className="flex items-center gap-2">
            {data?.fetchedAt && !loading && (
              <span className="text-[10px] text-[var(--md-on-surface-variant)] hidden sm:inline">
                refreshed{" "}
                {new Date(data.fetchedAt).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            )}
            <button
              type="button"
              onClick={refresh}
              disabled={loading}
              aria-label="Refresh the live store"
              className="grid place-items-center w-9 h-9 rounded-full text-[var(--md-on-surface-variant)] hover:text-[var(--brand)] hover:bg-[var(--brand-container)] transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <a
              href={TIP4SERV_SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="m3-btn m3-btn-text"
            >
              <ExternalLink className="w-4 h-4" />
              Open shop
            </a>
          </div>
        </div>

        {/* States */}
        {loading && <LoadingSkeleton />}

        {!loading && error && (
          <ErrorState error={error} onRetry={refresh} />
        )}

        {!loading && !error && data && data.products.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.products.map((p) => (
              <LiveProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}

        {!loading && !error && data && data.products.length === 0 && (
          <div className="m3-card rounded-2xl p-8 text-center text-sm text-[var(--md-on-surface-variant)]">
            Tip4Serv returned no products. The shop may be empty right now —
            try again in a minute or open the shop directly.
          </div>
        )}

        {/* API badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[var(--md-on-surface-variant)]">
          <Lock className="w-3.5 h-3.5 text-[var(--brand)]" />
          <span className="font-mono">GET /api/store → soniic.tip4serv.com</span>
          <span className="text-[var(--md-outline)]">·</span>
          <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[var(--brand-container)] text-[var(--brand)]">
            Powered by Tip4Serv
          </span>
        </div>
      </div>
    </section>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="m3-card rounded-2xl p-6 flex flex-col gap-4 animate-pulse"
        >
          <div className="h-40 rounded-xl bg-[var(--md-surface-container-high)]" />
          <div className="h-5 w-2/3 rounded bg-[var(--md-surface-container-high)]" />
          <div className="h-3 w-full rounded bg-[var(--md-surface-container-high)]" />
          <div className="h-3 w-3/4 rounded bg-[var(--md-surface-container-high)]" />
          <div className="h-10 mt-2 rounded-full bg-[var(--md-surface-container-high)]" />
        </div>
      ))}
    </div>
  );
}

function ErrorState({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <div className="m3-card rounded-2xl p-10 flex flex-col items-center gap-4 text-center">
      <span className="grid place-items-center w-14 h-14 rounded-2xl bg-[var(--brand-container)] text-[var(--brand)]">
        <AlertTriangle className="w-7 h-7" />
      </span>
      <div>
        <h3 className="text-lg font-semibold text-[var(--md-on-surface)]">
          Couldn&apos;t reach the Tip4Serv shop
        </h3>
        <p className="text-sm text-[var(--md-on-surface-variant)] mt-1 max-w-md">
          {error}. You can still browse and purchase directly on Tip4Serv.
        </p>
      </div>
      <div className="flex gap-3">
        <button onClick={onRetry} className="m3-btn m3-btn-tonal">
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
        <a
          href={TIP4SERV_SHOP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="m3-btn m3-btn-filled"
        >
          Open Tip4Serv
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

function LiveProductCard({ product }: { product: Tip4ServProduct }) {
  return (
    <article
      className="m3-card m3-card-hover rounded-2xl overflow-hidden flex flex-col"
      style={{ ["--accent" as string]: "#4AA3DF" }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] bg-[var(--md-surface-container-high)] overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="grid place-items-center h-full text-[var(--md-on-surface-variant)] text-sm">
            No image
          </div>
        )}
        {product.discount && (
          <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#EE2525] text-white shadow-lg">
            {product.discount}
          </span>
        )}
        {/* Live badge */}
        <span className="absolute top-3 left-3 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-black/60 text-[#00FF79] backdrop-blur-sm flex items-center gap-1">
          <span className="pulse-dot" style={{ width: 6, height: 6 }} />
          Live
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="text-lg font-bold text-[var(--md-on-surface)]">
            {product.title}
          </h3>
          <div className="flex items-baseline gap-2 mt-1">
            {product.oldPrice && (
              <span className="text-sm text-[var(--md-on-surface-variant)] line-through font-mono">
                {product.oldPrice}
              </span>
            )}
            {product.newPrice && (
              <span className="text-2xl font-extrabold font-mono text-[var(--brand)]">
                {product.newPrice}
              </span>
            )}
          </div>
        </div>

        {product.perks.length > 0 && (
          <ul className="flex flex-col gap-1.5 max-h-44 overflow-y-auto scrollbar-mc pr-1">
            {product.perks.map((p, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-[var(--md-on-surface-variant)]"
              >
                <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[var(--brand)]" />
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        )}

        <a
          href={product.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Purchase ${product.title} on Tip4Serv`}
          className="m3-btn m3-btn-filled w-full mt-auto"
        >
          Purchase on Tip4Serv
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}
