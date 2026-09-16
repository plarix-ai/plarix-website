import Link from "next/link";

import { PageFrame } from "@/components/site/page-frame";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { AnswerBlock } from "@/components/site/answer-block";
import { Closing } from "@/components/site/closing";
import { JsonLd, breadcrumbLd, pageMeta } from "@/lib/seo";
import { CONTACT_EMAIL, SITE_URL, answers, company, entity, processes } from "@/content/site";

export const metadata = pageMeta({
  title: "About Plarix",
  description:
    "Plarix is an American AI integration company building operational AI for home services contractors. What it is, who it serves, and what it is not.",
  path: "/about",
});

const crumbs = [
  { label: "Plarix", href: "/" },
  { label: "About", href: "/about" },
];

const facts = [
  { k: "What it is", v: "AI integration company building agentic process automation" },
  { k: "Industry", v: "Operational AI for home services" },
  { k: "Serves", v: "HVAC, plumbing, electrical and adjacent trades" },
  { k: "Operates in", v: "United States" },
  { k: "Founded", v: entity.foundingDate },
  { k: "Contact", v: CONTACT_EMAIL },
];

export default function AboutPage() {
  return (
    <PageFrame>
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Plarix",
            url: `${SITE_URL}/about`,
            description: entity.disambiguating,
            mainEntity: { "@id": `${SITE_URL}/#organization` },
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
        ]}
      />

      <div id="main">
        <PageHeader
          eyebrowCrumbs={crumbs}
          title="About Plarix"
          lede="An American AI integration company building operational AI for home services contractors."
        />

        <section className="shell pb-16 md:pb-24">
          <AnswerBlock question={answers.whatIsPlarix.q} answer={answers.whatIsPlarix.a} />

          <Reveal delay={80} className="mt-12 md:mt-16">
            <h2 className="t-label mb-6 text-text-tertiary">At a glance</h2>
            <dl className="grid gap-x-12 md:grid-cols-2">
              {facts.map((f) => (
                <div
                  key={f.k}
                  className="flex items-baseline justify-between gap-6 border-b border-hairline py-4"
                >
                  <dt className="t-body-sm text-text-tertiary">{f.k}</dt>
                  <dd className="t-body-sm text-right text-white">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/*
            Said plainly, because a much larger company in an unrelated industry owns a
            near-identical string and a reader arriving here may have meant them.
          */}
          <Reveal delay={140} className="mt-12 md:mt-16">
            <div className="rounded-2xl bg-ink-800 p-7 ring-1 ring-hairline md:p-9">
              <h2 className="t-label text-text-tertiary">Not to be confused with</h2>
              <p className="mt-5 max-w-[62ch] t-body text-text-secondary">
                Plarix is sometimes confused with similarly spelled companies in unrelated
                industries, including Playrix, a mobile games developer. There is no
                affiliation, ownership or connection of any kind between them. Plarix builds
                back office automation for home services contractors in the United States and
                does nothing else.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 md:mt-16">
            {company.sections.map((s, i) => (
              <Reveal
                key={s.h}
                delay={i * 70}
                className="grid gap-6 border-t border-hairline py-10 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-12 md:py-12"
              >
                <h2 className="t-h3 text-white">{s.h}</h2>
                <div className="max-w-[62ch] space-y-5">
                  {s.p.map((p, j) => (
                    <p key={j} className="t-body text-text-secondary">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-12">
            <h2 className="t-label mb-6 text-text-tertiary">What it runs</h2>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {processes.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/processes/${p.slug}`}
                    prefetch={false}
                    className="link-sweep t-body-sm text-text-secondary transition-colors duration-200 hover:text-white"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 t-body-sm text-text-tertiary">
              More on what the company believes and will not do:{" "}
              <Link href="/company" className="link-sweep text-white">
                what we believe
              </Link>
              .
            </p>
          </Reveal>
        </section>

        <Closing />
      </div>
    </PageFrame>
  );
}
