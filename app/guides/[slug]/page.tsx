import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { PageFrame } from "@/components/site/page-frame";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { Parallax, ScrubList, SectionRule } from "@/components/site/scroll-motion";
import { at } from "@/lib/scrub";
import { Toc } from "@/components/site/toc";
import { ReadingProgress } from "@/components/site/reading-progress";
import { Closing } from "@/components/site/closing";
import { JsonLd, breadcrumbLd, faqLd, pageMeta } from "@/lib/seo";
import { SITE_URL, guides, processes } from "@/content/site";
import { tocId } from "@/lib/slug";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (!g) return {};
  return pageMeta({
    /* The display title is a sentence; the tab and result title has a 50 character
       budget once the site name is appended. */
    title: g.shortTitle,
    description: g.metaDescription,
    path: `/guides/${g.slug}`,
    type: "article",
    published: g.updated,
  });
}

const fmt = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const headings: string[] = guide.body.map((b) => b.h as string);
  const related = processes.filter((p) => (guide.related as readonly string[]).includes(p.slug));
  const wordCount =
    guide.intro.split(/\s+/).length +
    guide.body.reduce((n, b) => n + b.p.reduce((m, x) => m + x.split(/\s+/).length, 0), 0);

  const crumbs = [
    { label: "Plarix", href: "/" },
    { label: "Guides", href: "/guides" },
    { label: guide.shortTitle, href: `/guides/${guide.slug}` },
  ];

  return (
    <PageFrame>
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          faqLd(guide.faqs),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: guide.title,
            description: guide.metaDescription,
            datePublished: guide.updated,
            dateModified: guide.updated,
            url: `${SITE_URL}/guides/${guide.slug}`,
            mainEntityOfPage: `${SITE_URL}/guides/${guide.slug}`,
            author: { "@id": `${SITE_URL}/#organization` },
            publisher: { "@id": `${SITE_URL}/#organization` },
            inLanguage: "en-US",
            wordCount,
            articleSection: "Guides",
            about: related.map((r) => ({ "@type": "Thing", name: r.name })),
            /* Names the passage an assistant should read aloud or lift first. */
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["#guide-intro"],
            },
          },
        ]}
      />

      <ReadingProgress />

      <div id="main">
        <PageHeader eyebrowCrumbs={crumbs} title={guide.title} lede={guide.dek}>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 t-caption text-text-tertiary">
            <span>Updated {fmt(guide.updated)}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{guide.readingMinutes} min read</span>
          </p>
        </PageHeader>

        <div className="shell grid gap-12 pb-16 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14">
          <article className="measure">
            <Reveal>
              <p id="guide-intro" className="t-lead text-white">
                {guide.intro}
              </p>
            </Reveal>

            {guide.body.map((block, i) => (
              <Reveal key={i} delay={Math.min(i, 5) * 45} className="mt-14">
                <Reveal
                  as="h2"
                  clip
                  id={tocId(block.h)}
                  className="mb-5 t-h3 scroll-mt-32 text-white"
                >
                  {block.h}
                </Reveal>
                <div className="space-y-5">
                  {block.p.map((p, j) => (
                    <p key={j} className="t-prose text-text-prose">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}

            <ScrubList as="div" count={guide.faqs.length} className="mt-16" to={0.74}>
            <Reveal className="relative border-t border-hairline pt-12">
              <SectionRule />
              <Reveal as="h2" clip id="questions" className="mb-8 t-h3 scroll-mt-32 text-white">
                Questions
              </Reveal>
              <dl>
                {guide.faqs.map((f, fi) => (
                  <div
                    key={f.q}
                    className="scrub-item border-t border-hairline py-6 last:border-b"
                    style={at(fi, guide.faqs.length)}
                  >
                    <dt className="t-h4 text-white">{f.q}</dt>
                    <dd className="mt-3 t-body text-text-secondary">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            </ScrubList>

            {related.length ? (
              <Reveal className="mt-14">
                <Reveal as="h2" clip className="t-label mb-6 text-text-tertiary">
                  What we run for this
                </Reveal>
                <ul>
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/processes/${r.slug}`}
                        prefetch={false}
                        className="press group flex items-baseline justify-between gap-6 border-b border-hairline py-4"
                      >
                        <span className="t-h4 text-text-secondary transition-colors duration-200 group-hover:text-white">
                          {r.name}
                        </span>
                        <ArrowRight
                          size={16}
                          strokeWidth={1.75}
                          aria-hidden="true"
                          className="shrink-0 translate-y-0.5 text-text-tertiary transition-all duration-200 ease-out group-hover:translate-x-1 group-hover:text-white"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </article>

          <Parallax as="aside" distance={16} className="hidden lg:block">
            <Toc headings={[...headings, "Questions"]} />
          </Parallax>
        </div>

        <Closing />
      </div>
    </PageFrame>
  );
}
