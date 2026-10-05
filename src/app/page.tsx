import { TopAppBar } from "@/components/store/top-app-bar";
import { Hero } from "@/components/store/hero";
import { StatsBar } from "@/components/store/stats-bar";
import { Features } from "@/components/store/features";
import { HowItWorks } from "@/components/store/how-it-works";
import { RanksShowcase } from "@/components/store/ranks-showcase";
import { Tip4ServEmbed } from "@/components/store/tip4serv-embed";
import { Faq } from "@/components/store/faq";
import { FinalCta } from "@/components/store/final-cta";
import { Footer } from "@/components/store/footer";
import { HalloweenEffects } from "@/components/store/halloween-effects";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HalloweenEffects />
      <TopAppBar />

      <main className="flex-1 flex flex-col">
        <Hero />
        <StatsBar />
        <Features />
        <HowItWorks />
        <RanksShowcase />
        <Tip4ServEmbed />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
