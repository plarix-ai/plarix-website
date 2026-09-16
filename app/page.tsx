import fs from "node:fs";
import path from "node:path";

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

/**
 * The cinematic loop is optional. Drop it at public/video/hero.mp4 (plus an
 * optional first frame at public/video/hero-poster.jpg) and it takes over the
 * hero on the next build. Until then the canvas scene behind it carries the page.
 */
function heroMedia() {
  const dir = path.join(process.cwd(), "public", "video");
  const has = (file: string) => {
    try {
      return fs.existsSync(path.join(dir, file));
    } catch {
      return false;
    }
  };
  const video = ["hero.mp4", "hero.webm"].find(has);
  const poster = ["hero-poster.jpg", "hero-poster.png", "hero-poster.webp"].find(has);
  return {
    videoSrc: video ? `/video/${video}` : undefined,
    posterSrc: poster ? `/video/${poster}` : undefined,
  };
}

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
  const { videoSrc, posterSrc } = heroMedia();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Hero videoSrc={videoSrc} posterSrc={posterSrc} />

      {/* Everything below scrolls up over the fixed hero footage. */}
      <main className="relative z-20 bg-background">
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
