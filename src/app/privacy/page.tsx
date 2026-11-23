import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy | SoniicSMP Store",
  description: "How this website handles your data.",
};

const linkClass =
  "text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <Link
        href="/"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back to the store
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
        Privacy Policy
      </h1>

      <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-muted-foreground">
        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-foreground">
            1. Introduction &amp; Data Controller
          </h2>
          <p>
            Welcome to the SoniicSMP Store. We respect your privacy and are
            committed to protecting any information that may be processed while
            you use this website. This Privacy Policy explains what information
            we collect, how we use it, and your rights regarding your data.
          </p>
          <p className="text-foreground">
            The Data Controller responsible for your personal information is:
            <br />
            Karol Brzostowski (KodaHosting / KodaNetwork)
            <br />
            Fixberg 17, 33106 Paderborn-Wewer, Deutschland
            <br />
            Email:{" "}
            <a href="mailto:contact@kodaserv.eu" className={linkClass}>
              contact@kodaserv.eu
            </a>
          </p>
          <p>
            <strong className="text-foreground">Note on Legal Capacity:</strong>{" "}
            The operator of this website is a minor under German law (§ 106
            BGB, beschränkte Geschäftsfähigkeit). Legal responsibility for the
            operation of this service, including data protection matters, is
            jointly held by the legal guardians. Correspondence regarding data
            protection, including requests under the GDPR, can be addressed to
            the email above. The legal guardians can be reached via the same
            address.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-foreground">
            2. Information We Collect &amp; Process
          </h2>
          <p>
            <strong className="text-foreground">Checkout details.</strong> When
            you use the checkout form, your Minecraft username and email
            address are sent to our API and forwarded to Tip4Serv to create
            your prefilled checkout page. We don&apos;t store them anywhere,
            this website keeps no database of them. Legal basis: Art. 6 (1) b
            GDPR (steps prior to entering into a contract).
          </p>
          <p>
            <strong className="text-foreground">Payment data.</strong> Payments
            are handled entirely by Tip4Serv and its payment providers (Stripe,
            PayPal and others). We never see your card details. Tip4Serv&apos;s
            own privacy policy applies to the payment process:{" "}
            <a
              href={SITE.tip4serv.privacy}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              tip4serv.com privacy policy
            </a>
            .
          </p>
          <p>
            <strong className="text-foreground">Hosting logs.</strong> This
            website is hosted on Vercel Inc. When you visit, Vercel processes
            technical data (such as your IP address and the requested page) in
            server logs to deliver the site and protect against abuse. See{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Vercel&apos;s privacy policy
            </a>
            .
          </p>
          <p>
            <strong className="text-foreground">Local storage.</strong> We save
            one small setting in your browser: whether the Halloween effects
            are switched on or off. It stays on your device and contains no
            personal data.
          </p>
          <p>
            <strong className="text-foreground">What we don&apos;t do.</strong>{" "}
            No cookies, no analytics, no tracking, no advertising, no
            third-party embeds on the store page itself.
          </p>
          <p>
            <strong className="text-foreground">Server status.</strong> The
            live player count shown on the store is fetched by our server from
            a public Minecraft status API (mcsrvstat.us). Your browser never
            talks to it, so none of your data is involved.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-foreground">
            3. Legal Basis for Processing (Art. 6 GDPR)
          </h2>
          <p>
            We process your personal data on the following legal bases:
          </p>
          <p>
            <strong className="text-foreground">Article 6 (1) b GDPR:</strong>{" "}
            for the performance of a contract (creating your checkout at
            Tip4Serv).
            <br />
            <strong className="text-foreground">Article 6 (1) f GDPR:</strong>{" "}
            legitimate interests in operating and securing the website,
            preventing abuse, and maintaining the hosting infrastructure.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-foreground">
            4. Third-Party Services
          </h2>
          <p>This website relies on a small number of third parties:</p>
          <p>
            <strong className="text-foreground">Tip4Serv</strong> operates the
            shop and checkout you are redirected to, delivers your rank and
            provides support for payments. Tip4Serv is a separate controller
            for that part of the process and its own privacy policy applies.
            <br />
            <strong className="text-foreground">Stripe &amp; PayPal</strong>{" "}
            process your payment on behalf of Tip4Serv.
            <br />
            <strong className="text-foreground">Vercel</strong> hosts this
            website and processes server logs as described in section 2.
          </p>
          <p>
            Where a provider processes data on our behalf it acts as a
            processor under Art. 28 GDPR. Where a provider decides on its own
            about the processing (for example when you open the Tip4Serv
            checkout page), it is a separate controller and its own privacy
            policy applies. We recommend reviewing their respective privacy
            policies.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-foreground">
            5. Data Security
          </h2>
          <p>
            All communication with this website happens over secure, encrypted
            connections (HTTPS). Beyond the checkout details described above,
            which are forwarded once and not stored, we hold no personal data.
            However, no method of transmission over the Internet or method of
            electronic storage is 100% secure. This is a hobby project
            maintained by a single developer and does not provide the security
            guarantees of a commercial enterprise-grade service.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-foreground">
            6. Data Retention
          </h2>
          <p>
            We retain no personal data on our own systems. Your checkout
            details live only for the moment it takes to create your Tip4Serv
            checkout link. Any data that Tip4Serv, Stripe, PayPal or Vercel
            store is governed by their respective privacy policies and
            retention periods.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-foreground">
            7. Your GDPR Rights (User Rights)
          </h2>
          <p>Under the GDPR and applicable privacy laws, you have:</p>
          <p>
            the right to access (Art. 15), the right to rectification (Art.
            16), the right to erasure (Art. 17), the right to restriction of
            processing (Art. 18), the right to data portability (Art. 20), the
            right to object (Art. 21) and the right to withdraw consent at any
            time (Art. 7 (3)).
          </p>
          <p>
            To exercise these rights, please contact us at{" "}
            <a href="mailto:contact@kodaserv.eu" className={linkClass}>
              contact@kodaserv.eu
            </a>
            . Since we store no personal data ourselves, most requests will
            concern data held by Tip4Serv or Vercel, and we will point you to
            the right place. If you are under 16, your request must be
            submitted by or with the consent of your legal guardian.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-foreground">
            8. Children&apos;s Privacy
          </h2>
          <p>
            This website is intended for a general audience. Under Article 8 of
            the GDPR as implemented in Germany, users under the age of 16
            require the consent of their legal guardian to consent to the
            processing of their personal data, including purchasing a rank.
          </p>
          <p>
            If you are under 16, please ask your legal guardian to review this
            Privacy Policy and to consent on your behalf before you use the
            checkout. If we become aware that a purchase was made without the
            required consent, we will take steps to delete the associated data
            as soon as possible.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-foreground">
            9. International Data Transfers
          </h2>
          <p>
            Your personal data may be transferred to and processed in
            countries outside the European Economic Area (EEA), in particular
            the United States (Vercel, Tip4Serv, Stripe, PayPal). Such
            transfers are made only to recipients that provide an adequate
            level of protection as required by the GDPR, through the EU-U.S.
            Data Privacy Framework (DPF), Standard Contractual Clauses (SCCs)
            or other lawful transfer mechanisms.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-foreground">
            10. Changes to This Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will post
            any changes on this page, so please review it periodically.
            Continued use of the website after changes constitutes acceptance
            of the updated policy.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-foreground">
            11. Right to Lodge a Complaint
          </h2>
          <p>
            You have the right to lodge a complaint with a supervisory
            authority, in particular in the EU member state of your habitual
            residence, place of work, or place of the alleged infringement, if
            you believe that the processing of your personal data infringes the
            GDPR.
          </p>
          <p className="text-foreground">
            The competent supervisory authority for Germany is:
            <br />
            Landesbeauftragte für Datenschutz und Informationsfreiheit
            Nordrhein-Westfalen
            <br />
            Kavalleriestraße 2-4, 40213 Düsseldorf
            <br />
            <a
              href="https://www.ldi.nrw.de"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              https://www.ldi.nrw.de
            </a>
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-foreground">
            12. Contact Us
          </h2>
          <p>
            If you have any questions or suggestions about this Privacy Policy,
            or if you wish to exercise your data protection rights, please
            contact us at{" "}
            <a href="mailto:contact@kodaserv.eu" className={linkClass}>
              contact@kodaserv.eu
            </a>
            . For matters concerning the operator&apos;s status as a minor, the
            legal guardians can be reached via the same email address.
          </p>
        </section>

        <p className="border-t border-border pt-6 text-xs">
          Status: November 2026.
        </p>
      </div>
    </main>
  );
}
