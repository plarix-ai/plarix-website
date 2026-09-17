import { PageFrame } from "@/components/site/page-frame";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { ScrubList, SectionRule } from "@/components/site/scroll-motion";
import { at } from "@/lib/scrub";
import { Refusals } from "@/components/site/refusals";
import { Closing } from "@/components/site/closing";
import { JsonLd, breadcrumbLd, pageMeta } from "@/lib/seo";
import { company } from "@/content/site";

export const metadata = pageMeta({
  title: "What we believe",
  description:
    "What Plarix is, why home services, why warranty claims first, and the six things we put in writing that we will never do to your business.",
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

        <ScrubList as="section" count={company.sections.length} className="shell pb-16 md:pb-24" to={0.76}>
          {company.sections.map((s, i) => (
            <Reveal
              key={s.h}
              delay={i * 80}
              className="scrub-item grid gap-6 border-t border-hairline py-12 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-12 md:py-12"
              style={at(i, company.sections.length)}
            >
              <Reveal as="h2" clip className="t-h3 text-white">
                {s.h}
              </Reveal>
              <div className="max-w-[64ch] space-y-5">
                {s.p.map((p, j) => (
                  <p key={j} className="t-body text-text-secondary">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </ScrubList>

        <section className="relative border-t border-hairline bg-ink-900">
          <SectionRule />
          <div className="shell py-16 md:py-24">
            <Reveal as="h2" clip className="t-h2 max-w-[14ch]">
              What we believe.
            </Reveal>
            {/*
              Six beliefs, brought up one at a time as the reader passes them.
              This is the page's argument, so the page makes him walk it.
            */}
            <ScrubList as="div" count={company.beliefs.length} className="mt-12 md:mt-16" to={0.72}>
              <ul className="max-w-[72ch] space-y-8">
                {company.beliefs.map((b, i) => (
                  <Reveal
                    as="li"
                    key={b}
                    delay={i * 60}
                    className="scrub-item t-lead text-white"
                    style={at(i, company.beliefs.length)}
                  >
                    <span>{b}</span>
                  </Reveal>
                ))}
              </ul>
            </ScrubList>
          </div>
        </section>

        <Refusals />
        <Closing />
      </div>
    </PageFrame>
  );
}
