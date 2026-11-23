/**
 * SoniicSMP Store · site configuration.
 * All data carried over 1:1 from the original store (sonic.kodanetwork.xyz).
 */

export const SITE = {
  name: "SoniicSMP",
  tagline: "The official SoniicSMP store.",
  description:
    "Pick a rank, enter your details, pay securely via Tip4Serv. Join the survival server at soniicsmp.de.",
  ip: "soniicsmp.de",
  discordUrl: "https://discord.gg/2Ssqjsc8FC",
  tip4serv: {
    shop: "https://soniic.tip4serv.com/",
    sonicProduct: "https://soniic.tip4serv.com/product/soniic",
    tos: "https://soniic.tip4serv.com/terms",
    privacy: "https://soniic.tip4serv.com/privacy",
    // Public Tip4Serv checkout API (https://tip4serv.gitbook.io/tip4serv-api).
    // The /store/checkout endpoint needs no API key, just the store id.
    apiUrl: "https://api.tip4serv.com/v1",
    storeId: 23808,
  },
  madeBy: { name: "libreDroid", url: "https://github.com/libredroid-project" },
} as const;

/** Rainbow letter colors of the SoniicSMP wordmark (from the original site). */
export const WORDMARK: { ch: string; color: string }[] = [
  { ch: "S", color: "#4498DB" },
  { ch: "o", color: "#52BDD0" },
  { ch: "n", color: "#5FE2C5" },
  { ch: "i", color: "#30F19F" },
  { ch: "i", color: "#00FF79" },
  { ch: "c", color: "#77924F" },
  { ch: "S", color: "#EE2525" },
  { ch: "M", color: "#F03535" },
  { ch: "P", color: "#F24545" },
];

export type Rank = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  accent: string;
  accent2: string;
  badge: string;
  live: boolean;
  /** Direct Tip4Serv product page for this rank, if it exists on the store. */
  buyUrl: string | null;
  /** Product slug on Tip4Serv used by our checkout API (live ranks only). */
  checkoutSlug: string | null;
  perks: string[];
};

