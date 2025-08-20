import React from 'react'
import './styles.css'
import { ThemeProvider } from '@/components/theme-provider'
import { type Metadata } from 'next'
import { getServerSideURL } from '@/lib/getURL'
import { mergeOpenGraph } from '@/lib/mergeOpenGraph'
import { AdminBar } from '@/components/AdminBar'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { Config, Header } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const { layout } = (await getCachedGlobal('header', 1)()) as Header

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-[100vh] flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AdminBar adminBarProps={{ preview: isEnabled }} />
          <RenderBlocks blocks={layout} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

const getCachedGlobal = (slug: keyof Config['globals'], depth = 0) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config: configPromise })

      return await payload.findGlobal({ slug, depth })
    },
    [slug],
    { tags: [`global_${slug}`] },
  )

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@mmikhan',
  },
}
