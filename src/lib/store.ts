// =========================================================================
// SoniicSMP Store — Product Catalog & Tip4Serv Integration Config
// =========================================================================
// All "Purchase" buttons deep-link to the Tip4Serv shop at soniic.tip4serv.com
// where secure checkout (Stripe/PayPal) is handled by Tip4Serv.
//
// To wire up real Tip4Serv product deep-links later, set `tip4servPath` on each
// product to the slug/ID from your Tip4Serv dashboard (e.g. "elite-rank").
// Until then, Purchase buttons open the shop root so checkout still works.
// =========================================================================

export const TIP4SERV_SHOP_URL = "https://soniic.tip4serv.com/";
export const DISCORD_URL = "https://discord.gg/8dz9yJ7Hfu";
export const SERVER_IP = "soniicsmp.de";
export const SERVER_NAME = "SoniicSMP";

export type CategoryId =
  | "ranks"
  | "crates"
  | "coins"
  | "kits"
  | "cosmetics";

export interface Category {
  id: CategoryId;
  label: string;
  blurb: string;
  icon: string; // lucide icon name
  accent: string; // hex
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  price: number; // EUR
  priceLabel?: string;
  tagline: string;
  description: string;
  accent: string; // hex used for the card glow / chip
  badge?: "POPULAR" | "BEST VALUE" | "NEW" | "LIMITED";
  perks: string[];
  tip4servPath?: string; // appended to TIP4SERV_SHOP_URL
  featured?: boolean;
  quantity?: string; // e.g. "x5 keys", "50,000 coins"
}

export const categories: Category[] = [
  {
    id: "ranks",
    label: "Ranks",
    blurb: "Permanent server ranks with escalating perks & prestige.",
    icon: "Crown",
    accent: "#4498DB",
  },
  {
    id: "crates",
    label: "Crate Keys",
    blurb: "Roll rare keys for exclusive items, gear & cosmetics.",
    icon: "Key",
    accent: "#00FF79",
  },
  {
    id: "coins",
    label: "Coins",
    blurb: "In-game currency to spend at the spawn shop & market.",
    icon: "Coins",
    accent: "#5FE2C5",
  },
  {
    id: "kits",
    label: "Kits",
    blurb: "Pre-built item kits delivered fresh every cooldown.",
    icon: "Sword",
    accent: "#77924F",
  },
  {
    id: "cosmetics",
    label: "Cosmetics",
    blurb: "Tags, particle effects & pets — stand out without pay-to-win.",
    icon: "Sparkles",
    accent: "#EE2525",
  },
];