export const RANKS: Rank[] = [
  {
    id: "rank-sonic",
    name: "Sonic Rank",
    tagline: "The flagship rank. Everything unlocked.",
    description:
      "The all-access rank for SoniicSMP. Sonic kit, fly, god mode and every prime privilege. The full SoniicSMP experience in one purchase.",
    price: 4,
    originalPrice: 5,
    discountPercent: 20,
    accent: "#4AA3DF",
    accent2: "#1A3B5C",
    badge: "-20%",
    live: true,
    buyUrl: SITE.tip4serv.sonicProduct,
    checkoutSlug: "soniic",
    perks: [
      "Sonic kit (diamond gear + enchanted tools)",
      "More /sethome slots",
      "Fly at spawn",
      "God mode, everywhere, always",
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
    accent: "#FF6B00",
    accent2: "#9C5FE2",
    badge: "NEW",
    live: false,
    buyUrl: null,
    checkoutSlug: null,
    perks: [
      "Everything in Sonic Rank",
      "Animated [Halloween] chat prefix",
      "/kit halloween every 24h",
      "Bat pet companion that follows you",
      "Jack-o'-lantern head particle effect",
      "Trick-or-treat baskets (random cosmetic drops)",
      "Fly at spawn + in your claims",
      "Halloween crate key bundle x5",
      "Name on the Halloween hall of fame at spawn",
    ],
  },
];

export const FEATURES = [
  {
    n: "01",
    title: "Instant delivery",
    text: "Your rank lands in-game within 60 seconds of payment. No staff needed, no waiting.",
  },
  {
    n: "02",
    title: "Everything here, payment there",
    text: "Rank, Minecraft username and email are entered right here on the store. Tip4Serv only handles the payment itself on its secure checkout (Stripe / PayPal), with everything pre-filled.",
  },
  {
    n: "03",
    title: "Keeps the server free",
    text: "Every euro goes to hosting, plugins and developer time. No ads, no paywalls, ever.",
  },
  {
    n: "04",
    title: "Permanent ranks",
    text: "Pay once, keep it forever. Sonic and Halloween ranks never expire, and future perks land free.",
  },
  {
    n: "05",
    title: "Real human support",
    text: "Open a ticket on Discord and a staff member will sort out any issue within hours.",
  },
  {
    n: "06",
    title: "Non pay-to-win",
    text: "All rank perks are convenience & cosmetics: fly, kits, prefixes. Never combat advantage in fair PvP.",
  },
] as const;

export const STEPS = [
  {
    n: "01",
    title: "Pick your rank and details",
    text: "Choose between the flagship Sonic Rank and the seasonal Halloween Rank, then enter your Minecraft username and email in the checkout form. Both ranks are permanent. Pay once, keep it forever.",
  },
  {
    n: "02",
    title: "Pay on Tip4Serv",
    text: "We hand you off to Tip4Serv's secure payment page (Stripe / PayPal) with your rank, username and email already pre-filled. All you do there is pay.",
  },
  {
    n: "03",
    title: "Receive in-game",
    text: "Your rank lands on your in-game account within 60 seconds of payment. Run /sync in-game if anything is missing. We've got your back.",
  },
] as const;

export const FAQS = [
  {
    q: "How do I receive my rank after purchase?",
    a: "Ranks are delivered automatically to your in-game account within 60 seconds. Make sure you've joined soniicsmp.de at least once with the exact Minecraft username you enter in the checkout form, then run /sync in-game. If the rank hasn't appeared after 5 minutes, open a ticket on Discord with your Tip4Serv receipt and our staff will sort it out.",
  },
  {
    q: "Is checkout secure? Where is my payment processed?",
    a: "Yes. Your rank, Minecraft username and email are entered right here on the store, then payment runs on Tip4Serv's secure hosted checkout page, which handles the card processing via Stripe and PayPal on its PCI-compliant infrastructure. SoniicSMP and libreDroid never see or store your card details at any point.",
  },
  {
    q: "Is the Sonic Rank permanent or a subscription?",
    a: "Permanent. Pay once and the rank stays on your account for the lifetime of the server. No subscription, no recurring charge, no expiry, and you keep every perk, including future ones we add to Sonic, for free.",
  },
  {
    q: "What's the Halloween Rank and how long is it available?",
    a: "The Halloween Rank is a limited-time seasonal rank available only during October. It stacks on top of Sonic (you get every Sonic perk) and adds spooky cosmetics, the Halloween kit, a bat pet, and trick-or-treat baskets. It's permanent once purchased (you keep it forever), but it can only be bought during the Halloween season.",
  },
  {
    q: "If I buy Sonic now, can I upgrade to Halloween later?",
    a: "Yes. The Halloween Rank already includes everything in Sonic, so buying it on top simply adds the Halloween perks to your account. Open a ticket on Discord within 30 days of buying Sonic and we'll credit the full €4 you paid toward your Halloween Rank purchase.",
  },
  {
    q: "Is any of this pay-to-win?",
    a: "No. SoniicSMP is survival-first. Ranks give convenience perks (extra homes, fly, kits on cooldown, cosmetics) and quality-of-life, never combat advantage in fair PvP. The 'God mode' perk is restricted to creative-adjacent zones and your own claims; it doesn't apply in arena PvP or faction raids.",
  },
  {
    q: "What's the refund policy?",
    a: "Because digital items are delivered instantly, all sales are final. If a purchase fails to deliver due to a server-side issue, contact us on Discord within 7 days with your Tip4Serv receipt and we'll either deliver the rank or issue a full refund.",
  },
  {
    q: "Do I need a Java or Bedrock account?",
    a: "Both work. SoniicSMP runs crossplay: Java and Bedrock players join the same world at soniicsmp.de. When checking out, just enter the username you actually log in with.",
  },
] as const;

export function formatPrice(v: number) {
  return `€${v.toFixed(2)}`;
}

export function getDiscount(r: Rank) {
  if (!r.originalPrice || r.originalPrice <= r.price) return null;
  return r.discountPercent || Math.round((r.originalPrice - r.price) / r.originalPrice * 100);
}
