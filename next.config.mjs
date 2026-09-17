/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  /*
   * The only URLs the old positioning ever put in a sitemap were /blog and two
   * posts under it, both about the previous vision. The section is gone and the
   * writing now lives at /journal, so every one of those addresses is sent there
   * permanently. This replaces a redirect that pointed one dead old-vision URL
   * at another dead old-vision URL, which resolved to a 404.
   */
  async redirects() {
    return [
      { source: '/blog', destination: '/journal', permanent: true },
      { source: '/blog/:path*', destination: '/journal', permanent: true },
    ]
  },
}

export default nextConfig
