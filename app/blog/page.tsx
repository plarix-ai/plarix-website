import type { Metadata } from "next"
import { NavbarSubpage } from "@/components/navbar-subpage"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Blog - Plarix",
  description:
    "Writing on warranty claim recovery for HVAC and plumbing contractors. What gets missed, what it costs, and how to catch it.",
  alternates: {
    canonical: "https://plarix.dev/blog",
  },
  openGraph: {
    title: "Blog - Plarix",
    description:
      "Writing on warranty claim recovery for HVAC and plumbing contractors. What gets missed, what it costs, and how to catch it.",
    url: "https://plarix.dev/blog",
    siteName: "Plarix",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Plarix",
    description:
      "Writing on warranty claim recovery for HVAC and plumbing contractors. What gets missed, what it costs, and how to catch it.",
  },
}

export default function BlogPage() {
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

      <main className="bg-slate-950 min-h-screen">
        <section className="w-full bg-slate-950 pt-32 pb-24 border-b border-slate-800/30">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white">
                Blog
              </h1>
              <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl">
                Notes on warranty claims, manufacturer portals, and what HVAC and plumbing shops
                are missing. First posts coming as we work with real shops.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
