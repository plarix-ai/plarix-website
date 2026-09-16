import { PageFrame } from "@/components/site/page-frame";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { Closing } from "@/components/site/closing";
import { JsonLd, breadcrumbLd, faqLd, pageMeta } from "@/lib/seo";
import { faqs } from "@/content/site";

export const metadata = pageMeta({
  title: "Questions",
  description:
    "What Plarix does, whether you have to leave ServiceTitan or Jobber, what it costs, how long it takes, what data it needs, and what happens if the count finds nothing.",
  path: "/faq",
});

const crumbs = [
  { label: "Plarix", href: "/" },
  { label: "Questions", href: "/faq" },
];

export default function FaqPage() {
  return (
    <PageFrame>
      <JsonLd data={[breadcrumbLd(crumbs), faqLd(faqs)]} />

      <div id="main">
        <PageHeader
          eyebrowCrumbs={crumbs}
          title="Questions, answered directly."
          lede="The ones we actually get asked, with the answer first and the reasoning after it."
        />

        <section className="shell pb-18 md:pb-26">
          <div className="max-w-[72ch]">
            {faqs.map((item, i) => (
              <Reveal key={item.q} delay={i * 45} className="border-t border-hairline py-8 last:border-b">
                <h2 className="t-h3 text-white">
                  {item.q}
                </h2>
                <p className="mt-4 t-prose text-text-secondary">
                  {item.a}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <Closing />
      </div>
    </PageFrame>
  );
}
