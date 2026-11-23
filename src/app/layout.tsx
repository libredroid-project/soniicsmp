import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { cn } from "@/lib/utils";

// Self-hosted so the build never depends on Google Fonts at build time.
const inter = localFont({
  src: "../fonts/Inter-Variable.woff2",
  variable: "--font-sans",
  display: "swap",
});
/** Handwritten marker font for the "v2 coming soon" scrawls. */
const caveat = localFont({
  src: "../fonts/Caveat-Variable.woff2",
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SoniicSMP Store | Minecraft Server Ranks",
  description:
    "Support SoniicSMP and unlock ranks, crate keys, in-game coins, kits and cosmetics. Secure checkout powered by Tip4Serv. Join soniicsmp.de.",
  keywords: ["SoniicSMP", "Minecraft", "server store", "ranks", "Tip4Serv", "soniicsmp.de"],
  openGraph: {
    title: "SoniicSMP Store",
    description:
      "Ranks, crates, coins, kits and cosmetics for the SoniicSMP Minecraft server. Secure checkout via Tip4Serv.",
    siteName: "SoniicSMP Store",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("dark font-sans", inter.variable, caveat.variable)}
    >
      <body className="min-h-svh bg-background text-foreground antialiased">
        <SmoothScroll />
        {children}
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
