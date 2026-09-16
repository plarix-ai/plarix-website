import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { MotionConfig } from 'framer-motion'
import './globals.css'

export const metadata: Metadata = {
  title: 'Plarix - Warranty Claim Recovery for HVAC & Plumbing Contractors',
  description: 'Plarix finds and files the manufacturer warranty claims, parts credits, and rebates HVAC and plumbing contractors have already earned but never collected. Free diagnostic. No contract.',
  keywords: [
    'warranty claims automation',
    'HVAC warranty claims',
    'plumbing warranty claims',
    'field service warranty',
    'ServiceTitan warranty',
    'manufacturer warranty filing',
    'warranty recovery',
    'home services AI',
    'warranty claim tracking',
  ],
  metadataBase: new URL('https://plarix.dev'),
  alternates: {
    canonical: 'https://plarix.dev',
  },
  openGraph: {
    title: 'Plarix - Warranty Claim Recovery for HVAC & Plumbing Contractors',
    description: 'Plarix finds and files the manufacturer warranty claims, parts credits, and rebates HVAC and plumbing contractors have already earned but never collected. Free diagnostic. No contract.',
    url: 'https://plarix.dev',
    siteName: 'Plarix',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plarix - Warranty Claim Recovery for HVAC & Plumbing Contractors',
    description: 'Plarix finds and files the manufacturer warranty claims, parts credits, and rebates HVAC and plumbing contractors have already earned but never collected. Free diagnostic. No contract.',
    site: '@theplarix',
    creator: '@theplarix',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/apple-icon.png',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Plarix',
  description: 'Plarix finds and files the manufacturer warranty claims, parts credits, labor reimbursements, and rebates that HVAC and plumbing contractors have already earned but never collected.',
  url: 'https://plarix.dev',
  logo: 'https://plarix.dev/images/plarix-new-logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@plarix.dev',
  },
  sameAs: [
    'https://www.linkedin.com/company/plarix',
    'https://x.com/theplarix',
  ],
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Warranty claim recovery automation',
  provider: { '@type': 'Organization', name: 'Plarix' },
  areaServed: 'US',
  audience: {
    '@type': 'Audience',
    audienceType: 'HVAC and plumbing contractors',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
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
      <body className="font-sans antialiased">
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
        <Analytics />
      </body>
    </html>
  )
}