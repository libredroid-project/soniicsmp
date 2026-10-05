// =========================================================================
// SoniicSMP Store — Product Catalog & Tip4Serv Integration Config
// =========================================================================
// Made by libreDroid (https://github.com/libredroid-project)
//
// The store currently exposes exactly TWO ranks:
//   1) "Sonic Rank"  — the only rank that currently exists on the live
//                     Tip4Serv shop (soniic.tip4serv.com), shown in the
//                     uploaded screenshot (blue 3D logo, €5 → €4, -20%).
//   2) "Halloween Rank" — a NEW seasonal rank to be added for October.
//
// Payment is handled inline via the Tip4Serv shop embedded as an iframe
// (see src/components/store/tip4serv-embed.tsx) — Tip4Serv returns NO
// X-Frame-Options and NO frame-ancestors CSP, so the full secure checkout
// (Stripe / PayPal / local methods) renders directly on this page.
// =========================================================================

export const TIP4SERV_SHOP_URL = "https://soniic.tip4serv.com/";
// The Sonic Rank product page on Tip4Serv. This is what we embed in the
// checkout iframe: users add the rank to their cart and pay inside the
// embed, so items are ALWAYS in the cart before checkout.
export const TIP4SERV_SONIC_PRODUCT_URL = "https://soniic.tip4serv.com/product/soniic";
export const TIP4SERV_TOS_URL = "https://soniic.tip4serv.com/terms";
export const TIP4SERV_PP_URL = "https://soniic.tip4serv.com/privacy";
export const DISCORD_URL = "https://discord.gg/2Ssqjsc8FC";
export const SERVER_IP = "soniicsmp.de";
export const SERVER_NAME = "SoniicSMP";

export const MADE_BY = "libreDroid";
export const MADE_BY_URL = "https://github.com/libredroid-project";

export interface Rank {
  id: string;
  name: string;
  /** Marketing tagline shown under the rank name. */
  tagline: string;
  /** Short description shown in the card body. */
  description: string;
  /** Display price (what the customer pays now). */
  price: number;
  /** Original price (struck through). Optional — omit if no discount. */
  originalPrice?: number;
  /** Discount percentage shown as a badge, derived if not set. */
  discountPercent?: number;
  /** Accent color used for the logo glow, chips and CTA. */
  accent: string;
  /** Optional second accent for gradient effects (e.g. Halloween orange→purple). */
  accent2?: string;
  /** Surface theme for the card. 'purple' = dark purple background. */
  theme?: "default" | "purple";
  /** Badge shown top-right of the card. */
  badge?: "NEW" | "POPULAR" | "LIMITED" | "-20%" | "SEASONAL";
  /** Perks list (each rendered with a check icon). */
  perks: string[];
  /** Whether this is the rank featured in the hero / spotlight. */
  featured?: boolean;
  /** Whether this rank is currently live on Tip4Serv. */
  live?: boolean;
}

