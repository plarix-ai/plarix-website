import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: "https://plarix.dev", lastModified, changeFrequency: "weekly", priority: 1 },
    { url: "https://plarix.dev/privacy", lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
