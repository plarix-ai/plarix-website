import { PageFrame } from "@/components/site/page-frame";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { ScrubList } from "@/components/site/scroll-motion";
import { at } from "@/lib/scrub";
import { Closing } from "@/components/site/closing";
import { JsonLd, breadcrumbLd, faqLd, pageMeta } from "@/lib/seo";
import { faqs } from "@/content/site";

export const metadata = pageMeta({
  title: "Questions",
  description:
    "What Plarix does, whether you leave ServiceTitan, what it costs, how long it takes, what data it needs, and what happens if we find nothing.",
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
          <ScrubList as="div" count={faqs.length} className="max-w-[72ch]" to={0.8}>
            {faqs.map((item, i) => (
              <Reveal
                key={item.q}
                delay={i * 45}
                className="scrub-item border-t border-hairline py-8 last:border-b"
                style={at(i, faqs.length)}
              >
                <Reveal as="h2" clip className="t-h3 text-white">
                  {item.q}
                </Reveal>
                <p className="mt-4 t-prose text-text-secondary">
                  {item.a}
                </p>
              </Reveal>
            ))}
          </ScrubList>
        </section>

        <Closing />
      </div>
    </PageFrame>
  );
}
