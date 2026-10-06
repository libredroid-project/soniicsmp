import type { Metadata } from "next";
import Link from "next/link";
import { TIP4SERV_PP_URL } from "@/lib/store";

export const metadata: Metadata = {
  title: "Privacy Policy | SoniicSMP Store",
  description: "How this website handles your data.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold text-[var(--md-on-surface)] mt-2">{title}</h2>
      {children}
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col py-12 lg:py-16">
        <div className="container-m3 max-w-2xl mx-auto w-full">
          <Link
            href="/"
            className="text-sm text-[var(--md-on-surface-variant)] hover:text-[var(--brand)] transition-colors"
          >
            ← Back to the store
          </Link>

          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight mt-6 mb-8">
            Privacy Policy
          </h1>

          <div className="m3-card rounded-[28px] p-6 sm:p-8 flex flex-col gap-4 text-sm leading-relaxed text-[var(--md-on-surface-variant)]">
            <Section title="Controller">
              <p className="text-[var(--md-on-surface)]">
                Karol Brzostowski (KodaHosting / KodaNetwork)
                <br />
                Fixberg 17, 33106 Paderborn-Wewer, Deutschland
                <br />
                Email:{" "}
                <a
                  href="mailto:support@host.kodanetwork.eu"
                  className="text-[var(--brand)] hover:underline"
                >
                  support@host.kodanetwork.eu
                </a>
              </p>
            </Section>

            <Section title="What data we process">
              <p>
                <strong className="text-[var(--md-on-surface)]">Checkout details.</strong>{" "}
                When you use the checkout form, your Minecraft username and
                email are sent to our API and forwarded to Tip4Serv to create
                your prefilled checkout page. We don&apos;t store them anywhere,
                this website keeps no database of them. Legal basis: Art. 6
                (1) b GDPR (steps prior to entering into a contract).
              </p>
              <p>
                <strong className="text-[var(--md-on-surface)]">Payment data.</strong>{" "}
                Payments are handled entirely by Tip4Serv and its payment
                providers (Stripe, PayPal and others). We never see your card
                details. Tip4Serv&apos;s own privacy policy applies to the
                payment process:{" "}
                <a
                  href={TIP4SERV_PP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--brand)] hover:underline"
                >
                  tip4serv.com privacy policy
                </a>
                .
              </p>
              <p>
                <strong className="text-[var(--md-on-surface)]">Hosting logs.</strong>{" "}
                This website is hosted on Vercel Inc. When you visit, Vercel
                processes technical data (such as your IP address and the
                requested page) in server logs to deliver the site and protect
                against abuse. See{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--brand)] hover:underline"
                >
                  Vercel&apos;s privacy policy
                </a>
                .
              </p>
              <p>
                <strong className="text-[var(--md-on-surface)]">Local storage.</strong>{" "}
                We save one small setting in your browser: whether the
                Halloween effects are switched on or off. It stays on your
                device and contains no personal data.
              </p>
            </Section>

            <Section title="What we don't do">
              <p>
                No cookies, no analytics, no tracking, no advertising, no
                third-party embeds on the store page itself.
              </p>
            </Section>

            <Section title="Server status">
              <p>
                The live player count shown on the store is fetched by our
                server from a public Minecraft status API (mcsrvstat.us). Your
                browser never talks to it, so none of your data is involved.
              </p>
            </Section>

            <Section title="Your rights">
              <p>
                You have the right to access, rectification, erasure,
                restriction of processing, data portability and objection
                (Art. 15 to 21 GDPR). To exercise any of these, email us at{" "}
                <a
                  href="mailto:support@host.kodanetwork.eu"
                  className="text-[var(--brand)] hover:underline"
                >
                  support@host.kodanetwork.eu
                </a>
                . You also have the right to lodge a complaint with a data
                protection supervisory authority, for example the{" "}
                <a
                  href="https://www.ldi.nrw.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--brand)] hover:underline"
                >
                  LDI Nordrhein-Westfalen
                </a>
                .
              </p>
            </Section>

            <p className="text-xs text-[var(--md-on-surface-variant)] pt-2 border-t border-[var(--md-outline-variant)]">
              Status: October 2026. We may update this policy if the website
              changes.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
