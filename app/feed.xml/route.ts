import { SITE_URL, journal } from "@/content/site";

/**
 * A feed is a real discovery signal and costs nothing to keep correct, because it
 * is generated from the same array the journal pages are.
 */
export const dynamic = "force-static";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const posts = [...journal].sort((a, b) => b.date.localeCompare(a.date));
  const updated = posts[0] ? new Date(`${posts[0].date}T00:00:00Z`).toUTCString() : new Date().toUTCString();

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/journal/${p.slug}`;
      const body = p.body
        .map((b) => (b.h ? `<h2>${escape(b.h)}</h2>` : "") + b.p.map((x) => `<p>${escape(x)}</p>`).join(""))
        .join("");
      return `    <item>
      <title>${escape(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(p.dek)}</description>
      <content:encoded><![CDATA[${body}]]></content:encoded>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Plarix Journal</title>
    <link>${SITE_URL}/journal</link>
    <description>Plain explanations of where money goes missing in a home services business. One specific mechanism at a time.</description>
    <language>en-US</language>
    <lastBuildDate>${updated}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