export const products: Product[] = [
  // ── RANKS ──────────────────────────────────────────────────────────────
  {
    id: "rank-vip",
    name: "VIP",
    category: "ranks",
    price: 4.99,
    tagline: "Your first step into prestige.",
    description:
      "A permanent starter rank with a colored chat prefix, extra homes and a small coin bonus.",
    accent: "#4498DB",
    perks: [
      "[VIP] chat prefix in blue",
      "5 extra /sethome slots",
      "/hat & /nick (color)",
      "10,000 starting coins",
      "Access to /workbench",
    ],
    tip4servPath: "",
  },
  {
    id: "rank-vip-plus",
    name: "VIP+",
    category: "ranks",
    price: 9.99,
    tagline: "More homes, more style.",
    description:
      "Everything in VIP plus more homes, a particle trail and a weekly crate key.",
    accent: "#52BDD0",
    perks: [
      "Everything in VIP",
      "10 extra /sethome slots",
      "Cyan chat prefix",
      "Particle trail: heart",
      "1x Rare Key / week",
    ],
    tip4servPath: "",
  },
  {
    id: "rank-mvp",
    name: "MVP",
    category: "ranks",
    price: 14.99,
    tagline: "The sweet spot of value.",
    description:
      "A great all-rounder rank with kits, market access and a teal prefix.",
    accent: "#5FE2C5",
    badge: "BEST VALUE",
    perks: [
      "Everything in VIP+",
      "Teal [MVP] prefix",
      "/kit mvp every 24h",
      "Market listing slots x8",
      "2x Rare Keys / week",
      "/enderchest anywhere",
    ],
    tip4servPath: "",
  },
  {
    id: "rank-mvp-plus",
    name: "MVP+",
    category: "ranks",
    price: 24.99,
    tagline: "Green prestige, serious perks.",
    description:
      "Mint-green rank with extended vault, fly in claims and a fancy pet.",
    accent: "#30F19F",
    perks: [
      "Everything in MVP",
      "Mint [MVP+] prefix",
      "Fly in your own claims",
      "/kit mvp+ every 24h",
      "1x Epic Key / week",
      "Free cosmetic pet: Fox",
    ],
    tip4servPath: "",
  },
  {
    id: "rank-elite",
    name: "Elite",
    category: "ranks",
    price: 39.99,
    tagline: "The community favorite.",
    description:
      "Our most-purchased rank. Bright-green prefix, generous kits and full market access.",
    accent: "#00FF79",
    badge: "POPULAR",
    featured: true,
    perks: [
      "Everything in MVP+",
      "Bright-green [Elite] prefix",
      "/kit elite every 12h",
      "Unlimited market slots",
      "2x Epic Keys / week",
      "Claim block cap x2",
      "Priority support queue",
    ],
    tip4servPath: "",
  },
  {
    id: "rank-legend",
    name: "Legend",
    category: "ranks",
    price: 59.99,
    tagline: "For those who shape the server.",
    description:
      "Olive-gold rank with warps, a personal vault page andLegendary crate keys weekly.",
    accent: "#77924F",
    perks: [
      "Everything in Elite",
      "[Legend] prefix",
      "3 /warps (public)",
      "Personal vault page",
      "2x Legendary Keys / week",
      "Custom join message",
    ],
    tip4servPath: "",
  },
  {
    id: "rank-mythic",
    name: "Mythic",
    category: "ranks",
    price: 89.99,
    tagline: "Endgame prestige.",
    description:
      "Red-tier rank reserved for our most dedicated supporters. Everything, maxed.",
    accent: "#EE2525",
    perks: [
      "Everything in Legend",
      "Red [Mythic] prefix",
      "/kit mythic every 8h",
      "3x Legendary Keys / week",
      "1x Mythic Key / week",
      "Access to /fly everywhere",
      "Name in spawn hall of fame",
    ],
    tip4servPath: "",
  },
  {
    id: "rank-soniic",
    name: "Soniic",
    category: "ranks",
    price: 149.99,
    tagline: "The namesake. Ultimate supporter.",
    description:
      "The top rank. Full MC-gradient prefix, every perk unlocked and lifetime monthly keys.",
    accent: "#00FF79",
    badge: "LIMITED",
    perks: [
      "Everything in Mythic",
      "Animated gradient [Soniic] prefix",
      "/kit soniic every 4h",
      "5x Legendary Keys / week",
      "1x Mythic Key / week, forever",
      "Direct line to staff (Discord role)",
      "Custom particle effect request",
    ],
    tip4servPath: "",
  },

  // ── CRATE KEYS ──────────────────────────────────────────────────────────
  {
    id: "keys-common",
    name: "Common Key Bundle",
    category: "crates",
    price: 2.99,
    quantity: "x5 keys",
    tagline: "Roll the Common crate.",
    description:
      "Five Common crate keys — basic gear, blocks and small coin drops.",
    accent: "#77924F",
    perks: [
      "5x Common crate keys",
      "Common gear & blocks",
      "Small coin drops",
      "Tradeable & giftable",
    ],
    tip4servPath: "",
  },
  {
    id: "keys-rare",
    name: "Rare Key Bundle",
    category: "crates",
    price: 5.99,
    quantity: "x5 keys",
    tagline: "Better odds, better loot.",
    description:
      "Five Rare keys — enchanted gear, cosmetics fragments and medium coin drops.",
    accent: "#4498DB",
    badge: "POPULAR",
    perks: [
      "5x Rare crate keys",
      "Enchanted gear rolls",
      "Cosmetic fragments",
      "Medium coin drops",
    ],
    tip4servPath: "",
  },
  {
    id: "keys-epic",
    name: "Epic Key Bundle",
    category: "crates",
    price: 9.99,
    quantity: "x5 keys",
    tagline: "For serious rollers.",
    description:
      "Five Epic keys — high-tier enchanted gear, exclusive dyes & cosmetics.",
    accent: "#5FE2C5",
    perks: [
      "5x Epic crate keys",
      "High-tier enchanted gear",
      "Exclusive dyes",
      "Cosmetic chance: trail",
    ],
    tip4servPath: "",
  },
  {
    id: "keys-legendary",
    name: "Legendary Key Bundle",
    category: "crates",
    price: 14.99,
    quantity: "x5 keys",
    tagline: "The dream rolls.",
    description:
      "Five Legendary keys — top-tier gear, rare cosmetics & big coin drops.",
    accent: "#00FF79",
    badge: "BEST VALUE",
    perks: [
      "5x Legendary crate keys",
      "Top-tier enchanted gear",
      "Rare cosmetics (aura)",
      "Large coin drops",
    ],
    tip4servPath: "",
  },
  {
    id: "keys-mythic",
    name: "Mythic Key Bundle",
    category: "crates",
    price: 19.99,
    quantity: "x3 keys",
    tagline: "Jackpot territory.",
    description:
      "Three Mythic keys — the rarest crate, with server-unique cosmetics & custom items.",
    accent: "#EE2525",
    badge: "LIMITED",
    perks: [
      "3x Mythic crate keys",
      "Server-unique cosmetics",
      "Custom-named gear",
      "Guaranteed coin jackpot",
    ],
    tip4servPath: "",
  },

  // ── COINS ───────────────────────────────────────────────────────────────
  {
    id: "coins-small",
    name: "10,000 Coins",
    category: "coins",
    price: 2.99,
    quantity: "10,000",
    tagline: "Pocket money.",
    description: "10,000 in-game coins for the spawn shop & player market.",
    accent: "#5FE2C5",
    perks: [
      "10,000 coins deposited in-game",
      "Spend at spawn shop",
      "Trade with other players",
    ],
    tip4servPath: "",
  },
  {
    id: "coins-medium",
    name: "50,000 Coins",
    category: "coins",
    price: 9.99,
    quantity: "50,000",
    tagline: "Best value for coins.",
    description: "50,000 coins — the sweet spot for kits, land and gear.",
    accent: "#5FE2C5",
    badge: "BEST VALUE",
    perks: [
      "50,000 coins deposited in-game",
      "Enough for a full kit set",
      "Bonus: 1x Rare Key",
    ],
    tip4servPath: "",
  },
  {
    id: "coins-large",
    name: "250,000 Coins",
    category: "coins",
    price: 29.99,
    quantity: "250,000",
    tagline: "Build, trade, dominate.",
    description: "A quarter-million coins for serious builders & traders.",
    accent: "#5FE2C5",
    perks: [
      "250,000 coins deposited in-game",
      "Bonus: 3x Rare Keys",
      "Bonus: 1x Epic Key",
    ],
    tip4servPath: "",
  },
  {
    id: "coins-xl",
    name: "1,000,000 Coins",
    category: "coins",
    price: 79.99,
    quantity: "1,000,000",
    tagline: "Whale tier.",
    description: "A million coins — buy out the market, fund a faction.",
    accent: "#5FE2C5",
    perks: [
      "1,000,000 coins deposited in-game",
      "Bonus: 5x Epic Keys",
      "Bonus: 2x Legendary Keys",
      "Bonus: 1x Mythic Key",
    ],
    tip4servPath: "",
  },

  // ── KITS ────────────────────────────────────────────────────────────────
  {
    id: "kit-starter",
    name: "Starter Kit",
    category: "kits",
    price: 3.99,
    tagline: "Hit the ground running.",
    description: "A fresh starter kit every 12h — iron gear, food and tools.",
    accent: "#77924F",
    perks: [
      "Full iron armor",
      "Iron tools & sword",
      "32x bread",
      "16x torches",
      "Redeem every 12 hours",
    ],
    tip4servPath: "",
  },
  {
    id: "kit-builder",
    name: "Builder Kit",
    category: "kits",
    price: 6.99,
    tagline: "For the architects.",
    description: "Decorative blocks, concrete & dyes — refreshed daily.",
    accent: "#77924F",
    perks: [
      "64x concrete (all colors)",
      "32x quartz blocks",
      "16x glass (tinted)",
      "Dye bundle x32",
      "Redeem every 24 hours",
    ],
    tip4servPath: "",
  },
  {
    id: "kit-pvp",
    name: "PvP Kit",
    category: "kits",
    price: 9.99,
    tagline: "Arena-ready, every day.",
    description: "Diamond-enchanted PvP loadout, refreshed every 24h.",
    accent: "#77924F",
    badge: "POPULAR",
    perks: [
      "Diamond armor (Prot III)",
      "Sharp V sword",
      "Power V bow + arrows",
      "16x golden apples",
      "Redeem every 24 hours",
    ],
    tip4servPath: "",
  },

  // ── COSMETICS ───────────────────────────────────────────────────────────
  {
    id: "cos-tag",
    name: "Custom Tag",
    category: "cosmetics",
    price: 4.99,
    tagline: "Pick your prefix.",
    description: "Add a short custom tag (3-8 chars) in front of your name.",
    accent: "#EE2525",
    perks: [
      "Custom 3-8 char tag",
      "Choose from 16 colors",
      "Stacks with rank prefix",
      "Tweak once / month free",
    ],
    tip4servPath: "",
  },
  {
    id: "cos-particles",
    name: "Particle Effects Pack",
    category: "cosmetics",
    price: 7.99,
    tagline: "Trail magic.",
    description: "Unlock a bundle of 6 wearable particle trails & footprints.",
    accent: "#EE2525",
    badge: "NEW",
    perks: [
      "6 particle trails",
      "Footprint effects",
      "Toggle per-effect",
      "Stacks with rank particles",
    ],
    tip4servPath: "",
  },
  {
    id: "cos-pet",
    name: "Pet Companion",
    category: "cosmetics",
    price: 11.99,
    tagline: "A loyal follower.",
    description: "Choose from 12 cosmetic pets that follow you around the server.",
    accent: "#EE2525",
    perks: [
      "Pick 1 of 12 pets",
      "Fox, cat, parrot, panda…",
      "Rename your pet",
      "Purely cosmetic — no pay-to-win",
    ],
    tip4servPath: "",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────
export function formatPrice(p: number): string {
  return `€${p.toFixed(2)}`;
}

export function tip4servUrl(product?: Product): string {
  if (!product?.tip4servPath) return TIP4SERV_SHOP_URL;
  return `${TIP4SERV_SHOP_URL}${product.tip4servPath}`;
}

// ── FAQ data ────────────────────────────────────────────────────────────
export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: "How do I receive my rank or items after purchase?",
    a: "All purchases are delivered automatically to your in-game account within 60 seconds. Make sure you've joined the server at least once with the exact same Minecraft username, then type /sync in-game or on our Discord. If anything is missing after 5 minutes, open a ticket on Discord and our staff will sort it out.",
  },
  {
    q: "Is checkout secure? Where is my payment processed?",
    a: "Yes — every payment is processed securely by Tip4Serv, our official store partner. We never see or store your card details. Tip4Serv supports Stripe, PayPal and local payment methods. You'll be redirected to soniic.tip4serv.com to complete checkout, then returned here automatically.",
  },
  {
    q: "Are ranks permanent or do they expire?",
    a: "Every rank on this store is permanent — pay once, keep it for the lifetime of the server. Crate key bundles, coin packages and kits are one-time purchases that deliver their contents immediately. Monthly crate-key rewards that come bundled with a rank refresh every week, free, forever.",
  },
  {
    q: "Can I upgrade my rank later?",
    a: "Absolutely. If you buy a lower rank and want to upgrade, just open a ticket on Discord within 30 days and we'll credit the full original price toward your new rank. No need to pay twice for the same perks.",
  },
  {
    q: "Is any of this pay-to-win?",
    a: "No. SoniicSMP is survival-first. Ranks give convenience perks (extra homes, fly in claims, kits on cooldown) and cosmetics — never gameplay advantage in PvP. All purchasable gear is also craftable in-game. Supporting the server simply keeps it online and ad-free.",
  },
  {
    q: "What's the refund policy?",
    a: "Because digital items are delivered instantly, all sales are final. If a purchase fails to deliver due to a server-side issue, contact us on Discord within 7 days with your Tip4Serv receipt and we'll either deliver the items or issue a full refund.",
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
