import type { Metadata } from "next";
import Link from "next/link";

import { SiteNav } from "@/components/site/site-nav";
import { Footer } from "@/components/site/footer";
import { CONTACT_EMAIL } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Plarix collects, uses and protects information submitted through plarix.dev.",
  alternates: { canonical: "https://plarix.dev/privacy" },
};

const sections = [
  {
    h: "What we collect",
    p: [
      "When you submit the count request or contact form on plarix.dev, we collect your first and last name, company name, work email, and the process you told us to look at first. We also record the IP address the request came from, to rate limit abuse.",
      "We do not collect payment information, passwords, or any sensitive personal data through this site.",
    ],
  },
  {
    h: "How we use it",
    p: [
      "Form submissions are used to respond to your request and work out whether what we do is a fit for your situation. We email you once in response. We do not add you to a mailing list, share your details with third parties, or contact you repeatedly without your consent.",
    ],
  },
  {
    h: "Analytics",
    p: [
      "This site uses Vercel Analytics, which collects aggregated, anonymised traffic data such as page views, referrers and device type. No cookies are set. No personally identifiable information is collected or stored by the analytics system.",
    ],
  },
  {
    h: "Retention and deletion",
    p: [
      "Form submissions are kept for as long as they are needed to manage the business relationship. If you want your information deleted, email us and we will remove it within 30 days.",
    ],
  },
  {
    h: "Who processes it",
    p: [
      "The site is hosted on Vercel. Form submissions are processed by a Plarix controlled API endpoint and stored in a Plarix controlled database. We do not use third party CRMs, marketing platforms or data brokers.",
    ],
  },
  {
    h: "Your rights",
    p: [
      "You have the right to access, correct or delete any personal information we hold about you. To exercise any of these rights, contact us at the address below.",
    ],
  },
  {
    h: "Changes",
    p: [
      "If this policy changes materially we will update the effective date at the top of this page. Continued use of plarix.dev after a change means you accept the updated policy.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SiteNav />

      <main className="shell pb-24 pt-16 md:pb-32 md:pt-24">
        <p className="text-[13px] text-text-tertiary">Effective August 19, 2026</p>
        <h1 className="display mt-4 text-[clamp(2.25rem,6vw,3.75rem)]">Privacy</h1>
        <p className="mt-7 max-w-[62ch] text-lg leading-relaxed text-text-secondary">
          We collect the minimum necessary. We do not sell data. We do not run third party
          advertising. This page explains exactly what happens to anything you send us through
          plarix.dev.
        </p>

        <div className="mt-16 max-w-[68ch] space-y-12">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-xl text-white md:text-2xl" style={{ letterSpacing: "-0.02em" }}>
                {s.h}
              </h2>
              {s.p.map((p, i) => (
                <p key={i} className="mt-4 text-base leading-relaxed text-text-secondary md:text-[17px]">
                  {p}
                </p>
              ))}
            </section>
          ))}

          <section>
            <h2 className="text-xl text-white md:text-2xl" style={{ letterSpacing: "-0.02em" }}>
              Contact
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-[17px]">
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-white underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>
        </div>

        <Link
          href="/"
          className="mt-16 inline-flex text-[15px] text-text-secondary transition-colors duration-200 hover:text-white"
        >
          Back to the site
        </Link>
      </main>

      <Footer />
    </>
  );
}
