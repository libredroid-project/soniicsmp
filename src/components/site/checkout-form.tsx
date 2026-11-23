"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Alert02Icon,
  ArrowUpRightIcon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RANKS, SITE, formatPrice } from "@/lib/site-config";
import { BrandText } from "@/components/site/wordmark";
import { cn } from "@/lib/utils";

type ReturnState = "success" | "pending" | null;

const USERNAME_RE = /^[a-zA-Z0-9_]{3,16}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CheckoutForm() {
  const [rankId, setRankId] = React.useState(RANKS[0].id);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [returnState, setReturnState] = React.useState<ReturnState>(null);

  React.useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("checkout");
    if (param === "success" || param === "pending") setReturnState(param);
  }, []);

  const rank = RANKS.find((r) => r.id === rankId) ?? RANKS[0];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    if (!rank.live) {
      setError("This rank is not available for checkout yet.");
      return;
    }
    if (!USERNAME_RE.test(username.trim())) {
      setError(
        "Enter a valid Minecraft username (3 to 16 letters, numbers or underscores)."
      );
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rankId: rank.id,
          username: username.trim(),
          email: email.trim(),
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        url?: string;
        error?: string;
      } | null;
      if (!res.ok || !data?.url) {
        setError(data?.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      // Hand off to Tip4Serv's pre-filled hosted checkout page.
      window.location.href = data.url;
    } catch {
      setError(
        "Could not reach the checkout. Please check your connection and try again."
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      {returnState && (
        <Alert className="mb-6">
          <HugeiconsIcon
            icon={returnState === "success" ? CheckmarkCircle02Icon : Clock01Icon}
            strokeWidth={2}
          />
          <AlertTitle>
            {returnState === "success" ? "Payment received" : "Payment pending"}
          </AlertTitle>
          <AlertDescription>
            {returnState === "success"
              ? "Thanks for supporting SoniicSMP! Your rank lands in-game within 60 seconds. Run /sync if anything is missing."
              : "Your payment is still processing. Your rank will be delivered as soon as it completes."}
          </AlertDescription>
        </Alert>
      )}

      <Card className="rounded-2xl bg-[#111111] shadow-none ring-0">
        <CardHeader>
          <CardTitle className="text-white">Your order</CardTitle>
          <CardDescription className="text-dim">
            <BrandText>
              Your details are collected here and handed to Tip4Serv&apos;s
              PCI-compliant checkout (Stripe / PayPal) already pre-filled, so
              all you do there is pay. SoniicSMP never sees your card details,
              and your rank is delivered in-game within 60 seconds.
            </BrandText>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            {/* Rank selection */}
            <div className="flex flex-col gap-2">
              <Label>Rank</Label>
              <RadioGroup value={rankId} onValueChange={setRankId} className="grid gap-3">
                {RANKS.map((r) => (
                  <Label
                    key={r.id}
                    htmlFor={`rank-${r.id}`}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
                      "has-[button[data-state=checked]]:border-foreground/40 has-[button[data-state=checked]]:bg-muted",
                      !r.live && "cursor-not-allowed opacity-60"
                    )}
                  >
                    <RadioGroupItem
                      value={r.id}
                      id={`rank-${r.id}`}
                      disabled={!r.live}
                      className="mt-0.5"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium">{r.name}</span>
                        {!r.live && <Badge variant="secondary">soon</Badge>}
                        <Badge variant="secondary">{r.discountPercent}% off</Badge>
                        <span className="ml-auto text-sm">
                          <span className="mr-1.5 text-xs text-muted-foreground line-through">
                            {formatPrice(r.originalPrice)}
                          </span>
                          <span className="font-semibold">{formatPrice(r.price)}</span>
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {r.live ? r.tagline : "Coming soon to the Tip4Serv checkout"}
                      </p>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {/* Minecraft username */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="mc-username">Minecraft username</Label>
              <Input
                id="mc-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. Steve"
                autoComplete="username"
                spellCheck={false}
                maxLength={16}
                disabled={submitting}
                required
              />
              <p className="text-xs text-dim">
                The exact name you log in with, Java or Bedrock. Your rank is
                delivered to this account.
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                spellCheck={false}
                disabled={submitting}
                required
              />
              <p className="text-xs text-dim">
                Only used for your Tip4Serv receipt and support tickets.
              </p>
            </div>

            {/* Summary */}
            <div className="flex items-center justify-between rounded-xl border border-dashed border-border bg-muted/50 px-4 py-3">
              <span className="text-sm text-muted-foreground">
                {rank.name}
              </span>
              <span className="flex items-baseline gap-2">
                <span className="text-xl font-semibold tabular-nums">
                  {formatPrice(rank.price)}
                </span>
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(rank.originalPrice)}
                </span>
              </span>
            </div>

            {error && (
              <Alert variant="destructive">
                <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} />
                <AlertTitle>Checkout failed</AlertTitle>
                <AlertDescription>
                  {error}{" "}
                  {error.toLowerCase().includes("unreachable") && (
                    <a
                      href={SITE.tip4serv.shop}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-4"
                    >
                      Open the Tip4Serv shop
                    </a>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <HugeiconsIcon
                    icon={Loading03Icon}
                    strokeWidth={2}
                    data-icon="inline-start"
                    className="animate-spin"
                  />
                  Preparing your checkout
                </>
              ) : (
                <>
                  Continue to payment
                  <HugeiconsIcon
                    icon={ArrowUpRightIcon}
                    strokeWidth={2}
                    data-icon="inline-end"
                  />
                </>
              )}
            </Button>

            <p className="text-center text-xs text-dim">
              Sonic Rank is live now · Halloween Rank returns each October
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
