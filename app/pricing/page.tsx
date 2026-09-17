import { PageFrame } from "@/components/site/page-frame";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { AnswerBlock } from "@/components/site/answer-block";
import { Comparison } from "@/components/site/comparison";
import { Closing } from "@/components/site/closing";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { JsonLd, breadcrumbLd, pageMeta } from "@/lib/seo";
import { Magnetic } from "@/components/site/magnetic";
import { Parallax, ScrubList, SectionRule } from "@/components/site/scroll-motion";
import { at } from "@/lib/scrub";
import { answers, faqs, pricing } from "@/content/site";

export const metadata = pageMeta({
  title: "Pricing",
  description:
    "The count is free. The build is scoped to what it found. Running it is monthly, cancel anytime. Compare it to a hire, not a subscription.",
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
          <AnswerBlock
            question={answers.howMuch.q}
            answer={answers.howMuch.a}
            className="mb-12 md:mb-16"
          />
          <ScrubList count={pricing.tiers.length} className="grid gap-5 md:grid-cols-3" to={0.6}>
            {pricing.tiers.map((tier, i) => (
              <Parallax key={tier.name} distance={tier.featured ? 8 : 18}>
              <Reveal
                delay={i * 90}
                style={at(i, pricing.tiers.length)}
                className={`zoom-frame scrub-item relative flex h-full flex-col rounded-2xl p-7 ring-1 md:p-8 ${
                  tier.featured ? "bg-ink-600 ring-hairline-strong" : "bg-ink-800 ring-hairline"
                }`}
              >
              <span
                className="zoom-surface"
                aria-hidden="true"
                style={{
                  background:
                    "radial-gradient(72% 54% at 70% 0%, rgba(227,176,75,0.10) 0%, rgba(227,176,75,0.03) 44%, rgba(0,0,0,0) 76%)",
                }}
              />
                <h2 className="t-label text-text-tertiary">
                  {tier.name}
                </h2>
                <p className="mt-5 t-h3 text-white">
                  {tier.price}
                </p>
                <p className="mt-5 flex-1 t-body-sm text-text-secondary">
                  {tier.body}
                </p>
                <p className="mt-6 t-body-sm text-white/75">{tier.note}</p>
              </Reveal>
              </Parallax>
            ))}
          </ScrubList>

          <Reveal delay={260} className="mt-10">
            <p className="max-w-[62ch] t-body-sm text-text-tertiary">
              {pricing.reference}
            </p>
          </Reveal>
        </section>

        <Comparison />

        <section className="relative shell border-t border-hairline py-16 md:py-24">
          <SectionRule />
          <Reveal as="h2" clip className="t-h2 max-w-[16ch]">
            Questions about the money.
          </Reveal>
          <ScrubList as="div" count={priceFaqs.length} className="mt-10 max-w-[70ch]" to={0.62}>
            {priceFaqs.map((item, qi) => (
              <Reveal
                key={item.q}
                className="scrub-item border-t border-hairline py-7"
                style={at(qi, priceFaqs.length)}
              >
                <h3 className="t-h4 text-white">
                  {item.q}
                </h3>
                <p className="mt-3 t-body text-text-secondary">
                  {item.a}
                </p>
              </Reveal>
            ))}

            <Reveal delay={120} className="pt-9">
              <Magnetic max={5}>
                <Link
                  href="/faq"
                  className="group press-sm inline-flex items-center gap-2.5 t-body text-text-secondary transition-colors duration-200 hover:text-white"
                >
                  <span className="link-sweep">Every other question we get</span>
                  <ArrowRight size={17} strokeWidth={1.75} aria-hidden="true" className="text-shift" />
                </Link>
              </Magnetic>
            </Reveal>
          </ScrubList>
        </section>

        <Closing />
      </div>
    </PageFrame>
  );
}
