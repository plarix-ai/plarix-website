import { Hero } from "@/components/site/hero";
import { AnswerBlock } from "@/components/site/answer-block";
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
import { answers, processes } from "@/content/site";

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
        {/* Answer first, high on the page, written to be quoted whole. */}
        <section className="shell pt-16 md:pt-24">
          <AnswerBlock question={answers.whatIsPlarix.q} answer={answers.whatIsPlarix.a} />
        </section>
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