export const ranks: Rank[] = [
  {
    id: "rank-sonic",
    name: "Sonic Rank",
    tagline: "The flagship rank. Everything unlocked.",
    description:
      "The all-access rank for SoniicSMP. Sonic kit, fly, god mode and every prime privilege — the full SoniicSMP experience in one purchase.",
    price: 4.0,
    originalPrice: 5.0,
    discountPercent: 20,
    // Blue gradient from the uploaded screenshot (3D blocky logo)
    accent: "#4AA3DF",
    accent2: "#1A3B5C",
    badge: "-20%",
    featured: true,
    live: true,
    perks: [
      "Sonic kit (diamond gear + enchanted tools)",
      "More /sethome slots",
      "Fly at spawn",
      "God mode — everywhere, always",
      "All prime privileges unlocked",
      "Blue [Sonic] chat prefix",
      "Priority support queue on Discord",
      "Cross-server sync (Java & Bedrock)",
    ],
  },
  {
    id: "rank-halloween",
    name: "Halloween Rank",
    tagline: "Limited seasonal rank. Spookier perks.",
    description:
      "A limited-time October rank. Everything in Sonic plus a haunted prefix, the Halloween kit, a bat pet, jack-o'-lantern effect and trick-or-treat baskets. Vanishes November 1st.",
    price: 7.99,
    originalPrice: 9.99,
    discountPercent: 20,
    // Halloween: orange → purple
    accent: "#FF6B00",
    accent2: "#9C5FE2",
    theme: "purple",
    badge: "NEW",
    featured: true,
    live: false,
    perks: [
      "Everything in Sonic Rank",
      "Animated [Halloween] prefix (orange→purple)",
      "/kit halloween every 24h (pumpkin bombs, cursed gear)",
      "Bat pet companion that follows you",
      "Jack-o'-lantern head particle effect",
      "Trick-or-treat baskets (random cosmetic drops)",
      "Fly at spawn + in your claims",
      "Halloween crate key bundle x5 (seasonal)",
      "Name on the Halloween hall of fame at spawn",
    ],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────
export function formatPrice(p: number): string {
  return `€${p.toFixed(2)}`;
}

export function getDiscount(rank: Rank): number | null {
  if (!rank.originalPrice || rank.originalPrice <= rank.price) return null;
  if (rank.discountPercent) return rank.discountPercent;
  return Math.round(
    ((rank.originalPrice - rank.price) / rank.originalPrice) * 100,
  );
}

// ── FAQ data ────────────────────────────────────────────────────────────
export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: "How do I receive my rank after purchase?",
    a: "Ranks are delivered automatically to your in-game account within 60 seconds. Make sure you've joined soniicsmp.de at least once with the exact Minecraft username you typed at checkout, then run /sync in-game. If the rank hasn't appeared after 5 minutes, open a ticket on Discord with your Tip4Serv receipt and our staff will sort it out.",
  },
  {
    q: "Is checkout secure? Where is my payment processed?",
    a: "Yes — the Tip4Serv shop is embedded directly on this page, so you can browse and pay without ever leaving soniicsmp.de. Tip4Serv handles the actual card processing via Stripe and PayPal on their PCI-compliant infrastructure. SoniicSMP and libreDroid never see or store your card details at any point.",
  },
  {
    q: "Is the Sonic Rank permanent or a subscription?",
    a: "Permanent. Pay once and the rank stays on your account for the lifetime of the server. No subscription, no recurring charge, no expiry — and you keep every perk, including future ones we add to Sonic, for free.",
  },
  {
    q: "What's the Halloween Rank and how long is it available?",
    a: "The Halloween Rank is a limited-time seasonal rank available only during October. It stacks on top of Sonic (you get every Sonic perk) and adds spooky cosmetics, the Halloween kit, a bat pet, and trick-or-treat baskets. It's permanent once purchased — you keep it forever — but it can only be bought during the Halloween season.",
  },
  {
    q: "If I buy Sonic now, can I upgrade to Halloween later?",
    a: "Yes. The Halloween Rank already includes everything in Sonic, so buying it on top simply adds the Halloween perks to your account. Open a ticket on Discord within 30 days of buying Sonic and we'll credit the full €4 you paid toward your Halloween Rank purchase.",
  },
  {
    q: "Is any of this pay-to-win?",
    a: "No. SoniicSMP is survival-first. Ranks give convenience perks (extra homes, fly, kits on cooldown, cosmetics) and quality-of-life — never combat advantage in fair PvP. The 'God mode' perk is restricted to creative-adjacent zones and your own claims; it doesn't apply in arena PvP or faction raids.",
  },
  {
    q: "What's the refund policy?",
    a: "Because digital items are delivered instantly, all sales are final. If a purchase fails to deliver due to a server-side issue, contact us on Discord within 7 days with your Tip4Serv receipt and we'll either deliver the rank or issue a full refund.",
  },
  {
    q: "Do I need a Java or Bedrock account?",
    a: "Both work. SoniicSMP runs crossplay — Java and Bedrock players join the same world at soniicsmp.de. When checking out, just enter the username you actually log in with.",
  },
];

// ── Stats for the hero band ────────────────────────────────────────────
export const stats = [
  { label: "Players online", value: "127", suffix: "", icon: "Users" },
  { label: "Server uptime", value: "99.9", suffix: "%", icon: "Activity" },
  { label: "Total supporters", value: "3.4", suffix: "k", icon: "Heart" },
  { label: "Discord members", value: "8.6", suffix: "k", icon: "MessageCircle" },
];
