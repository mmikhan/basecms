import { getServerSideURL } from '@/lib/getURL'
import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  typedRoutes: true,
  turbopack: {
    resolveExtensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.mts',
      '.cts',
      '.mjs',
      '.cjs',
      '.json',
      '.mdx',
    ],
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    qualities: [25, 50, 75, 100],
    remotePatterns: [
      ...[getServerSideURL(), 'https://res.cloudinary.com'].map((item) => {
        const url = new URL(item)

        return {
          protocol: url.protocol.replace(':', ''),
          hostname: url.hostname,
          port: url.port,
          pathname: '/**',
        } as URL
      }),
    ],
  },
}

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './src/i18n/messages/en.json',
  },
})
export default withNextIntl(withPayload(nextConfig, { devBundleServerPackages: false }))
