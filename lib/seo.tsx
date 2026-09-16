import type { Metadata } from "next";

import { SITE_URL } from "@/content/site";

/**
 * One place that builds page metadata, so no route can quietly ship without a
 * canonical, a description, or a social card.
 */
export function pageMeta({
  title,
  description,
  path,
  type = "website",
  published,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  published?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Plarix",
      type,
      locale: "en_US",
      ...(published ? { publishedTime: published } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@theplarix",
      creator: "@theplarix",
    },
  };
}

/** Breadcrumb trail, which is what lets an assistant place a page in the site. */
export function breadcrumbLd(crumbs: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${SITE_URL}${c.href}`,
    })),
  };
}

export function faqLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function itemListLd(name: string, items: { name: string; href: string; description: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      description: it.description,
      url: `${SITE_URL}${it.href}`,
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((b, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }}
        />
      ))}
    </>
  );
}
