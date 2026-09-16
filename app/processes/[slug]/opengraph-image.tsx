import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { processes } from "@/content/site";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "A process Plarix runs";

export function generateStaticParams() {
  return processes.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = processes.find((x) => x.slug === slug);
  return ogImage({ title: p?.name ?? "Processes", kicker: "A process we run" });
}
