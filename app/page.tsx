import { Navbar, Hero } from "@/components/hero";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ProblemSection } from "@/components/problem-section";
import { HowItWorksSection } from "@/components/approach-section";
import { FeaturesSection } from "@/components/features-section";
import { PricingSection } from "@/components/pricing-section";
import { TrustSection } from "@/components/trust-section";
import { FaqSection } from "@/components/faq-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      {/* Vertical margin lines */}
      <div className="pointer-events-none fixed inset-0 z-50">
        <div className="mx-auto h-full max-w-7xl">
          <div className="relative h-full">
            <div className="absolute left-0 top-0 h-full w-px bg-slate-800/20" />
            <div className="absolute right-0 top-0 h-full w-px bg-slate-800/20" />
          </div>
        </div>
      </div>

      <ScrollToTop />

      {/* Single sticky navbar - always sticks to top on scroll, no jiggle */}
      <Navbar />

      <main>
        <Hero />
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesSection />
        <PricingSection />
        <TrustSection />
        <FaqSection />
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
