# SoniicSMP Store

The official store for the **SoniicSMP** Minecraft server — a modern, fast storefront where players can buy server ranks and get taken straight to a secure Tip4Serv checkout.

![License](https://img.shields.io/badge/license-GPL--3.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8)

**Live store:** [soniic.tip4serv.com](https://soniic.tip4serv.com/) · **Server:** `soniicsmp.de` (Java & Bedrock) · **Discord:** [Join the community](https://discord.gg/2Ssqjsc8FC)

---

## ✨ Features

- **Rank storefront** — a "path showdown" presentation of the Sonic Rank and the seasonal Halloween Rank with perks, pricing and discount badges.
- **Native checkout flow** — the customer enters their Minecraft username & email on the site; a Next.js API route (`POST /api/checkout`) exchanges the basket for a **pre-filled Tip4Serv hosted checkout URL** (Stripe / PayPal / Klarna / more). No shop embed, no empty carts — the order is guaranteed to contain the item.
- **Live server status** — players online, version and MOTD fetched from a public Minecraft server ping API.
- **Halloween mode** 🎃 — drifting ghosts, glowing jack-o'-lanterns, flapping bats, dangling spiders, an ambient orange/purple tint and a ghost that chases your cursor. On by default during October, toggleable via the ghost button in the top bar (preference persisted in `localStorage`).
- **Material 3 dark design** — custom design system with M3-style buttons, cards and text fields, built with Tailwind CSS 4 + shadcn/ui components.
- **Self-hosted fonts** — Roboto Flex & JetBrains Mono served locally (SIL OFL 1.1), so builds never depend on Google Fonts at build time.
- **Security headers** — `x-content-type-options`, `x-frame-options` and referrer policy applied to every route via `vercel.json`.

## 🧰 Tech stack

| | |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS 4, custom Material 3-inspired design tokens |
| UI components | shadcn/ui, Radix primitives, lucide-react icons |
| State | zustand (persisted UI preferences) |
| Payments | [Tip4Serv checkout API](https://tip4serv.gitbook.io/tip4serv-api) (no API key required for checkout links) |
| Database | Prisma + SQLite (scaffolded, not required by any route yet) |

## 🚀 Getting started

**Prerequisites:** Node.js 20+ (or [Bun](https://bun.sh/)) and npm.

```bash
# 1. Install dependencies
npm install          # or: bun install

# 2. (Optional) create your env file
cp .env.example .env

# 3. Start the dev server
npm run dev          # http://localhost:3000
```

### Production build

```bash
npm run build        # next build (standalone output)
npm run start        # runs .next/standalone/server.js
```

> The `build` script also copies `static/` and `public/` into the standalone output so the self-hosted production server works out of the box. On Vercel this isn't needed — see below.

## ☁️ Deployment (Vercel)

The repo ships with a [`vercel.json`](vercel.json): framework preset Next.js, `next build`, EU region `fra1` and the security headers listed above. Push to `main` and Vercel deploys automatically — no environment variables required (the checkout API endpoint is public; the store ID is a public value).

## 🔧 Configuration

Almost everything store-specific lives in [`src/lib/store.ts`](src/lib/store.ts):

| Constant | Purpose |
|---|---|
| `TIP4SERV_STORE_ID` | Your Tip4Serv store ID (used by `POST /api/checkout`) |
| `ranks` | The product catalog: name, price, discounts, perks, Tip4Serv `checkoutSlug`, `live` flag |
| `DISCORD_URL`, `SERVER_IP` | Community links shown across the site |
| `faqs`, `stats` | FAQ content and hero stats |

To sell your own ranks: update the `ranks` array (each rank needs the `product_slug` of the matching product in your Tip4Serv store) and set `TIP4SERV_STORE_ID` to your store's ID. Ranks with `live: false` are displayed with a "soon" badge and can't be checked out.

The checkout handler itself is [`src/app/api/checkout/route.ts`](src/app/api/checkout/route.ts) — it validates input, resolves the rank server-side and returns the hosted checkout URL together with `redirect_success_checkout` / `redirect_canceled_checkout` targets derived from the request origin.

## 📁 Project structure

```
src/
├── app/
│   ├── api/checkout/route.ts   # Tip4Serv checkout link generator
│   ├── api/server-status/      # live Minecraft server ping
│   ├── layout.tsx              # fonts, metadata, global providers
│   ├── page.tsx                # store landing page
│   └── globals.css             # design tokens + Halloween keyframes
├── components/store/           # hero, ranks showcase, checkout, FAQ, footer,
│   │                           # top bar, halloween effects …
├── fonts/                      # self-hosted Roboto Flex & JetBrains Mono (woff2)
└── lib/
    ├── store.ts                # product catalog & Tip4Serv config
    └── halloween-store.ts      # persisted toggle state
```

## 🤝 Contributing

Issues and pull requests are welcome! For bigger changes, please open an issue first to discuss what you'd like to change.

## 🤖 AI disclosure

Parts of this project were created with the help of an AI coding assistant — **only the Halloween effects** (the drifting ghosts, jack-o'-lanterns, bats, spiders, color tint, cursor ghost and their toggle) were AI-generated. Everything else — design, checkout integration and configuration — was built by hand.

## 📄 License

This project is licensed under the [GNU GPL v3](LICENSE).

The bundled fonts (Roboto Flex, JetBrains Mono) are licensed under the [SIL Open Font License 1.1](src/fonts/OFL-1.1.txt).

---

Made by [libreDroid](https://github.com/libredroid-project) for the SoniicSMP community. Not affiliated with Mojang or Microsoft.
