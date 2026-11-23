# SoniicSMP Store

The official store of the **SoniicSMP** Minecraft server. Players pick a rank, type in their Minecraft name and email, and get sent to a secure Tip4Serv checkout page where their order is already filled in. No shop window inside the page, no empty carts.

![License](https://img.shields.io/badge/license-GPL--3.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8)

**Live store:** [soniic.tip4serv.com](https://soniic.tip4serv.com/) · **Server:** `soniicsmp.de` (Java and Bedrock) · **Discord:** [Join the community](https://discord.gg/2Ssqjsc8FC)

## What the site does

- A minimal dark storefront: hero, features, how it works, the two ranks and a FAQ, all in one page
- A rank showcase for the Sonic Rank and the seasonal Halloween Rank with perks, prices and discount badges
- Our own checkout: an API route asks the Tip4Serv checkout API for a prefilled payment page (Stripe, PayPal, Klarna and more). No API key needed for that, just the store id
- Live server status card with players online, version and MOTD
- Small motion details: reveal on scroll, a tilt effect on cards, a pixel canvas in the call to action and smooth scrolling with Lenis
- Self hosted fonts (Inter and Caveat), so the build never depends on Google Fonts
- A few security headers through vercel.json

## The tech

Next.js 16 with the App Router, TypeScript, Tailwind CSS 4 and shadcn/ui. Motion comes from framer-motion and Lenis. Payments go through Tip4Serv. Prisma with SQLite is set up in the project but no route uses it yet, it is there for later.

## Run it yourself

You need Node.js 20 or newer and npm.

```bash
npm ci
cp .env.example .env
npm run dev
```

Then open http://localhost:3000 in your browser.

For production:

```bash
npm run build
npm run start
```

The build also copies the static files into the standalone output, so you can host the server yourself without Vercel. On Vercel none of that is needed, pushing the repo is enough. The included vercel.json sets the region (fra1), the install command (npm ci) and the security headers.

## Make it your own store

Almost everything you need to change lives in [`src/lib/site-config.ts`](src/lib/site-config.ts). That is where the store id, the ranks with prices, perks and the product slug from your Tip4Serv dashboard sit, plus the Discord link and the server IP. A rank with `live: false` gets a "soon" sticker and can not be bought yet. How the checkout links get built is in [`src/app/api/checkout/route.ts`](src/app/api/checkout/route.ts).

The legal pages live in `src/app/imprint` and `src/app/privacy`. If you run your own store, put your own name, address and email in there before you go live.

## Project structure

```
src/
├── app/
│   ├── api/checkout/route.ts   # builds the Tip4Serv checkout links
│   ├── api/server-status/      # live ping to the Minecraft server
│   ├── imprint/                # imprint (§ 5 DDG)
│   ├── privacy/                # privacy policy
│   ├── layout.tsx              # fonts, metadata
│   ├── page.tsx                # the store page
│   └── globals.css             # design tokens
├── components/
│   ├── site/                   # header, sections, checkout form, motion helpers
│   └── ui/                     # shadcn/ui primitives
├── fonts/                      # Inter and Caveat as woff2
└── lib/
    ├── site-config.ts          # product catalog and Tip4Serv settings
    └── motd.ts                 # MOTD parsing helpers
```

## Contributing

Found a bug or want to improve something? Drop it in an issue or open a pull request. Every bit of help is welcome.

## AI notice

Parts of this project were made with the help of an AI assistant. Design, copy and configuration were reviewed and finished by hand before going live.

## License

The project is licensed under the [GNU GPL v3](LICENSE). The bundled fonts are licensed under the [SIL Open Font License 1.1](src/fonts/OFL-1.1.txt).

---

Made by [libreDroid](https://github.com/libredroid-project) for the SoniicSMP community. Not affiliated with Mojang or Microsoft.
