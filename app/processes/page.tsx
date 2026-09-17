import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageFrame } from "@/components/site/page-frame";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { ScrubList } from "@/components/site/scroll-motion";
import { at } from "@/lib/scrub";
import { Closing } from "@/components/site/closing";
import { JsonLd, breadcrumbLd, itemListLd, pageMeta } from "@/lib/seo";
import { processes } from "@/content/site";

export const metadata = pageMeta({
  title: "What we run",
  description:
    "The six back office processes Plarix runs for home services companies, from warranty recovery to permits, technician pay and agreements.",
  path: "/processes",
});

const crumbs = [
  { label: "Plarix", href: "/" },
  { label: "Processes", href: "/processes" },
];

export default function ProcessesPage() {
  return (
    <PageFrame>
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          itemListLd(
            "Processes Plarix runs",
            processes.map((p) => ({
              name: p.name,
              href: `/processes/${p.slug}`,
              description: p.short,
            })),
          ),
        ]}
      />

      <div id="main">
        <PageHeader
          eyebrowCrumbs={crumbs}
          title="One process at a time, finished."
          lede="Not a platform and not a suite. A specific piece of your operation, handed over completely, then the next one. These are the six we run today."
        />

        <section className="shell pb-18 md:pb-26">
          <ScrubList as="div" count={processes.length} to={0.7}>
          <ol>
            {processes.map((p, i) => (
              <Reveal
                as="li"
                key={p.slug}
                delay={i * 70}
                className="scrub-item"
                style={at(i, processes.length)}
              >
                <Link
                  href={`/processes/${p.slug}`}
                  prefetch={false}
                  className="press group grid items-start gap-3 border-t border-hairline py-8 last:border-b md:grid-cols-[minmax(0,28rem)_1fr_auto] md:gap-12 md:py-10"
                >
                  <h2 className="t-h3 text-white transition-colors duration-200">
                    <span className="link-sweep">{p.name}</span>
                  </h2>
                  <p className="max-w-[58ch] t-body text-text-secondary md:pt-1.5">
                    {p.short}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-1 hidden text-text-tertiary transition-all duration-200 ease-out group-hover:translate-x-1 group-hover:text-white md:block"
                  >
                    <ArrowRight size={20} strokeWidth={1.75} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
          </ScrubList>

          <Reveal delay={200} className="mt-14">
            <p className="max-w-[58ch] t-body text-text-secondary">
              Every one of these starts the same way. We count what is sitting there in your own
              data, in writing, before anything is built or sold.
            </p>
          </Reveal>
        </section>

        <Closing />
      </div>
    </PageFrame>
  );
}
