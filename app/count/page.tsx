import { PageFrame } from "@/components/site/page-frame";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { CountForm } from "@/components/site/count-form";
import { JsonLd, breadcrumbLd, pageMeta } from "@/lib/seo";
import { closing } from "@/content/site";

export const metadata = pageMeta({
  title: "Get your count",
  description:
    "Twenty minutes and read access. We return a written number for what is sitting unclaimed in your data. Free, no contract, and no pitch attached.",
  path: "/count",
});

const crumbs = [
  { label: "Plarix", href: "/" },
  { label: "Get your count", href: "/count" },
];

const steps = [
  {
    h: "You send this form",
    p: "Name, company, work email, and where you would like us to look first. That is the whole ask at this stage.",
  },
  {
    h: "We talk for twenty minutes",
    p: "Enough to understand what you run on and get read access sorted. Nothing gets installed and nothing gets changed.",
  },
  {
    h: "You get a written number",
    p: "Within about a week: what is sitting there, process by process, with the jobs behind each figure listed so you can check any line yourself.",
  },
  {
    h: "Then you decide",
    p: "If the number is not worth acting on, we will say so first. Nothing about this obliges you to anything.",
  },
];

export default function CountPage() {
  return (
    <PageFrame>
      <JsonLd data={breadcrumbLd(crumbs)} />

      <div id="main">
        <PageHeader eyebrowCrumbs={crumbs} title={closing.heading} lede={closing.body} />

        <section className="shell pb-16 md:pb-24">
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
            <Reveal className="reveal-stagger">
              <h2 className="mb-8 t-label text-text-tertiary">
                What happens next
              </h2>
              <ol className="relative">
                <span
                  className="absolute left-[5px] top-3 bottom-4 w-px bg-white/10"
                  aria-hidden="true"
                />
                {steps.map((s, i) => (
                  <li
                    key={s.h}
                    className="relative flex gap-6 pb-9 last:pb-0"
                    style={{ transitionDelay: `${120 + i * 90}ms` }}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-[11px] w-[11px] shrink-0 rounded-full bg-white"
                    />
                    <div className="max-w-[46ch]">
                      <h3 className="t-h4 text-white">
                        {s.h}
                      </h3>
                      <p className="mt-2 t-body text-text-secondary">
                        {s.p}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={140}>
              <CountForm />
            </Reveal>
          </div>
        </section>
      </div>
    </PageFrame>
  );
}
