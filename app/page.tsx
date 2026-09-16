import { Hero } from "@/components/site/hero";
import { AfterTheCall } from "@/components/site/after-the-call";
import { Processes } from "@/components/site/processes";
import { Method } from "@/components/site/method";
import { Report } from "@/components/site/report";
import { Start } from "@/components/site/start";
import { Refusals } from "@/components/site/refusals";
import { Pricing } from "@/components/site/pricing";
import { Faq } from "@/components/site/faq";
import { Closing } from "@/components/site/closing";
import { ColumnRules } from "@/components/site/column-rules";
import { JsonLd, itemListLd } from "@/lib/seo";
import { processes } from "@/content/site";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          itemListLd(
            "Processes Plarix runs for home services companies",
            processes.map((p) => ({
              name: p.name,
              href: `/processes/${p.slug}`,
              description: p.short,
            })),
          ),
        ]}
      />

      <Hero />

      {/* Everything below scrolls up over the fixed hero surface. */}
      <main id="main" className="relative z-20 bg-background">
        <ColumnRules />
        <AfterTheCall />
        <Processes />
        <Method />
        <Report />
        <Start />
        <Refusals />
        <Pricing />
        <Faq />
        <Closing />
      </main>
    </>
  );
}
