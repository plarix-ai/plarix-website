import type { MetadataRoute } from "next";

import { SITE_URL, guides, journal, processes } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core = ([
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/processes`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/how-it-works`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/pricing`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/integrations`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/glossary`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/count`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/company`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/guides`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/journal`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/faq`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ] as const).map((e) => ({ ...e, lastModified: now })) as MetadataRoute.Sitemap;

  const processPages: MetadataRoute.Sitemap = processes.map((p) => ({
    url: `${SITE_URL}/processes/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const guidePages: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    lastModified: new Date(`${g.updated}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const posts: MetadataRoute.Sitemap = journal.map((p) => ({
    url: `${SITE_URL}/journal/${p.slug}`,
    lastModified: new Date(`${p.date}T00:00:00Z`),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...core, ...processPages, ...guidePages, ...posts];
}
