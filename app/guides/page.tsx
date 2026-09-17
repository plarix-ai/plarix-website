import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageFrame } from "@/components/site/page-frame";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { ScrubList } from "@/components/site/scroll-motion";
import { at } from "@/lib/scrub";
import { Closing } from "@/components/site/closing";
import { JsonLd, breadcrumbLd, itemListLd, pageMeta } from "@/lib/seo";
import { guides } from "@/content/site";

export const metadata = pageMeta({
  title: "Guides",
  description:
    "Long explanations for someone deciding something. How warranty claim recovery works, and whether a warranty coordinator is worth hiring.",
  path: "/guides",
});

const crumbs = [
  { label: "Plarix", href: "/" },
  { label: "Guides", href: "/guides" },
];

export default function GuidesPage() {
  return (
    <PageFrame>
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          itemListLd(
            "Plarix guides",
            guides.map((g) => ({ name: g.title, href: `/guides/${g.slug}`, description: g.dek })),
          ),
        ]}
      />

      <div id="main">
        <PageHeader
          eyebrowCrumbs={crumbs}
          title="The long explanations."
          lede="For when you are deciding something rather than reading something. No pitch attached, and each one ends with work you can do yourself."
        />

        <section className="shell pb-20 md:pb-28">
          <ScrubList as="div" count={guides.length} to={0.72}>
          <ol>
            {guides.map((g, i) => (
              <Reveal
                as="li"
                key={g.slug}
                delay={i * 80}
                className="scrub-item"
                style={at(i, guides.length)}
              >
                <Link
                  href={`/guides/${g.slug}`}
                  prefetch={false}
                  className="press group grid gap-3 border-t border-hairline py-9 last:border-b md:grid-cols-[minmax(0,9rem)_1fr_auto] md:gap-12 md:py-11"
                >
                  <span className="t-caption text-text-tertiary">{g.readingMinutes} min read</span>
                  <span className="max-w-[58ch]">
                    <span className="block t-h3 text-white">
                      <span className="link-sweep">{g.title}</span>
                    </span>
                    <span className="mt-3 block t-body text-text-secondary">{g.dek}</span>
                  </span>
                  <ArrowRight
                    size={19}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="mt-1 hidden shrink-0 text-text-tertiary transition-all duration-200 ease-out group-hover:translate-x-1 group-hover:text-white md:block"
                  />
                </Link>
              </Reveal>
            ))}
          </ol>
          </ScrubList>
        </section>

        <Closing />
      </div>
    </PageFrame>
  );
}
