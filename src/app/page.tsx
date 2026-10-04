import { TopAppBar } from "@/components/store/top-app-bar";
import { Hero } from "@/components/store/hero";
import { StatsBar } from "@/components/store/stats-bar";
import { Features } from "@/components/store/features";
import { HowItWorks } from "@/components/store/how-it-works";
import { Shop } from "@/components/store/shop";
import { Faq } from "@/components/store/faq";
import { FinalCta } from "@/components/store/final-cta";
import { Footer } from "@/components/store/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Ambient background layers (fixed, behind everything) */}
      <div className="bg-ambient" aria-hidden />
      <div className="bg-grid" aria-hidden />

      <TopAppBar />

      <main className="flex-1 flex flex-col">
        <Hero />
        <StatsBar />
        <Features />
        <HowItWorks />
        <Shop />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
