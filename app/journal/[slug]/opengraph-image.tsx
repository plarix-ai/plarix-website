import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { journal } from "@/content/site";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "A piece from the Plarix journal";

export function generateStaticParams() {
  return journal.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = journal.find((x) => x.slug === slug);
  return ogImage({ title: post?.title ?? "Journal", kicker: "Journal" });
}
