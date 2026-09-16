import type { Metadata } from "next"
import { NavbarSubpage } from "@/components/navbar-subpage"
import { Footer } from "@/components/footer"
import { FaqSection } from "@/components/faq-section"
import { faqs } from "@/lib/faq-data"

export const metadata: Metadata = {
  title: "FAQ — Plarix",
  description:
    "Common questions about how Plarix finds and files warranty claims, contract terms, and platform integrations with ServiceTitan, Jobber, and FieldEdge.",
  alternates: {
    canonical: "https://plarix.dev/faq",
  },
  openGraph: {
    title: "FAQ — Plarix",
    description:
      "Common questions about how Plarix finds and files warranty claims, contract terms, and platform integrations with ServiceTitan, Jobber, and FieldEdge.",
    url: "https://plarix.dev/faq",
    siteName: "Plarix",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — Plarix",
    description:
      "Common questions about how Plarix finds and files warranty claims, contract terms, and platform integrations.",
  },
}

const schemaData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

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
        <FaqSection />
      </main>

      <Footer />
    </>
  )
}
