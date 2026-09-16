import { PageFrame } from "@/components/site/page-frame";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { Closing } from "@/components/site/closing";
import { JsonLd, breadcrumbLd, itemListLd, pageMeta } from "@/lib/seo";
import { integrations } from "@/content/site";

export const metadata = pageMeta({
  title: "Works with what you already run",
  description:
    "Plarix reads ServiceTitan, Jobber, FieldEdge, Housecall Pro, Service Fusion and ServiceTrade, plus accounting, supplier and manufacturer portals. Read access only, no migration, no new software for your team.",
  path: "/integrations",
});

const crumbs = [
  { label: "Plarix", href: "/" },
  { label: "Integrations", href: "/integrations" },
];

export default function IntegrationsPage() {
  return (
    <PageFrame>
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          itemListLd(
            "Systems Plarix reads",
            integrations.platforms.map((p) => ({
              name: p.name,
              href: "/integrations",
              description: p.note,
            })),
          ),
        ]}
      />

      <div id="main">
        <PageHeader
          eyebrowCrumbs={crumbs}
          title={integrations.heading}
          lede={integrations.lede}
        />

        <section className="shell pb-16 md:pb-24">
          <Reveal className="reveal-stagger">
            <h2 className="t-label mb-7 text-text-tertiary">Field service platforms</h2>
            <ul className="grid gap-x-12 gap-y-0 md:grid-cols-2">
              {integrations.platforms.map((p, i) => (
                <li
                  key={p.name}
                  className="border-b border-hairline py-5"
                  style={{ transitionDelay: `${80 + i * 60}ms` }}
                >
                  <h3 className="t-h4 text-white">{p.name}</h3>
                  <p className="mt-1.5 t-body-sm text-text-secondary">{p.note}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="reveal-stagger mt-14 md:mt-20">
            <h2 className="t-label mb-7 text-text-tertiary">And what sits around them</h2>
            <ul className="grid gap-x-12 gap-y-0 md:grid-cols-3">
              {integrations.alsoRead.map((p, i) => (
                <li
                  key={p.name}
                  className="border-b border-hairline py-5"
                  style={{ transitionDelay: `${80 + i * 60}ms` }}
                >
                  <h3 className="t-h4 text-white">{p.name}</h3>
                  <p className="mt-1.5 t-body-sm text-text-secondary">{p.note}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={180} className="mt-14 md:mt-20">
            <div className="rounded-2xl bg-ink-800 p-7 ring-1 ring-hairline md:p-9">
              <h2 className="t-label text-text-tertiary">{integrations.honest.h}</h2>
              <div className="mt-5 max-w-[62ch] space-y-4">
                {integrations.honest.p.map((p, i) => (
                  <p key={i} className="t-body text-text-secondary">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <Closing />
      </div>
    </PageFrame>
  );
}
