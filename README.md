# SoniicSMP Store

This is the official store of the **SoniicSMP** Minecraft server. Players pick a rank, type in their Minecraft name and email, and get sent to a secure Tip4Serv checkout page where their order is already filled in. No embedded shop window, no empty carts.

![License](https://img.shields.io/badge/license-GPL--3.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8)

**Live store:** [soniic.tip4serv.com](https://soniic.tip4serv.com/) · **Server:** `soniicsmp.de` (Java and Bedrock) · **Discord:** [Join the community](https://discord.gg/2Ssqjsc8FC)

## What the site does

- A rank showcase that presents the two ranks (Sonic and Halloween) with their perks and discounts
- Our own checkout flow: an API route on the site asks the Tip4Serv checkout API for a prefilled payment page (Stripe, PayPal, Klarna and more). You don't even need an API key for that, just the store ID
- Live server status with players online, version and MOTD
- Halloween mode 🎃 in October: floating ghosts, glowing pumpkins, flapping bats, spiders on threads, a hint of orange and purple and a little ghost that follows your mouse cursor. It turns itself on when October comes around and you can switch it off with the ghost button in the top bar
- A dark Material 3 style design, built with Tailwind CSS and shadcn/ui
- The fonts (Roboto Flex and JetBrains Mono) ship with the project, so builds never depend on Google Fonts
- A few security headers through vercel.json

## The tech

Next.js 16 with the App Router, TypeScript, Tailwind CSS 4 and shadcn/ui components. Small bits of state (like the Halloween switch) run on zustand. Payments go through Tip4Serv. Prisma with SQLite is set up in the project but no route actually uses it yet, it's there for later.

## Run it yourself

You need Node.js 20 or newer (or Bun) and npm.

```bash
npm install
cp .env.example .env
npm run dev
```

Then open http://localhost:3000 in your browser.

For production:

```bash
npm run build
npm run start
```

The build also copies the static files into the standalone output, so you can host the server yourself without Vercel. On Vercel none of that is needed, pushing the repo is enough. A `vercel.json` is included, it sets the region (fra1) and the security headers.

## Make it your own store

Almost everything you need to change lives in [`src/lib/store.ts`](src/lib/store.ts). That's where you find the store ID, the ranks with prices, perks and the product slug from your Tip4Serv dashboard. A rank with `live: false` gets a "soon" sticker and can't be bought yet. How the checkout links get built is in [`src/app/api/checkout/route.ts`](src/app/api/checkout/route.ts) if you're curious.

## Project structure

```
src/
├── app/
│   ├── api/checkout/route.ts   # builds the Tip4Serv checkout links
│   ├── api/server-status/      # live ping to the Minecraft server
│   ├── layout.tsx              # fonts, metadata
│   ├── page.tsx                # the store page
│   └── globals.css             # design tokens and the halloween animations
├── components/store/           # hero, rank showcase, checkout, FAQ, footer, halloween effects ...
├── fonts/                      # Roboto Flex and JetBrains Mono as woff2
└── lib/
    ├── store.ts                # product catalog and Tip4Serv settings
    └── halloween-store.ts      # the halloween switch, gets saved
```

## Contributing

Found a bug or want to improve something? Drop it in an issue or open a pull request. Every bit of help is welcome.

## AI notice

Parts of this project were made with the help of an AI assistant. Only the halloween effects (ghosts, pumpkins, bats, spiders, the color tint, the mouse ghost and the switch for them) came out of an AI session. The rest, so the design, the checkout integration and the configuration, was built by hand.

## License

The project is licensed under the [GNU GPL v3](LICENSE). The bundled fonts are licensed under the [SIL Open Font License 1.1](src/fonts/OFL-1.1.txt).

---

Made by [libreDroid](https://github.com/libredroid-project) for the SoniicSMP community. Not affiliated with Mojang or Microsoft.
