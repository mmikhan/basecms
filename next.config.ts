import { getServerSideURL } from '@/lib/getURL'
import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

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
      ...[getServerSideURL()].map((item) => {
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

export default withPayload(nextConfig, { devBundleServerPackages: false })
