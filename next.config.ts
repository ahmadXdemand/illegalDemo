import type { NextConfig } from 'next'

const config: NextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
      ignored: ['**/node_modules', '**/.next', '**/data'],
    }
    return config
  },
  reactStrictMode: true,
  swcMinify: true,
}

export default config 