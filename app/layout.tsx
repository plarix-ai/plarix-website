import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Plarix — Warranty Claims, Filed. Money, Recovered.',
  description: 'Plarix finds and files the warranty claims your HVAC or plumbing shop is currently missing, and shows you the dollar amount before you commit to anything.',
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
    title: 'Plarix — Warranty Claims, Filed. Money, Recovered.',
    description: 'Plarix finds and files the warranty claims your HVAC or plumbing shop is currently missing, and shows you the dollar amount before you commit to anything.',
    url: 'https://plarix.dev',
    siteName: 'Plarix',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plarix — Warranty Claims, Filed. Money, Recovered.',
    description: 'Plarix finds and files the warranty claims your HVAC or plumbing shop is currently missing, and shows you the dollar amount before you commit to anything.',
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Plarix',
  description: 'Plarix finds and files the warranty claims your HVAC or plumbing shop is currently missing — and shows you the dollar amount before you commit.',
  url: 'https://plarix.dev',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@plarix.dev',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@300..800&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}