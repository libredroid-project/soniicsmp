import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Imprint | SoniicSMP Store",
  description: "Legal information in accordance with § 5 DDG.",
};

export default function ImprintPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <Link
        href="/"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back to the store
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
        Impressum (Imprint)
      </h1>

      <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-muted-foreground">
        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-foreground">
            Information in accordance with § 5 DDG
          </h2>
          <p className="text-foreground">
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
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-foreground">
            Note on legal capacity
          </h2>
          <p>
            The operator of this website is a minor under German law (§ 106
            BGB, beschränkte Geschäftsfähigkeit). Legal responsibility for the
            operation of this service is jointly held by the legal guardians.
            They can be reached via the contact address below.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-foreground">Contact</h2>
          <p>
            Email:{" "}
            <a
              href="mailto:contact@kodaserv.eu"
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            >
              contact@kodaserv.eu
            </a>
            <br />
            Website:{" "}
            <a
              href="https://host.kodanetwork.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            >
              host.kodanetwork.eu
            </a>
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-foreground">
            EU dispute resolution
          </h2>
          <p>
            The European Commission provides a platform for online dispute
            resolution (OS):{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            . We are not willing or obliged to participate in dispute
            resolution proceedings before a consumer arbitration board.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-foreground">Disclaimer</h2>
          <p>
            The content of this website and our services are created with the
            greatest care. However, we cannot guarantee the content&apos;s
            accuracy, completeness, or topicality. As a service provider, we
            are responsible for our own content according to general laws.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-foreground">Copyright</h2>
          <p>
            The content and works created by the site operators on these pages
            are subject to European copyright law.
          </p>
        </section>

        <p className="border-t border-border pt-6 text-xs">
          Status: November 2026
        </p>
      </div>
    </main>
  );
}
