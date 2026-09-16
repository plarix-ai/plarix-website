import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { guides } from "@/content/site";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "A Plarix guide";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  return ogImage({ title: g?.shortTitle ?? "Guides", kicker: "Guide" });
}
