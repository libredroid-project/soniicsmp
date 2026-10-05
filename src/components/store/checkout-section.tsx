"use client";

import { useEffect, useState } from "react";
import {
  ShieldCheck,
  CreditCard,
  User,
  Mail,
  ArrowRight,
  Check,
  Ghost,
  AlertTriangle,
} from "lucide-react";
import {
  ranks,
  formatPrice,
  getDiscount,
} from "@/lib/store";

/**
 * Checkout section. The user enters ALL their data on this website
 * (rank, Minecraft username, email). Our API route (src/app/api/checkout)
 * exchanges that for a pre-filled Tip4Serv hosted checkout URL, where the
 * secure Stripe / PayPal payment happens — no shop embed needed.
 */
export function CheckoutSection() {
  const [selectedRankId, setSelectedRankId] = useState<string>(
    ranks.find((r) => r.live)?.id ?? ranks[0].id,
  );
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [returnStatus, setReturnStatus] = useState<"success" | "pending" | null>(null);

  // Show a banner when the user returns from the Tip4Serv payment.
  useEffect(() => {
    const status = new URLSearchParams(window.location.search).get("checkout");
    if (status === "success" || status === "pending") setReturnStatus(status);
  }, []);

  const selectedRank = ranks.find((r) => r.id === selectedRankId);
  const isLive = selectedRank?.live ?? false;

  const usernameValid = /^[a-zA-Z0-9_]{3,16}$/.test(username);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const formValid = usernameValid && emailValid && isLive;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setError(null);
    if (!formValid || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rankId: selectedRankId,
          username,
          email,
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      window.location.assign(data.url);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="checkout" className="py-12 lg:py-20 scroll-mt-20">
      <div className="container-m3">
        <header className="max-w-2xl mx-auto text-center mb-8">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase font-semibold text-[var(--brand)] inline-flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5" />
            Checkout
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-medium tracking-tight text-balance">
            Enter your details, pay on Tip4Serv.
          </h2>
          <p className="mt-3 text-[var(--md-on-surface-variant)] text-pretty">
            Pick your rank and enter your Minecraft username &amp; email here —
            we&apos;ll take you straight to Tip4Serv&apos;s secure hosted
            checkout (Stripe / PayPal) with your order pre-filled, and back
            here afterwards.
          </p>
        </header>

        {returnStatus && (
          <div
            className="m3-card rounded-2xl p-4 max-w-2xl mx-auto mb-6 flex items-start gap-3"
            style={{ background: "var(--md-surface-container-low)" }}
          >
            <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-[var(--brand)]" />
            <p className="text-sm text-[var(--md-on-surface)]">
              {returnStatus === "success"
                ? "Payment received! Your rank is being delivered — join soniicsmp.de and run /sync in-game if it hasn't appeared within a few minutes."
                : "Your payment is being verified. This usually takes a few minutes — you'll receive a confirmation email once your rank is delivered."}
            </p>
          </div>
        )}

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
                const discount = getDiscount(r);
                return (
                  <label
                    key={r.id}
                    className={`relative flex flex-col gap-1 p-4 rounded-2xl border cursor-pointer transition-all ${
                      selected
                        ? "border-[var(--brand)] bg-[var(--brand-container)]"
                        : "border-[var(--md-outline-variant)] hover:border-[var(--md-outline)]"
                    }`}
                    style={
                      isPurple ? { background: "var(--md-purple-surface)" } : undefined
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
                        style={{ color: accent2 }}
                      >
                        {formatPrice(r.price)}
                      </span>
                      {discount && (
                        <span className="text-[9px] font-mono text-[var(--brand)]">
                          {discount}% off
                        </span>
                      )}
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
              Enter a valid Minecraft username (3 to 16 characters, letters, numbers, underscores).
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
              Enter a valid email address. Your receipt &amp; rank delivery go here.
            </p>
          )}

          {/* Summary line */}
          <div className="flex items-center justify-between gap-3 px-1">
            <span className="text-sm text-[var(--md-on-surface-variant)]">
              {isLive ? "You pay:" : "Halloween isn't on Tip4Serv yet"}
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

          {error && (
            <p className="text-sm text-[var(--md-error)] flex items-start gap-2 -mt-2">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!isLive || loading}
            className="m3-btn m3-btn-filled w-full"
          >
            {loading ? (
              "Connecting to checkout…"
            ) : isLive ? (
              <>
                Continue to secure checkout
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              "Halloween drops soon. Watch Discord"
            )}
          </button>

          {!isLive && (
            <p className="text-xs text-center text-[var(--md-on-surface-variant)]">
              The Halloween Rank isn&apos;t on the Tip4Serv shop yet. Select{" "}
              <strong className="text-[var(--md-on-surface)]">Sonic Rank</strong>{" "}
              to check out now.
            </p>
          )}

          <p className="text-[11px] text-center text-[var(--md-on-surface-variant)] flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--brand)]" />
            Payment runs on Tip4Serv&apos;s PCI-compliant checkout (Stripe /
            PayPal). We never see your card details.
          </p>
        </form>

        {selectedRank && !isLive && (
          <div className="m3-card rounded-[28px] p-10 max-w-2xl mx-auto mt-8 flex flex-col items-center gap-4 text-center">
            <span
              className="grid place-items-center w-14 h-14 rounded-2xl"
              style={{
                background: `${selectedRank.accent}1f`,
                color: selectedRank.accent,
              }}
            >
              <Ghost className="w-7 h-7" />
            </span>
            <h3 className="text-xl font-bold" style={{ color: selectedRank.accent }}>
              {selectedRank.name} is almost here
            </h3>
            <p className="text-sm text-[var(--md-on-surface-variant)] max-w-md text-pretty">
              The Halloween Rank drops later this October — until then you can
              grab the{" "}
              <strong className="text-[var(--md-on-surface)]">Sonic Rank</strong>{" "}
              above and get every base perk now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
