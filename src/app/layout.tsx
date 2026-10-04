import type { Metadata } from "next";
import { Roboto_Flex, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SoniicSMP Store | Minecraft Server Ranks",
  description:
    "Support SoniicSMP and unlock ranks, crate keys, in-game coins, kits and cosmetics. Secure checkout powered by Tip4Serv. Join soniicsmp.de.",
  keywords: [
    "SoniicSMP",
    "Minecraft server",
    "Minecraft store",
    "Minecraft ranks",
    "Tip4Serv",
    "SMP shop",
    "Minecraft crates",
  ],
  authors: [{ name: "SoniicSMP" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "SoniicSMP Store",
    description:
      "Ranks, crates, coins, kits and cosmetics for the SoniicSMP Minecraft server. Secure checkout via Tip4Serv.",
    siteName: "SoniicSMP Store",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoniicSMP Store",
    description:
      "Ranks, crates, coins, kits and cosmetics for SoniicSMP. Secure checkout via Tip4Serv.",
  },
};

export const viewport = {
  themeColor: "#161B16",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${robotoFlex.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
        <Sonner />
      </body>
    </html>
  );
}
