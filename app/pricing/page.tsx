import { PageFrame } from "@/components/site/page-frame";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { Comparison } from "@/components/site/comparison";
import { Closing } from "@/components/site/closing";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { JsonLd, breadcrumbLd, pageMeta } from "@/lib/seo";
import { faqs, pricing } from "@/content/site";

export const metadata = pageMeta({
  title: "Pricing",
  description:
    "The count is free. The build is scoped to what the count found. Running it is a flat monthly fee you can cancel any time. Compare it to a hire at $45,000 to $110,000 a year, not to a software subscription.",
  path: "/pricing",
});

const crumbs = [
  { label: "Plarix", href: "/" },
  { label: "Pricing", href: "/pricing" },
];

const priceFaqs = faqs.filter((f) =>
  ["What does the count cost?", "What does Plarix cost?"].includes(f.q),
);

export default function PricingPage() {
  return (
    <PageFrame>
      <JsonLd data={breadcrumbLd(crumbs)} />

      <div id="main">
        <PageHeader
          eyebrowCrumbs={crumbs}
          title={pricing.heading}
          lede={
            <>
              A warranty coordinator costs <span className="text-gold">$45,000 to $110,000</span> a
              year fully loaded, and needs a desk, training and a reason to stay. That is the number
              we ask you to hold us against.
            </>
          }
        />

        <section className="shell pb-16 md:pb-24">
          <div className="grid gap-5 md:grid-cols-3">
            {pricing.tiers.map((tier, i) => (
              <Reveal
                key={tier.name}
                delay={i * 90}
                className={`flex flex-col rounded-2xl p-7 ring-1 md:p-8 ${
                  tier.featured ? "bg-ink-600 ring-hairline-strong" : "bg-ink-800 ring-hairline"
                }`}
              >
                <h2 className="t-label text-text-tertiary">
                  {tier.name}
                </h2>
                <p
                  className="mt-5 t-h3 text-white"
                 
                >
                  {tier.price}
                </p>
                <p className="mt-5 flex-1 t-body-sm text-text-secondary">
                  {tier.body}
                </p>
                <p className="mt-6 t-body-sm text-white/75">{tier.note}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={260} className="mt-10">
            <p className="max-w-[62ch] t-body-sm text-text-tertiary">
              {pricing.reference}
            </p>
          </Reveal>
        </section>

        <Comparison />

        <section className="shell border-t border-hairline py-16 md:py-24">
          <Reveal as="h2" className="t-h2 max-w-[16ch]">
            Questions about the money.
          </Reveal>
          <div className="mt-10 max-w-[70ch]">
            {priceFaqs.map((item) => (
              <Reveal key={item.q} className="border-t border-hairline py-7">
                <h3 className="t-h4 text-white">
                  {item.q}
                </h3>
                <p className="mt-3 t-body text-text-secondary">
                  {item.a}
                </p>
              </Reveal>
            ))}

            <Reveal delay={120} className="pt-9">
              <Link
                href="/faq"
                className="group inline-flex items-center gap-2.5 t-body text-text-secondary transition-colors duration-200 hover:text-white"
              >
                <span className="link-sweep">Every other question we get</span>
                <ArrowRight
                  size={17}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>
        </section>

        <Closing />
      </div>
    </PageFrame>
  );
}
