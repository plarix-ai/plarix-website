import { PageFrame } from "@/components/site/page-frame";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { Refusals } from "@/components/site/refusals";
import { Closing } from "@/components/site/closing";
import { JsonLd, breadcrumbLd, pageMeta } from "@/lib/seo";
import { company } from "@/content/site";

export const metadata = pageMeta({
  title: "What we believe",
  description:
    "Plarix is an AI integration company building agentic process automation for home services. What we are, why home services, why warranty claims first, and the six things we will never do.",
  path: "/company",
});

const crumbs = [
  { label: "Plarix", href: "/" },
  { label: "Company", href: "/company" },
];

export default function CompanyPage() {
  return (
    <PageFrame>
      <JsonLd data={breadcrumbLd(crumbs)} />

      <div id="main">
        <PageHeader eyebrowCrumbs={crumbs} title={company.heading} lede={company.lede} />

        <section className="shell pb-16 md:pb-24">
          {company.sections.map((s, i) => (
            <Reveal
              key={s.h}
              delay={i * 80}
              className="grid gap-6 border-t border-hairline py-12 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-12 md:py-12"
            >
              <h2 className="t-h3 text-white">
                {s.h}
              </h2>
              <div className="max-w-[64ch] space-y-5">
                {s.p.map((p, j) => (
                  <p key={j} className="t-body text-text-secondary">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </section>

        <section className="border-t border-hairline bg-ink-900">
          <div className="shell py-16 md:py-24">
            <Reveal as="h2" className="t-h2 max-w-[14ch]">
              What we believe.
            </Reveal>
            <ul className="mt-12 max-w-[72ch] space-y-8 md:mt-16">
              {company.beliefs.map((b, i) => (
                <Reveal
                  as="li"
                  key={b}
                  delay={i * 60}
                  className="t-lead text-white"
                >
                  <span>{b}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <Refusals />
        <Closing />
      </div>
    </PageFrame>
  );
}
