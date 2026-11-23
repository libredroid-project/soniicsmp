import type { ReactNode } from "react";
import {
  ArrowRight,
  Check,
  CreditCard,
  Gamepad2,
  Infinity as InfinityIcon,
  Server,
  ShoppingBag,
  Swords,
  Users,
  X,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CtaPixelCanvas } from "@/components/site/cta-pixel-canvas";
import { RevealGroup } from "@/components/site/reveal";
import { ServerStatusCard } from "@/components/site/server-status-card";
import { Tilt } from "@/components/site/tilt";
import { BrandText, Wordmark } from "@/components/site/wordmark";
import { FAQS, RANKS, SITE, STEPS, formatPrice } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/* ── Shared bits (aesthetic.pub anatomy) ────────────────────────────── */

/** Handwritten "v2 coming soon" scrawl in Minecraft green, marker font. */
function V2Scrawl({ className }: { className?: string }) {
  return (
    <span
      aria-label="SoniicSMP v2 is coming soon"
      className={cn(
        "relative inline-block font-hand font-bold leading-none text-[#55FF55] select-none",
        className
      )}
    >
      <span className="relative z-10">v2 coming soon</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 220 16"
        preserveAspectRatio="none"
        className="absolute -bottom-2 left-0 h-2.5 w-full text-[#55FF55]/70"
      >
        <path
          d="M3 10 C 40 4, 75 14, 110 8 C 145 3, 180 13, 217 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

function SectionHeading({
  title,
  lead,
}: {
  title: string;
  lead: ReactNode;
}) {
  return (
    <div className="reveal mx-auto max-w-xl text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-4 text-lg leading-relaxed text-dim">{lead}</p>
    </div>
  );
}

/** Deterministic 0..1 hash, identical on server & client (no hydration drift). */
function hash(i: number): number {
  const s = Math.sin(i * 12.9898) * 43758.5453;
  return s - Math.floor(s);
}

/** Alpha for one mosaic cell: ~40% invisible, the rest faint white. */
function cellAlpha(i: number): number {
  if (hash(i + 1) > 0.4) return 0;
  return 0.03 + hash(i + 50) * 0.06;
}

/** Bar height (%) for the delivery graph. */
function barHeight(i: number): number {
  return Math.round(38 + hash(i + 7) * 34);
}

const MOSAIC_CORNERS = {
  tl: "top-0 left-0 [mask-image:linear-gradient(to_bottom_right,black,transparent_65%)]",
  tr: "top-0 right-0 [mask-image:linear-gradient(to_bottom_left,black,transparent_65%)]",
  bl: "bottom-0 left-0 [mask-image:linear-gradient(to_top_right,black,transparent_65%)]",
  br: "bottom-0 right-0 [mask-image:linear-gradient(to_top_left,black,transparent_65%)]",
} as const;

/** The 10×5 pixel mosaic that bleeds out of a card corner. */
function PixelMosaic({ corner }: { corner: keyof typeof MOSAIC_CORNERS }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
    >
      <div
        className={cn(
          "absolute grid w-40 grid-cols-10 gap-px opacity-90 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none",
          MOSAIC_CORNERS[corner]
        )}
      >
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="h-4 w-full"
            style={{
              backgroundColor: `rgba(255,255,255,${cellAlpha(i).toFixed(3)})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────── */

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto max-w-7xl px-6 pt-64 pb-28 text-center sm:pt-72"
    >
      <div className="flex flex-col items-center">
        <V2Scrawl className="animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-700 [animation-delay:80ms] mb-7 -rotate-3 text-5xl sm:text-6xl" />

        <Wordmark
          as="h1"
          className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 [animation-delay:200ms] text-6xl font-bold tracking-tight sm:text-7xl"
        />

        <p className="text-muted-foreground animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 [animation-delay:320ms] mt-4 max-w-xl text-lg leading-relaxed">
          <BrandText>
            The official SoniicSMP store. Pick a rank, pay securely via
            Tip4Serv, and keep the survival server alive.
          </BrandText>
        </p>

        <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 [animation-delay:440ms] mt-8 flex items-center justify-center gap-3">
          <Button asChild size="lg">
            <a href="#ranks">
              View ranks
              <ArrowRight data-icon="inline-end" />
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <a href={SITE.discordUrl} target="_blank" rel="noopener noreferrer">
              Discord
            </a>
          </Button>
        </div>

        <ServerStatusCard className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 [animation-delay:560ms]" />
      </div>
    </section>
  );
}

/* ── Why support us · bento grid ────────────────────────────────────── */

export function FeaturesSection() {
  return (
    <section id="why-support" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <RevealGroup>
      <SectionHeading
        title="Built for real players, not for profit."
        lead={
          <BrandText>
            SoniicSMP is a community-funded survival server. Every rank purchase
            pays for hosting, plugins and development, and you get permanent
            perks back.
          </BrandText>
        }
      />

      <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* The server itself · full-width spawn screenshot */}
        <Card className="reveal group relative gap-0 overflow-hidden rounded-xl bg-[#111111] p-0 shadow-none ring-0 transition-colors duration-300 ease-in-out hover:bg-[#131313] sm:col-span-2 lg:col-span-4">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/soniic-spawn.png"
              alt="The SoniicSMP spawn plaza: players gathered around gold, special and key-all crates, with the season leaderboard on the left"
              width={1920}
              height={1080}
              loading="lazy"
              className="aspect-video w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
            <V2Scrawl className="absolute right-5 top-3.5 z-10 rotate-2 text-3xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] sm:text-4xl" />
          </div>
          <CardContent className="p-6">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-dim">
              Season 1 · spawn plaza
            </p>
            <CardTitle className="mt-2 text-white">
              This is what you keep online
            </CardTitle>
            <CardDescription className="mt-2 max-w-2xl text-dim">
              Crate events, a player-run economy and a spawn that never sleeps.
              Every rank purchase goes straight into keeping this world running
              while we build v2.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Instant delivery · wide, delivery-time graph */}
        <Card className="reveal group relative gap-3 rounded-xl bg-[#111111] shadow-none ring-0 transition-colors duration-300 ease-in-out hover:bg-[#131313] [animation-delay:80ms] sm:col-span-2">
          <PixelMosaic corner="tl" />
          <CardHeader className="flex flex-row items-center gap-2.5">
            <Zap className="size-4 text-dim" aria-hidden="true" />
            <CardTitle className="text-white">Instant delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-dim">
              Your rank lands in-game within 60 seconds of payment. No staff
              needed, no waiting, no tickets.
            </CardDescription>
            <div aria-hidden="true" className="mt-6 flex h-16 items-end gap-1">
              {Array.from({ length: 24 }, (_, i) => (
                <div
                  key={i}
                  className={cn(
                    "bento-bar flex-1 rounded-sm",
                    hash(i + 3) > 0.6
                      ? "bg-[#2e2e2e] group-hover:bg-[#454545]"
                      : hash(i + 3) > 0.3
                        ? "bg-[#272727] group-hover:bg-[#3a3a3a]"
                        : "bg-[#212121] group-hover:bg-[#333333]"
                  )}
                  style={{
                    height: `${barHeight(i)}%`,
                    transitionDelay: `${i * 25}ms`,
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Keeps the server free */}
        <Card className="reveal group relative gap-3 rounded-xl bg-[#111111] shadow-none ring-0 transition-colors duration-300 ease-in-out hover:bg-[#131313] [animation-delay:140ms]">
          <PixelMosaic corner="tr" />
          <CardHeader className="flex flex-row items-center gap-2.5">
            <Server className="size-4 text-dim" aria-hidden="true" />
            <CardTitle className="text-white">Keeps the server free</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-dim">
              Every euro goes to hosting, plugins and developer time. No ads, no
              paywalls, ever.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Permanent ranks */}
        <Card className="reveal group relative gap-3 rounded-xl bg-[#111111] shadow-none ring-0 transition-colors duration-300 ease-in-out hover:bg-[#131313] [animation-delay:200ms]">
          <CardHeader className="flex flex-row items-center gap-2.5">
            <InfinityIcon className="size-4 text-dim" aria-hidden="true" />
            <CardTitle className="text-white">Permanent ranks</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-dim">
              Pay once, keep it forever. Ranks never expire, and future perks
              land free.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Non pay-to-win */}
        <Card className="reveal group relative gap-3 rounded-xl bg-[#111111] shadow-none ring-0 transition-colors duration-300 ease-in-out hover:bg-[#131313] [animation-delay:260ms]">
          <CardHeader className="flex flex-row items-center gap-2.5">
            <Swords className="size-4 text-dim" aria-hidden="true" />
            <CardTitle className="text-white">Non pay-to-win</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-dim">
              Convenience and cosmetics only, never combat advantage in fair
              PvP.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Secure checkout · payment chips */}
        <Card className="reveal group relative gap-3 rounded-xl bg-[#111111] shadow-none ring-0 transition-colors duration-300 ease-in-out hover:bg-[#131313] [animation-delay:320ms]">
          <PixelMosaic corner="bl" />
          <CardHeader className="flex flex-row items-center gap-2.5">
            <CreditCard className="size-4 text-dim" aria-hidden="true" />
            <CardTitle className="text-white">Secure Tip4Serv checkout</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-dim">
              Rank, username and email are filled in right here on the store.
              Tip4Serv only runs the payment: Stripe / PayPal handle the card,
              and your card details never touch our site.
            </CardDescription>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {["Tip4Serv", "Stripe", "PayPal"].map((m) => (
                <span
                  key={m}
                  className="rounded-full bg-[#1d1d1d] px-3 py-1 text-xs font-medium text-dim"
                >
                  {m}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real human support · wide, ticket chat */}
        <Card className="reveal group relative gap-3 rounded-xl bg-[#111111] shadow-none ring-0 transition-colors duration-300 ease-in-out hover:bg-[#131313] [animation-delay:380ms] sm:col-span-2">
          <PixelMosaic corner="br" />
          <CardHeader className="flex flex-row items-center gap-2.5">
            <Users className="size-4 text-dim" aria-hidden="true" />
            <CardTitle className="text-white">Real human support</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="max-w-md text-dim">
              Any rank, payment or delivery issue: open a ticket on Discord and a
              staff member gets back to you within hours.
            </CardDescription>
            <div className="mt-5 flex flex-col gap-2">
              <div className="flex justify-end">
                <div className="w-fit max-w-[80%] rounded-3xl bg-white px-3 py-2 text-xs font-medium text-black">
                  My rank didn&apos;t arrive yet!
                </div>
              </div>
              <div className="flex items-end gap-2">
                <span
                  aria-hidden="true"
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white font-heading text-xs font-bold text-black"
                >
                  S
                </span>
                <div className="w-fit max-w-[80%] rounded-3xl bg-[#1e1e1e] px-3 py-2 text-xs leading-relaxed text-white/90">
                  On it, checking the Tip4Serv payment log for you now.
                </div>
              </div>
              <p className="mt-1 text-[10px] font-medium text-dim">
                Discord ticket · replies within hours
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      </RevealGroup>
    </section>
  );
}

/* ── How it works ────────────────────────────────────────────────────── */

const STEP_ICONS = [ShoppingBag, CreditCard, Gamepad2];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <RevealGroup>
      <SectionHeading
        title="From pick to in-game in three steps."
        lead="No waiting around, no staff ping-pong. The whole flow is automated end to end."
      />

      <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {STEPS.map((s, i) => {
          const Icon = STEP_ICONS[i];
          return (
            <Card
              key={s.n}
              className="reveal group relative gap-3 rounded-xl bg-[#111111] shadow-none ring-0 transition-colors duration-300 ease-in-out hover:bg-[#131313]"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <CardHeader className="flex flex-row items-center gap-2.5">
                <Icon className="size-4 text-dim" aria-hidden="true" />
                <CardTitle className="text-white">{s.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <CardDescription className="text-dim">{s.text}</CardDescription>
                <p className="mt-auto pt-4 font-mono text-xs text-dim">
                  {s.n} / 03
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      </RevealGroup>
    </section>
  );
}

/* ── Ranks · pricing cards ─────────────────────────────────────────── */

function RankCard({
  rank,
  featured,
}: {
  rank: (typeof RANKS)[number];
  featured: boolean;
}) {
  const buyable = rank.live;
  return (
    <Card
      className={cn(
        "group relative gap-0 rounded-xl shadow-none ring-0 transition-colors duration-300 ease-in-out",
        featured
          ? "bg-[#131313]"
          : "bg-[#111111] hover:bg-[#131313]"
      )}
    >
      {featured && <PixelMosaic corner="tr" />}
      <CardHeader className="grid items-center gap-2.5">
        <CardTitle className="text-white">{rank.name}</CardTitle>
        <CardAction>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-medium",
              featured ? "bg-white text-black" : "bg-[#1e1e1e] text-dim"
            )}
          >
            {featured ? "Available now" : "Seasonal"}
          </span>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="mt-6 flex items-baseline gap-2 text-4xl font-semibold tracking-tight text-white tabular-nums">
          {formatPrice(rank.price)}
          <s className="text-lg font-normal text-dim">
            {formatPrice(rank.originalPrice)}
          </s>
        </p>
        <p className="mt-1.5 text-sm text-dim">
          {buyable ? "one payment, forever" : "returns each October · stacks on Sonic"}
        </p>
        <ul className="mt-6 space-y-2 text-sm">
          {rank.perks.map((perk) => (
            <li key={perk} className="flex items-start gap-2 text-dim">
              <Check className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              {perk}
            </li>
          ))}
          {!buyable && (
            <li className="flex items-center gap-2 text-dim opacity-40">
              <X className="size-3.5 shrink-0" aria-hidden="true" />
              Buyable during October only
            </li>
          )}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto pt-8">
        {buyable ? (
          <Button asChild className="w-full">
            <a href="#checkout">
              Get {rank.name}
              <ArrowRight data-icon="inline-end" />
            </a>
          </Button>
        ) : (
          <Button asChild variant="secondary" className="w-full">
            <a href={SITE.discordUrl} target="_blank" rel="noopener noreferrer">
              Get notified on Discord
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export function RanksSection() {
  return (
    <section id="ranks" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <RevealGroup>
      <SectionHeading
        title="Pick your rank"
        lead="Both ranks are permanent: pay once, keep them forever. Halloween includes everything in Sonic, plus spooky seasonal extras."
      />

      <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
        {RANKS.map((rank) => (
          <Tilt key={rank.id} className="reveal">
            <RankCard rank={rank} featured={rank.live} />
          </Tilt>
        ))}
      </div>
      </RevealGroup>
    </section>
  );
}

/* ── FAQ ─────────────────────────────────────────────────────────────── */

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-28">
      <RevealGroup>
      <SectionHeading
        title="Frequently asked questions."
        lead="Short answers about delivery, payments, ranks and refunds. For anything else, our team is one message away on Discord."
      />

      <div className="mx-auto mt-12 max-w-3xl">
        <Accordion
          type="single"
          collapsible
          className="gap-2 overflow-visible rounded-none border-0 bg-transparent"
        >
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="reveal rounded-xl border-0 bg-[#111111] transition-colors duration-300 data-open:bg-[#131313]"
            >
              <AccordionTrigger className="px-4 py-4 text-sm font-medium text-foreground hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-dim">
                <BrandText>{f.a}</BrandText>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      </RevealGroup>
    </section>
  );
}

/* ── CTA ─────────────────────────────────────────────────────────────── */

export function CtaSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-4 pb-28">
      <RevealGroup>
      <div className="reveal relative overflow-hidden rounded-2xl bg-[#111111]">
        <CtaPixelCanvas className="absolute inset-0 size-full" />
        <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
          <Wordmark className="text-2xl font-bold" />
          <h2 className="mt-8 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to join <Wordmark />?
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-dim">
            Pick a rank, hop in-game, and enjoy your perks. Every purchase keeps
            the server alive, and{" "}
            <BrandText>SoniicSMP v2</BrandText> is already on the way.
          </p>
          <Button asChild size="lg" className="mt-8">
            <a href="#checkout">
              Go to checkout
              <ArrowRight data-icon="inline-end" />
            </a>
          </Button>
          <p className="mt-6 text-sm text-dim">
            Java &amp; Bedrock crossplay · {SITE.ip}
          </p>
        </div>
      </div>
      </RevealGroup>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────── */

export function SiteFooter() {
  const columns: {
    title: string;
    links: { label: string; href: string; external?: boolean }[];
  }[] = [
    {
      title: "Shop",
      links: [
        { label: "Ranks", href: "#ranks" },
        { label: "Checkout", href: "#checkout" },
        { label: "How it works", href: "#how-it-works" },
        { label: "Tip4Serv store", href: SITE.tip4serv.shop, external: true },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "Discord", href: SITE.discordUrl, external: true },
        { label: `Play at ${SITE.ip}`, href: "#top" },
        { label: "FAQ", href: "#faq" },
        { label: "Support ticket", href: SITE.discordUrl, external: true },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Imprint", href: "/imprint" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: SITE.tip4serv.tos, external: true },
        { label: "Refund policy", href: "#faq" },
      ],
    },
  ];

  return (
    <footer className="mx-auto max-w-7xl px-6 py-12 text-sm text-muted-foreground">
      <nav
        aria-label="Footer"
        className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-3 sm:gap-x-20"
      >
        {columns.map((col) => (
          <div key={col.title} className="flex flex-col items-start gap-3">
            <p className="text-foreground">{col.title}</p>
            {col.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="w-fit transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </nav>

      <div className="mt-12 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p>
          © 2026 <BrandText>SoniicSMP</BrandText> · Not affiliated with Mojang
          or Microsoft
        </p>
        <p className="flex items-center gap-2">
          Payments by Tip4Serv ·{" "}
          <a
            href={SITE.madeBy.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground transition-colors hover:underline"
          >
            made by {SITE.madeBy.name}
          </a>
        </p>
      </div>
    </footer>
  );
}
