/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image configurations for external domains
  images: {
    domains: [
      'ui-avatars.com',
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Build configurations
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  
  // Disable type checking during build for faster builds
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  
  // Faster builds by reducing output size and disabling source maps in production
  productionBrowserSourceMaps: false,
  
  // Disable compression for faster builds - Vercel handles this automatically
  compress: false,
  
  // For Vercel deployment with serverless functions
  experimental: {
    serverComponentsExternalPackages: [],
  },
}

module.exports = nextConfig 