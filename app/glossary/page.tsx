import { PageFrame } from "@/components/site/page-frame";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { Closing } from "@/components/site/closing";
import { JsonLd, breadcrumbLd, pageMeta } from "@/lib/seo";
import { SITE_URL, glossary } from "@/content/site";
import { tocId } from "@/lib/slug";

export const metadata = pageMeta({
  title: "Glossary",
  description:
    "Warranty labor reimbursement, filing windows, RA numbers, dealer tiers, spiffs, co-op funds, core charges and the rest of the home services back office vocabulary, defined plainly.",
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
          <dl>
            {glossary.terms.map((t, i) => (
              <Reveal
                key={t.term}
                delay={Math.min(i, 8) * 35}
                className="grid gap-2 border-t border-hairline py-6 last:border-b md:grid-cols-[minmax(0,20rem)_1fr] md:gap-12 md:py-7"
              >
                <dt id={tocId(t.term)} className="t-h4 scroll-mt-28 text-white">
                  {t.term}
                </dt>
                <dd className="max-w-[62ch] t-body text-text-secondary">{t.def}</dd>
              </Reveal>
            ))}
          </dl>
        </section>

        <Closing />
      </div>
    </PageFrame>
  );
}
