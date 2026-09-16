import Link from "next/link";

import { PageFrame } from "@/components/site/page-frame";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { JsonLd, breadcrumbLd, itemListLd, pageMeta } from "@/lib/seo";
import { journal } from "@/content/site";

export const metadata = pageMeta({
  title: "Journal",
  description:
    "Plain explanations of where money goes missing in a home services business. One specific mechanism at a time, with no pitch attached.",
  path: "/journal",
});

const crumbs = [
  { label: "Plarix", href: "/" },
  { label: "Journal", href: "/journal" },
];

const fmt = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export default function JournalPage() {
  const posts = [...journal].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <PageFrame>
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          itemListLd(
            "Plarix journal",
            posts.map((p) => ({
              name: p.title,
              href: `/journal/${p.slug}`,
              description: p.dek,
            })),
          ),
        ]}
      />

      <div id="main">
        <PageHeader
          eyebrowCrumbs={crumbs}
          title="Where the money goes."
          lede="Plain explanations of one specific mechanism at a time. No pitch attached, and nothing here needs us to be useful to you."
        />

        <section className="shell pb-16 md:pb-24">
          <ol>
            {posts.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={i * 80}>
                <Link
                  href={`/journal/${post.slug}`}
                  className="group grid gap-3 border-t border-hairline py-9 last:border-b md:grid-cols-[minmax(0,10rem)_1fr] md:gap-12 md:py-12"
                >
                  <div className="flex items-baseline gap-3 t-caption text-text-tertiary md:block">
                    <time dateTime={post.date}>{fmt(post.date)}</time>
                    <span className="md:mt-1.5 md:block">{post.readingMinutes} min read</span>
                  </div>
                  <div className="max-w-[58ch]">
                    <h2
                      className="t-h3 text-white"
                     
                    >
                      <span className="link-sweep">{post.title}</span>
                    </h2>
                    <p className="mt-3 t-body text-text-secondary">
                      {post.dek}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ol>
        </section>
      </div>
    </PageFrame>
  );
}
