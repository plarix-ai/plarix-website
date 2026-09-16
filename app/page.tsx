import { Hero } from "@/components/site/hero";
import { AfterTheCall } from "@/components/site/after-the-call";
import { Processes } from "@/components/site/processes";
import { Method } from "@/components/site/method";
import { Start } from "@/components/site/start";
import { Refusals } from "@/components/site/refusals";
import { Pricing } from "@/components/site/pricing";
import { Faq } from "@/components/site/faq";
import { Closing } from "@/components/site/closing";
import { Footer } from "@/components/site/footer";
import { faqs } from "@/content/site";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Hero />

      {/* Everything below scrolls up over the fixed hero surface. */}
      <main className="relative z-20 bg-background">
        {/*
          Column rules marking the measure. The page is built on a fixed shell, and
          on a wide display saying so plainly reads as precision rather than as
          decoration. They fade out at both ends so they never terminate abruptly.
        */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
          <div className="shell h-full">
            <div className="relative h-full">
              {(["left", "right"] as const).map((side) => (
                <span
                  key={side}
                  className="absolute top-0 h-full w-px"
                  style={{
                    [side]: "-0.5px",
                    background:
                      "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.07) 6%, rgba(255,255,255,0.07) 94%, rgba(255,255,255,0) 100%)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <AfterTheCall />
        <Processes />
        <Method />
        <Start />
        <Refusals />
        <Pricing />
        <Faq />
        <Closing />
      </main>

      <div className="relative z-20 bg-background">
        <Footer />
      </div>
    </>
  );
}
