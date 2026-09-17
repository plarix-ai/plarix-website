import { PageFrame } from "@/components/site/page-frame";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { ScrubList } from "@/components/site/scroll-motion";
import { at } from "@/lib/scrub";
import { Closing } from "@/components/site/closing";
import { JsonLd, breadcrumbLd, pageMeta } from "@/lib/seo";
import Link from "next/link";

import { SITE_URL, glossary, processes } from "@/content/site";
import { tocId } from "@/lib/slug";

export const metadata = pageMeta({
  title: "Glossary",
  description:
    "Warranty labor reimbursement, filing windows, RA numbers, dealer tiers, spiffs and core charges, defined plainly for home services owners.",
  path: "/glossary",
});

const crumbs = [
  { label: "Plarix", href: "/" },
  { label: "Glossary", href: "/glossary" },
];

export default function GlossaryPage() {
  return (
    <PageFrame>
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            "@id": `${SITE_URL}/glossary#set`,
            name: "Home services back office glossary",
            description:
              "Plain definitions of the warranty, purchasing, compliance and payroll vocabulary a home services company deals with after a job is finished.",
            url: `${SITE_URL}/glossary`,
            publisher: { "@id": `${SITE_URL}/#organization` },
            hasDefinedTerm: glossary.terms.map((t) => ({
              "@type": "DefinedTerm",
              name: t.term,
              description: t.def,
              inDefinedTermSet: `${SITE_URL}/glossary#set`,
              url: `${SITE_URL}/glossary#${tocId(t.term)}`,
            })),
          },
        ]}
      />

      <div id="main">
        <PageHeader eyebrowCrumbs={crumbs} title={glossary.heading} lede={glossary.lede} />

        <section className="shell pb-20 md:pb-28">
          <ScrubList as="div" count={glossary.terms.length} to={0.82}>
          <dl>
            {glossary.terms.map((t, i) => (
              <Reveal
                key={t.term}
                delay={Math.min(i, 8) * 35}
                className="scrub-item grid gap-2 border-t border-hairline py-6 last:border-b md:grid-cols-[minmax(0,20rem)_1fr] md:gap-12 md:py-7"
                style={at(i, glossary.terms.length)}
              >
                <dt id={tocId(t.term)} className="t-h4 scroll-mt-28 text-white">
                  {t.term}
                </dt>
                <dd className="max-w-[62ch]">
                  <span className="block t-body text-text-secondary">{t.def}</span>
                  {"process" in t && t.process ? (
                    <Link
                      href={`/processes/${t.process}`}
                      prefetch={false}
                      className="link-sweep press-sm mt-2 inline-block t-caption text-text-tertiary transition-colors duration-200 hover:text-white"
                    >
                      {processes.find((p) => p.slug === t.process)?.name}
                    </Link>
                  ) : null}
                </dd>
              </Reveal>
            ))}
          </dl>
          </ScrubList>
        </section>

        <Closing />
      </div>
    </PageFrame>
  );
}
