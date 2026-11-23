import { SiteHeader } from "@/components/site/site-header";
import { CheckoutForm } from "@/components/site/checkout-form";
import { RevealGroup } from "@/components/site/reveal";
import {
  CtaSection,
  FaqSection,
  FeaturesSection,
  Hero,
  HowItWorksSection,
  RanksSection,
  SiteFooter,
} from "@/components/site/sections";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <FeaturesSection />
        <HowItWorksSection />
        <RanksSection />
        <section
          id="checkout"
          className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28"
        >
          <RevealGroup>
          <div className="reveal mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Checkout.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-dim">
              Fill in everything right here: your rank, Minecraft username and
              email. Tip4Serv only handles the payment itself on its secure
              checkout (Stripe / PayPal), pre-filled, and right back here once
              you&apos;re done.
            </p>
          </div>
          <div className="reveal mt-16 [animation-delay:120ms]">
            <CheckoutForm />
          </div>
          </RevealGroup>
        </section>
        <FaqSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
