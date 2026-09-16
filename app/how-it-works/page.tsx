import { PageFrame } from "@/components/site/page-frame";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { Report } from "@/components/site/report";
import { Refusals } from "@/components/site/refusals";
import { Closing } from "@/components/site/closing";
import { JsonLd, breadcrumbLd, pageMeta } from "@/lib/seo";
import { SITE_URL, method } from "@/content/site";

export const metadata = pageMeta({
  title: "How it works",
  description:
    "Count, build, prove. Plarix reads a contractor's real data first and reports what is sitting there, builds the narrow process that handles it, then proves the result in dollars every month.",
  path: "/how-it-works",
});

const crumbs = [
  { label: "Plarix", href: "/" },
  { label: "How it works", href: "/how-it-works" },
];

export default function HowItWorksPage() {
  return (
    <PageFrame>
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How Plarix takes over a back office process",
            description:
              "Three steps: a free count of what is sitting unclaimed in a contractor's own data, a narrow build scoped to what the count found, and a monthly one page proof in dollars.",
            url: `${SITE_URL}/how-it-works`,
            totalTime: "P6W",
            step: method.steps.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.verb,
              text: s.body,
            })),
          },
        ]}
      />

      <div id="main">
        <PageHeader
          eyebrowCrumbs={crumbs}
          title={method.heading}
          lede={method.intro}
        />

        <section className="shell pb-8">
          {method.steps.map((step, i) => (
            <Reveal
              key={step.verb}
              delay={i * 90}
              className="grid gap-6 border-t border-hairline py-12 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-12 md:py-12"
            >
              <div>
                <h2 className="t-h2 text-white">
                  {step.verb}
                </h2>
                <p className="mt-3 t-label text-text-tertiary">
                  {step.time}
                </p>
              </div>
              <div className="max-w-[62ch]">
                <p className="t-body-lg text-white">{step.body}</p>
                <p className="mt-5 t-body text-text-secondary">
                  {step.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </section>

        <Report />
        <Refusals />
        <Closing />
      </div>
    </PageFrame>
  );
}
