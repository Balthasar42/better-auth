import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    authInterrupts: true,
  },
  productionBrowserSourceMaps: process.env.SOURCE_MAPS === "true",
  typedRoutes: true,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
    reactRemoveProperties: true,
  },
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
