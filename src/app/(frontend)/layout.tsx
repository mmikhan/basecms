import React from 'react'
import './styles.css'
import { ThemeProvider } from '@/components/theme-provider'
import { type Metadata } from 'next'
import { getServerSideURL } from '@/lib/getURL'
import { mergeOpenGraph } from '@/lib/mergeOpenGraph'
import { AdminBar } from '@/components/AdminBar'
import { draftMode } from 'next/headers'
import type { Footer, Header } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { getCachedGlobal } from '@/lib/getGlobals'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const { layout: headerLayout } = (await getCachedGlobal({ slug: 'header', depth: 1 })()) as Header
  const { layout: footerLayout } = (await getCachedGlobal({ slug: 'footer', depth: 1 })()) as Footer

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
          <RenderBlocks blocks={headerLayout} />
          {children}
          <RenderBlocks blocks={footerLayout} />
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@mmikhan',
  },
}
