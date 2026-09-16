import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { SiteNav } from "@/components/site/site-nav";
import { Footer } from "@/components/site/footer";
import { SITE_URL, answerBlock } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const DESCRIPTION =
  "Plarix builds operational AI for home services companies. We run the back office processes every job leaves behind, inside the systems you already use. No migration, no new screen, no contract.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Plarix | Everything after the call",
    template: "%s | Plarix",
  },
  description: DESCRIPTION,
  applicationName: "Plarix",
  authors: [{ name: "Plarix", url: SITE_URL }],
  creator: "Plarix",
  publisher: "Plarix",
  keywords: [
    "operational AI",
    "agentic process automation",
    "home services automation",
    "HVAC back office automation",
    "plumbing operations AI",
    "contractor back office",
    "warranty claim automation",
    "field service operations AI",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Plarix",
  legalName: "Plarix",
  description: DESCRIPTION,
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/plarix-lockup.png`, width: 1352, height: 333 },
  image: `${SITE_URL}/brand/og.png`,
  email: "hello@plarix.dev",
  areaServed: { "@type": "Country", name: "United States" },
  knowsAbout: [
    "Manufacturer warranty claim recovery",
    "Rebate and dealer tier credit recovery",
    "Invoice and job reconciliation",
    "Purchasing and vendor credit reconciliation",
    "Permit filing and trade compliance",
    "Technician commission and spiff reconciliation",
    "Service agreement retention",
  ],
  sameAs: ["https://www.linkedin.com/company/plarix", "https://x.com/theplarix"],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Plarix",
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
};

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Operational AI for home services",
  serviceType: "Agentic process automation for home services back office operations",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: { "@type": "Country", name: "United States" },
  description: answerBlock.answer,
  audience: {
    "@type": "Audience",
    audienceType: "HVAC, plumbing, electrical and home services contractors",
  },
  offers: {
    "@type": "Offer",
    name: "The count",
    price: "0",
    priceCurrency: "USD",
    description:
      "A free written count of what is sitting unclaimed, unreconciled or unfiled in a contractor's own data.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {[organizationLd, websiteLd, serviceLd].map((ld, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
          />
        ))}
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:text-[15px] focus:font-medium focus:text-black"
        >
          Skip to content
        </a>
        <SiteNav />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
