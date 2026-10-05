# SoniicSMP Store

Das ist der offizielle Store vom **SoniicSMP** Minecraft Server. Spieler suchen sich einen Rank aus, geben ihren Minecraft Namen und ihre Email an und landen dann auf einer sicheren Tip4Serv Kassenseite, wo die Bestellung schon fertig eingetragen ist. Kein eingebettetes Shop Fenster, keine leeren Warenkörbe.

![License](https://img.shields.io/badge/license-GPL--3.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8)

**Live Shop:** [soniic.tip4serv.com](https://soniic.tip4serv.com/) · **Server:** `soniicsmp.de` (Java und Bedrock) · **Discord:** [Komm in die Community](https://discord.gg/2Ssqjsc8FC)

## Was kann die Seite

- Eine Rank Übersicht, die die zwei Ränge (Sonic und Halloween) als Showcase mit Perks und Rabatten zeigt
- Ein eigener Checkout: eine API Route auf der Seite fragt bei der Tip4Serv Checkout API eine fertig ausgefüllte Bezahlseite an (Stripe, PayPal, Klarna und mehr). Dafür braucht man nicht mal einen API Key, nur die Store ID
- Live Server Status mit Spielern online, Version und MOTD
- Halloween Modus 🎃 im Oktober: schwebende Geister, leuchtende Kürbisse, flatternde Fledermäuse, Spinnen an Fäden, ein orangener und lila Farbhauch und ein kleiner Geist, der dem Mauszeiger hinterher fliegt. Der geht von selbst an, wenn Oktober ist, und lässt sich über den Geister Button oben in der Leiste ausmachen
- Ein dunkles Design im Material 3 Stil, gebaut mit Tailwind CSS und shadcn/ui
- Die Schriften (Roboto Flex und JetBrains Mono) liegen direkt im Projekt, dadurch hängt der Build nicht von Google Fonts ab
- Ein paar Security Header über die vercel.json

## Technik

Next.js 16 mit App Router, TypeScript, Tailwind CSS 4 und shadcn/ui Komponenten. Kleine Zustände (wie der Halloween Schalter) laufen über zustand. Bezahlt wird über Tip4Serv. Prisma mit SQLite liegt im Projekt und ist fertig eingerichtet, benutzt wird es von keiner Route, das ist eher für später da.

## Selbst ausprobieren

Du brauchst Node.js 20 oder neuer (oder Bun) und npm.

```bash
npm install
cp .env.example .env
npm run dev
```

Dann http://localhost:3000 im Browser öffnen.

Für Produktion:

```bash
npm run build
npm run start
```

Der Build kopiert die statischen Dateien mit in den Standalone Output, dadurch kann man den Server auch ohne Vercel selbst hosten. Auf Vercel ist das alles nicht nötig, da reicht es, das Repo zu pushen. Eine `vercel.json` liegt bei, die setzt die Region (fra1) und die Security Header.

## Eigener Shop daraus machen

Fast alles, was du ändern musst, liegt in [`src/lib/store.ts`](src/lib/store.ts). Da stehen die Store ID, die Ränge mit Preisen, Perks und dem Produkt Slug aus deinem Tip4Serv Dashboard. Ein Rank mit `live: false` bekommt einen "soon" Sticker und kann noch nicht gekauft werden. Wie die Checkout Links gebaut werden, kannst du in [`src/app/api/checkout/route.ts`](src/app/api/checkout/route.ts) nachlesen.

## Projektstruktur

```
src/
├── app/
│   ├── api/checkout/route.ts   # baut die Tip4Serv Checkout Links
│   ├── api/server-status/      # Live Ping zum Minecraft Server
│   ├── layout.tsx              # Schriften, Meta Daten
│   ├── page.tsx                # die Store Seite
│   └── globals.css             # Design Tokens und die Halloween Animationen
├── components/store/           # Hero, Rank Showcase, Checkout, FAQ, Footer, Halloween Effekte ...
├── fonts/                      # Roboto Flex und JetBrains Mono als woff2
└── lib/
    ├── store.ts                # Produkt Katalog und Tip4Serv Einstellungen
    └── halloween-store.ts      # der Halloween Schalter, wird gespeichert
```

## Mitmachen

Du hast einen Bug gefunden oder willst etwas verbessern? Dann ab damit in ein Issue oder gleich als Pull Request. Wir freuen uns über jede Hilfe.

## KI Hinweis

Teile dieses Projekts sind mit Hilfe eines KI Assistenten entstanden. Nur die Halloween Effekte (Geister, Kürbisse, Fledermäuse, Spinnen, der Farbhauch, der Maus Geist und der Schalter dafür) sind so entstanden. Der Rest, also Design, Checkout Anbindung und Konfiguration, ist von Hand gebaut.

## Lizenz

Das Projekt steht unter der [GNU GPL v3](LICENSE). Die mitgelieferten Schriften stehen unter der [SIL Open Font License 1.1](src/fonts/OFL-1.1.txt).

---

Gemacht von [libreDroid](https://github.com/libredroid-project) für die SoniicSMP Community. Keine Verbindung zu Mojang oder Microsoft.
