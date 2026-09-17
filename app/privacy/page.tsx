import Link from "next/link";

import { PageFrame } from "@/components/site/page-frame";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { ScrubList } from "@/components/site/scroll-motion";
import { at } from "@/lib/scrub";
import { JsonLd, breadcrumbLd, pageMeta } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/content/site";

export const metadata = pageMeta({
  title: "Privacy",
  description:
    "What Plarix collects through plarix.dev, what happens to it, how long it is kept, and how to have it deleted. We collect the minimum necessary.",
  path: "/privacy",
});

const crumbs = [
  { label: "Plarix", href: "/" },
  { label: "Privacy", href: "/privacy" },
];

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
    <PageFrame>
      <JsonLd data={breadcrumbLd(crumbs)} />

      <div id="main">
        <PageHeader
          eyebrowCrumbs={crumbs}
          title="Privacy"
          lede="We collect the minimum necessary. We do not sell data. We do not run third party advertising. This page explains exactly what happens to anything you send us."
        >
          <p className="t-caption text-text-tertiary">Effective August 19, 2026</p>
        </PageHeader>

        <section className="shell pb-16 md:pb-24">
          <ScrubList as="div" count={sections.length} className="measure space-y-12" to={0.8}>
            {sections.map((s, i) => (
              <Reveal key={s.h} as="section" className="scrub-item" style={at(i, sections.length)}>
                <Reveal as="h2" clip className="t-h4 text-white">
                  {s.h}
                </Reveal>
                {s.p.map((p, i) => (
                  <p key={i} className="mt-4 t-body text-text-secondary">
                    {p}
                  </p>
                ))}
              </Reveal>
            ))}

            <Reveal as="section">
              <Reveal as="h2" clip className="t-h4 text-white">
                Contact
              </Reveal>
              <p className="mt-4 t-body text-text-secondary">
                <a href={`mailto:${CONTACT_EMAIL}`} className="link-sweep press-sm text-white">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </Reveal>
          </ScrubList>

          <Reveal delay={120} className="mt-16">
            <Link href="/" className="link-sweep press-sm t-body-sm text-text-secondary transition-colors duration-200 hover:text-white">
              Back to the site
            </Link>
          </Reveal>
        </section>
      </div>
    </PageFrame>
  );
}
