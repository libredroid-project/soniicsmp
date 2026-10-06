import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Imprint | SoniicSMP Store",
  description: "Legal information in accordance with § 5 DDG.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold text-[var(--md-on-surface)] mt-2">{title}</h2>
      {children}
    </section>
  );
}

export default function ImprintPage() {
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
            Impressum (Imprint)
          </h1>

          <div className="m3-card rounded-[28px] p-6 sm:p-8 flex flex-col gap-4 text-sm leading-relaxed text-[var(--md-on-surface-variant)]">
            <Section title="Information in accordance with § 5 DDG">
              <p className="text-[var(--md-on-surface)]">
                <strong>Provider:</strong>
                <br />
                KodaHosting / KodaNetwork
                <br />
                Represented by: Karol Brzostowski
                <br />
                Fixberg 17, 33106 Paderborn-Wewer
                <br />
                Deutschland
              </p>
            </Section>

            <Section title="Note on legal capacity">
              <p>
                The operator of this website is a minor under German law
                (§ 106 BGB, beschränkte Geschäftsfähigkeit). Legal
                responsibility for the operation of this service is jointly
                held by the legal guardians. They can be reached via the
                contact address below.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Email:{" "}
                <a
                  href="mailto:contact@kodaserv.eu"
                  className="text-[var(--brand)] hover:underline"
                >
                  contact@kodaserv.eu
                </a>
                <br />
                Website:{" "}
                <a
                  href="https://host.kodanetwork.eu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--brand)] hover:underline"
                >
                  host.kodanetwork.eu
                </a>
              </p>
            </Section>

            <Section title="EU dispute resolution">
              <p>
                The European Commission provides a platform for online dispute
                resolution (OS):{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--brand)] hover:underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                . We are not willing or obliged to participate in dispute
                resolution proceedings before a consumer arbitration board.
              </p>
            </Section>

            <Section title="Disclaimer">
              <p>
                The content of this website and our services are created with
                the greatest care. However, we cannot guarantee the
                content&apos;s accuracy, completeness, or topicality. As a
                service provider, we are responsible for our own content
                according to general laws.
              </p>
            </Section>

            <Section title="Copyright">
              <p>
                The content and works created by the site operators on these
                pages are subject to European copyright law.
              </p>
            </Section>

            <p className="text-xs text-[var(--md-on-surface-variant)] pt-2 border-t border-[var(--md-outline-variant)]">
              Status: October 2026
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
