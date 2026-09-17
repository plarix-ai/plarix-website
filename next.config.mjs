/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      /*
       * One canonical host. Both www.plarix.dev and plarix.dev resolve, and www
       * sends every path to the apex permanently, so the two never compete for
       * the same page in an index.
       *
       * Apex is the canonical because every signal the site already publishes
       * names it: the canonical tag on all nineteen routes, the sitemap, the
       * RSS feed, llms.txt and the Organization markup. Choosing www instead
       * would mean rewriting all of them to point away from the host being
       * redirected to.
       *
       * The path is preserved rather than collapsing to the home page. A
       * redirect that drops the path throws away whatever the link was for and
       * is treated as a soft 404.
       */
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.plarix.dev' }],
        destination: 'https://plarix.dev/:path*',
        permanent: true,
      },
      /*
       * The only URLs the old positioning ever put in a sitemap were /blog and
       * two posts under it, both about the previous vision. The section is gone
       * and the writing now lives at /journal, so every one of those addresses
       * is sent there permanently. This replaces a redirect that pointed one
       * dead old-vision URL at another dead old-vision URL, which resolved to a
       * 404.
       */
      { source: '/blog', destination: '/journal', permanent: true },
      { source: '/blog/:path*', destination: '/journal', permanent: true },
    ]
  },
}

export default nextConfig
