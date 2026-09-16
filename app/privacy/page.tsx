import type { Metadata } from "next"
import { NavbarSubpage } from "@/components/navbar-subpage"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy - Plarix",
  description: "How Plarix collects, uses, and protects information submitted through plarix.dev.",
  alternates: {
    canonical: "https://plarix.dev/privacy",
  },
}

export default function PrivacyPage() {
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

      <NavbarSubpage />

      <main className="bg-slate-950 min-h-screen">
        {/* Header */}
        <section className="w-full bg-slate-950 pt-32 pb-12 border-b border-slate-800/30">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="flex flex-col gap-6 max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
                Privacy Policy
              </h1>
              <p className="text-slate-500 text-sm">
                Effective date: August 19, 2026
              </p>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="w-full bg-slate-950 py-16">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="max-w-3xl flex flex-col gap-10">

              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-medium text-white">Overview</h2>
                <p className="text-base text-slate-400 leading-relaxed">
                  Plarix ("we," "us," or "our") operates plarix.dev. This policy explains what
                  information we collect when you visit the site or submit a contact request,
                  how we use it, and how you can ask us to delete it.
                </p>
                <p className="text-base text-slate-400 leading-relaxed">
                  We collect the minimum necessary. We do not sell data. We do not run
                  third-party advertising.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-medium text-white">What We Collect</h2>
                <p className="text-base text-slate-400 leading-relaxed">
                  When you submit the process audit or contact form on plarix.dev, we collect:
                </p>
                <ul className="flex flex-col gap-2 mt-1">
                  {["First and last name", "Company name", "Business email address"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-slate-400">
                      <div className="w-1 h-1 bg-amber-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-base text-slate-400 leading-relaxed mt-1">
                  We do not collect payment information, passwords, or any sensitive personal
                  data through this site.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-medium text-white">How We Use It</h2>
                <p className="text-base text-slate-400 leading-relaxed">
                  Form submissions are used solely to respond to your inquiry and determine
                  whether Plarix's services are a fit for your situation. We will email you
                  once in response. We will not add you to a mailing list, share your details
                  with third parties, or contact you repeatedly without your consent.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-medium text-white">Analytics</h2>
                <p className="text-base text-slate-400 leading-relaxed">
                  This site uses{" "}
                  <a
                    href="https://vercel.com/docs/analytics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-500 hover:text-amber-400 transition-colors underline underline-offset-2"
                  >
                    Vercel Analytics
                  </a>
                  , which collects aggregated, anonymised traffic data (page views, referrers,
                  device type). No cookies are set. No personally identifiable information is
                  collected or stored by the analytics system.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-medium text-white">Data Retention</h2>
                <p className="text-base text-slate-400 leading-relaxed">
                  Contact form submissions are retained for as long as necessary to manage the
                  business relationship. If you would like your information deleted, email us
                  at{" "}
                  <a
                    href="mailto:hello@plarix.dev"
                    className="text-amber-500 hover:text-amber-400 transition-colors underline underline-offset-2"
                  >
                    hello@plarix.dev
                  </a>{" "}
                  and we will remove it within 30 days.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-medium text-white">Third-Party Services</h2>
                <p className="text-base text-slate-400 leading-relaxed">
                  The site is hosted on Vercel. Form submissions are processed via a Plarix-
                  controlled API endpoint. We do not use third-party CRMs, marketing platforms,
                  or data brokers.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-medium text-white">Your Rights</h2>
                <p className="text-base text-slate-400 leading-relaxed">
                  You have the right to access, correct, or delete any personal information we
                  hold about you. To exercise any of these rights, contact us at{" "}
                  <a
                    href="mailto:hello@plarix.dev"
                    className="text-amber-500 hover:text-amber-400 transition-colors underline underline-offset-2"
                  >
                    hello@plarix.dev
                  </a>
                  .
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-medium text-white">Changes to This Policy</h2>
                <p className="text-base text-slate-400 leading-relaxed">
                  If this policy changes materially, we will update the effective date at the
                  top of this page. Continued use of plarix.dev after a change constitutes
                  acceptance of the updated policy.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-medium text-white">Contact</h2>
                <p className="text-base text-slate-400 leading-relaxed">
                  Plarix<br />
                  <a
                    href="mailto:hello@plarix.dev"
                    className="text-amber-500 hover:text-amber-400 transition-colors underline underline-offset-2"
                  >
                    hello@plarix.dev
                  </a>
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
