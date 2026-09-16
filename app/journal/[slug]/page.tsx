import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { PageFrame } from "@/components/site/page-frame";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { Closing } from "@/components/site/closing";
import { ReadingProgress } from "@/components/site/reading-progress";
import { Toc } from "@/components/site/toc";
import { tocId } from "@/lib/slug";
import { JsonLd, breadcrumbLd, pageMeta } from "@/lib/seo";
import { SITE_URL, journal } from "@/content/site";

export function generateStaticParams() {
  return journal.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = journal.find((p) => p.slug === slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.dek,
    path: `/journal/${post.slug}`,
    type: "article",
    published: post.date,
  });
}

const fmt = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export default async function JournalPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = journal.find((p) => p.slug === slug);
  if (!post) notFound();

  const index = journal.findIndex((p) => p.slug === slug);
  const next = journal[(index + 1) % journal.length];

  const headings: string[] = post.body.flatMap((b) => (b.h ? [b.h as string] : []));

  const crumbs = [
    { label: "Plarix", href: "/" },
    { label: "Journal", href: "/journal" },
    { label: post.title, href: `/journal/${post.slug}` },
  ];

  return (
    <PageFrame>
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.dek,
            datePublished: post.date,
            dateModified: post.date,
            url: `${SITE_URL}/journal/${post.slug}`,
            mainEntityOfPage: `${SITE_URL}/journal/${post.slug}`,
            author: { "@id": `${SITE_URL}/#organization` },
            publisher: { "@id": `${SITE_URL}/#organization` },
            image: `${SITE_URL}/brand/og.png`,
            inLanguage: "en-US",
          },
        ]}
      />

      <ReadingProgress />

      <div id="main">
        <PageHeader eyebrowCrumbs={crumbs} title={post.title} lede={post.dek}>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 t-caption text-text-tertiary">
            <time dateTime={post.date}>{fmt(post.date)}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readingMinutes} min read</span>
          </p>
        </PageHeader>

        <div className="shell grid gap-14 pb-16 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-20">
          <article className="measure">
            {post.body.map((block, i) => (
              <Reveal key={i} delay={i * 50} className="mt-14 first:mt-0">
                {block.h ? (
                  <h2 id={tocId(block.h)} className="mb-5 t-h3 scroll-mt-32 text-white">
                    {block.h}
                  </h2>
                ) : null}
                <div className="space-y-5">
                  {block.p.map((p, j) => (
                    <p key={j} className="t-prose text-text-prose">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </article>

          <aside className="hidden lg:block">
            <Toc headings={headings} />
          </aside>
        </div>

        <div className="shell pb-20 md:pb-28">
          <Reveal delay={200} className="border-t border-hairline pt-10">
            <Link
              href={`/journal/${next.slug}`}
              className="group inline-flex items-center gap-3 text-base text-text-secondary transition-colors duration-200 hover:text-white md:text-lg"
            >
              <span className="text-text-tertiary">Next</span>
              <span className="link-sweep">{next.title}</span>
              <ArrowRight
                size={18}
                strokeWidth={1.75}
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        <Closing />
      </div>
    </PageFrame>
  );
}
