import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { PageFrame } from "@/components/site/page-frame";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { Closing } from "@/components/site/closing";
import { JsonLd, breadcrumbLd, pageMeta } from "@/lib/seo";
import { SITE_URL, processes } from "@/content/site";

export function generateStaticParams() {
  return processes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = processes.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMeta({ title: p.metaTitle, description: p.metaDescription, path: `/processes/${p.slug}` });
}

const lists = [
  { key: "reads", heading: "What it reads" },
  { key: "does", heading: "What it does" },
  { key: "gives", heading: "What you get back" },
] as const;

export default async function ProcessPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const process = processes.find((p) => p.slug === slug);
  if (!process) notFound();

  const index = processes.findIndex((p) => p.slug === slug);
  const next = processes[(index + 1) % processes.length];

  const crumbs = [
    { label: "Plarix", href: "/" },
    { label: "Processes", href: "/processes" },
    { label: process.name, href: `/processes/${process.slug}` },
  ];

  return (
    <PageFrame>
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: process.name,
            serviceType: process.name,
            description: process.metaDescription,
            url: `${SITE_URL}/processes/${process.slug}`,
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: { "@type": "Country", name: "United States" },
            audience: {
              "@type": "Audience",
              audienceType: "HVAC, plumbing and home services contractors",
            },
          },
        ]}
      />

      <div id="main">
        <PageHeader eyebrowCrumbs={crumbs} title={process.name} lede={process.short} />

        <section className="shell pb-20 md:pb-28">
          <Reveal className="max-w-[68ch]">
            <p className="t-body-lg text-text-secondary">
              {process.detail}
            </p>
          </Reveal>

          <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-10">
            {lists.map((list, i) => (
              <Reveal key={list.key} delay={i * 110} className="reveal-stagger">
                <h2 className="mb-6 border-t border-hairline pt-5 t-label text-text-tertiary">
                  {list.heading}
                </h2>
                <ul className="space-y-4">
                  {process[list.key].map((item) => (
                    <li
                      key={item}
                      className="t-body text-text-secondary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal delay={220} className="mt-16 md:mt-24">
            <div className="rounded-2xl bg-ink-800 p-8 ring-1 ring-hairline md:p-10">
              <h2 className="t-label text-text-tertiary">
                Why this one
              </h2>
              <p className="mt-5 max-w-[52ch] text-lg leading-snug text-white md:text-2xl">
                {process.why}
              </p>
            </div>
          </Reveal>

          <Reveal delay={260} className="mt-14">
            <Link
              href={`/processes/${next.slug}`}
              className="group inline-flex items-center gap-3 text-base text-text-secondary transition-colors duration-200 hover:text-white md:text-lg"
            >
              <span className="text-text-tertiary">Next</span>
              <span className="link-sweep">{next.name}</span>
              <ArrowRight
                size={18}
                strokeWidth={1.75}
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </section>

        <Closing />
      </div>
    </PageFrame>
  );
}
