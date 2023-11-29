/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/nextjs-github-pages',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.shareicon.net'
      }
    ]
  }
}

module.exports = nextConfig
