import type { Metadata } from "next"
import { NavbarSubpage } from "@/components/navbar-subpage"
import { Footer } from "@/components/footer"
import { PricingSection } from "@/components/pricing-section"

export const metadata: Metadata = {
  title: "Pricing - Plarix",
  description:
    "Plarix pricing: a free diagnostic, a one-time build scoped to what we find, a flat monthly fee, and an optional outcome bonus after 90 days of proven numbers.",
  alternates: {
    canonical: "https://plarix.dev/pricing",
  },
  openGraph: {
    title: "Pricing - Plarix",
    description:
      "Plarix pricing: a free diagnostic, a one-time build scoped to what we find, a flat monthly fee, and an optional outcome bonus after 90 days of proven numbers.",
    url: "https://plarix.dev/pricing",
    siteName: "Plarix",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing - Plarix",
    description:
      "Plarix pricing: a free diagnostic, a one-time build scoped to what we find, a flat monthly fee, and an optional outcome bonus after 90 days of proven numbers.",
  },
}

export default function PricingPage() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-50">
        <div className="mx-auto h-full max-w-7xl">
          <div className="relative h-full">
            <div className="absolute left-0 top-0 h-full w-px bg-slate-800/20" />
            <div className="absolute right-0 top-0 h-full w-px bg-slate-800/20" />
          </div>
        </div>
      </div>

      <NavbarSubpage />

      <main className="bg-slate-950 min-h-screen pt-14">
        <PricingSection />
      </main>

      <Footer />
    </>
  )
}
