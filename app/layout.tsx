import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const DESCRIPTION =
  "Plarix builds operational AI for home services companies. We take over the back office work every job leaves behind, inside the systems you already run. No migration, no new screen, no contract.";

export const metadata: Metadata = {
  metadataBase: new URL("https://plarix.dev"),
  title: {
    default: "Plarix | Everything after the call",
    template: "%s | Plarix",
  },
  description: DESCRIPTION,
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
  alternates: { canonical: "https://plarix.dev" },
  openGraph: {
    title: "Plarix | Everything after the call",
    description: DESCRIPTION,
    url: "https://plarix.dev",
    siteName: "Plarix",
    type: "website",
    locale: "en_US",
    images: [{ url: "/brand/plarix-lockup.png", width: 1372, height: 353, alt: "Plarix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plarix | Everything after the call",
    description: DESCRIPTION,
    site: "@theplarix",
    creator: "@theplarix",
    images: ["/brand/plarix-lockup.png"],
  },
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Plarix",
  description:
    "Plarix builds operational AI for home services companies, running the back office processes every job leaves behind.",
  url: "https://plarix.dev",
  logo: "https://plarix.dev/brand/plarix-lockup.png",
  contactPoint: { "@type": "ContactPoint", email: "hello@plarix.dev", contactType: "sales" },
  sameAs: ["https://www.linkedin.com/company/plarix", "https://x.com/theplarix"],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Operational AI and process automation for home services",
  provider: { "@type": "Organization", name: "Plarix" },
  areaServed: "US",
  audience: {
    "@type": "Audience",
    audienceType: "HVAC, plumbing and home services contractors",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">{children}<Analytics /></body>
    </html>
  );
}
