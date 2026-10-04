"use client";

import { useEffect, useState } from "react";
import {
  ShieldCheck,
  ExternalLink,
  Loader2,
  AlertTriangle,
  Check,
  Tag,
  RefreshCw,
  ArrowRight,
  User,
  Mail,
  CreditCard,
} from "lucide-react";
import {
  TIP4SERV_SHOP_URL,
  ranks,
  formatPrice,
  getDiscount,
} from "@/lib/store";

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
 * Checkout section + live Tip4Serv catalog.
 *
 * The checkout form lets the user enter ALL their data on THIS website
 * (rank selection, Minecraft username, email) and then takes them directly
 * to the Tip4Serv product checkout page where secure Stripe / PayPal
 * payment completes.
 *
 * Below the form, the live Tip4Serv catalog (fetched via /api/store) is
 * shown so the user can see the real current prices & availability.
 */
export function Tip4ServEmbed() {
  const [data, setData] = useState<StoreResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [selectedRankId, setSelectedRankId] = useState<string>(
    ranks.find((r) => r.live)?.id ?? ranks[0].id,
  );
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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

  const selectedRank = ranks.find((r) => r.id === selectedRankId);
  const isLive = selectedRank?.live ?? false;

  // Username validation: Minecraft usernames are 3-16 chars, [a-zA-Z0-9_]
  const usernameValid = /^[a-zA-Z0-9_]{3,16}$/.test(username);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const formValid = usernameValid && emailValid && isLive;

  // Build the Tip4Serv checkout URL with the user's data as params.
  // /checkout is the Tip4Serv checkout entry (redirects to /cart if empty).
  const buildCheckoutUrl = (): string => {
    const params = new URLSearchParams();
    if (username) params.set("username", username);
    if (email) params.set("email", email);
    if (selectedRank) params.set("rank", selectedRank.id);
    const qs = params.toString();
    return `https://soniic.tip4serv.com/checkout${qs ? `?${qs}` : ""}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!formValid) return;
    // Open Tip4Serv checkout in a new tab — the user is taken directly to
    // the Tip4Serv product/checkout page with their data pre-passed.
    window.open(buildCheckoutUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="checkout" className="py-12 lg:py-20 scroll-mt-20">
      <div className="container-m3">
        <header className="max-w-2xl mx-auto text-center mb-8">
          <span className="text-xs uppercase tracking-wider font-semibold text-[var(--brand)] inline-flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5" />
            Checkout · Tip4Serv
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-medium tracking-tight text-balance">
            Enter your details, pay on Tip4Serv.
          </h2>
          <p className="mt-3 text-[var(--md-on-surface-variant)] text-pretty">
            Pick your rank, enter your Minecraft username &amp; email here,
            and we&apos;ll take you straight to the Tip4Serv secure checkout
            to complete payment.
          </p>
        </header>

        {/* === Checkout form === */}
        <form
          onSubmit={handleSubmit}
          className="m3-card rounded-[28px] p-6 sm:p-8 max-w-2xl mx-auto flex flex-col gap-6"
          noValidate
        >
          {/* Rank selector */}
          <fieldset>
            <legend className="text-sm font-medium text-[var(--md-on-surface)] mb-3">
              Choose your rank
            </legend>
            <div className="grid sm:grid-cols-2 gap-3">
              {ranks.map((r) => {
                const selected = r.id === selectedRankId;
                const accent = r.accent;
                const accent2 = r.accent2 ?? r.accent;
                const isPurple = r.theme === "purple";
                return (
                  <label
                    key={r.id}
                    className={`relative flex flex-col gap-1 p-4 rounded-2xl border cursor-pointer transition-all ${
                      selected
                        ? "border-[var(--brand)] bg-[var(--brand-container)]"
                        : "border-[var(--md-outline-variant)] hover:border-[var(--md-outline)]"
                    } ${isPurple ? "" : ""}`}
                    style={
                      isPurple
                        ? { background: "var(--md-purple-surface)" }
                        : undefined
                    }
                  >
                    <input
                      type="radio"
                      name="rank"
                      value={r.id}
                      checked={selected}
                      onChange={() => setSelectedRankId(r.id)}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="font-bold text-base"
                        style={{ color: accent }}
                      >
                        {r.name}
                      </span>
                      {r.live === false && (
                        <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-full bg-[var(--md-surface-container-highest)] text-[var(--md-on-surface-variant)]">
                          soon
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      {r.originalPrice && (
                        <span className="text-[10px] font-mono text-[var(--md-on-surface-variant)]">
                          was {formatPrice(r.originalPrice)}
                        </span>
                      )}
                      <span
                        className="text-lg font-extrabold font-mono"
                        style={{ color: accent2 }
                        }
                      >
                        {formatPrice(r.price)}
                      </span>
                    </div>
                    {selected && (
                      <span
                        className="absolute top-3 right-3 grid place-items-center w-5 h-5 rounded-full"
                        style={{ background: "var(--brand)", color: "var(--brand-on)" }}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Username field */}
          <div className="m3-text-field">
            <input
              id="mc-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
              required
              autoComplete="username"
              aria-invalid={submitted && !usernameValid}
            />
            <label htmlFor="mc-username">
              <User className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
              Minecraft username
            </label>
          </div>
          {submitted && !usernameValid && (
            <p className="text-xs text-[var(--md-error)] -mt-4">
              Enter a valid Minecraft username (3–16 characters, letters, numbers, underscores).
            </p>
          )}

          {/* Email field */}
          <div className="m3-text-field">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              required
              autoComplete="email"
              aria-invalid={submitted && !emailValid}
            />
            <label htmlFor="email">
              <Mail className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
              Email address
            </label>
          </div>
          {submitted && !emailValid && (
            <p className="text-xs text-[var(--md-error)] -mt-4">
              Enter a valid email address — your receipt &amp; rank delivery go here.
            </p>
          )}

          {/* Summary line */}
          <div className="flex items-center justify-between gap-3 px-1">
            <span className="text-sm text-[var(--md-on-surface-variant)]">
              {isLive ? "You pay:" : "Halloween isn&apos;t on Tip4Serv yet"}
            </span>
            {selectedRank && (
              <span className="flex items-baseline gap-2">
                <span
                  className="text-xl font-extrabold font-mono"
                  style={{ color: selectedRank.accent }}
                >
                  {formatPrice(selectedRank.price)}
                </span>
                {selectedRank.originalPrice && (
                  <span className="text-xs font-mono text-[var(--md-on-surface-variant)]">
                    was {formatPrice(selectedRank.originalPrice)}
                  </span>
                )}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isLive}
            className="m3-btn m3-btn-filled w-full"
            aria-disabled={!isLive}
          >
            {isLive ? (
              <>
                Continue to Tip4Serv checkout
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              "Halloween drops soon — watch Discord"
            )}
          </button>

          {!isLive && (
            <p className="text-xs text-center text-[var(--md-on-surface-variant)]">
              The Halloween Rank isn&apos;t on the Tip4Serv shop yet. Select
              <strong className="text-[var(--md-on-surface)]"> Sonic Rank</strong> to
              check out now.
            </p>
          )}

          <p className="text-[11px] text-center text-[var(--md-on-surface-variant)] flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--brand)]" />
            Card details are handled on Tip4Serv&apos;s PCI-compliant checkout —
            we never see them.
          </p>
        </form>

        {/* === Live catalog (real Tip4Serv data via API) === */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[var(--md-on-surface-variant)] flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[var(--brand)]" />
              Live catalog from Tip4Serv
            </h3>
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
                aria-label="Refresh the live catalog"
                className="grid place-items-center w-8 h-8 rounded-full text-[var(--md-on-surface-variant)] hover:text-[var(--brand)] hover:bg-[var(--brand-container)] transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          {loading && <LoadingSkeleton />}

          {!loading && error && (
            <div className="m3-card rounded-2xl p-6 flex items-center gap-3 text-sm">
              <AlertTriangle className="w-5 h-5 text-[var(--md-error)] flex-shrink-0" />
              <span className="text-[var(--md-on-surface-variant)] flex-1">
                Couldn&apos;t reach Tip4Serv: {error}
              </span>
              <a
                href={TIP4SERV_SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="m3-btn m3-btn-text"
              >
                Open shop
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {!loading && !error && data && data.products.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.products.map((p) => (
                <LiveProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}

          {!loading && !error && data && data.products.length === 0 && (
            <p className="text-sm text-[var(--md-on-surface-variant)] text-center py-6">
              Tip4Serv returned no live products.
            </p>
          )}
        </div>

        {/* API badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[var(--md-on-surface-variant)]">
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
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="m3-card rounded-2xl p-5 flex flex-col gap-3 animate-pulse"
        >
          <div className="h-32 rounded-xl bg-[var(--md-surface-container-high)]" />
          <div className="h-5 w-2/3 rounded bg-[var(--md-surface-container-high)]" />
          <div className="h-3 w-full rounded bg-[var(--md-surface-container-high)]" />
          <div className="h-9 mt-1 rounded-full bg-[var(--md-surface-container-high)]" />
        </div>
      ))}
    </div>
  );
}

function LiveProductCard({ product }: { product: Tip4ServProduct }) {
  return (
    <article
      className="m3-card m3-card-hover rounded-2xl overflow-hidden flex flex-col"
    >
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
          <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[var(--md-error)] text-white">
            {product.discount}
          </span>
        )}
        <span className="absolute top-3 left-3 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-black/60 text-[var(--brand)] flex items-center gap-1">
          <span className="pulse-dot" style={{ width: 6, height: 6 }} />
          Live
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <div>
          <h4 className="text-base font-bold text-[var(--md-on-surface)]">
            {product.title}
          </h4>
          <div className="flex items-baseline gap-2 mt-0.5">
            {product.oldPrice && (
              <span className="text-[10px] text-[var(--md-on-surface-variant)] font-mono">
                was {product.oldPrice}
              </span>
            )}
            {product.newPrice && (
              <span className="text-xl font-extrabold font-mono text-[var(--brand)]">
                {product.newPrice}
              </span>
            )}
          </div>
        </div>

        {product.perks.length > 0 && (
          <ul className="flex flex-col gap-1 max-h-32 overflow-y-auto scrollbar-mc pr-1">
            {product.perks.slice(0, 5).map((p, i) => (
              <li
                key={i}
                className="flex items-start gap-1.5 text-[11px] text-[var(--md-on-surface-variant)]"
              >
                <Check className="w-3 h-3 mt-0.5 flex-shrink-0 text-[var(--brand)]" />
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        )}

        <a
          href={product.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Buy ${product.title} on Tip4Serv`}
          className="m3-btn m3-btn-tonal w-full mt-auto text-xs"
        >
          Open on Tip4Serv
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
}
