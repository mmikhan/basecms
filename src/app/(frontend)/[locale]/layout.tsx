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
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Locale, NextIntlClientProvider } from 'next-intl'
import { getCachedGlobal } from '@/lib/getGlobals'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{
    locale: Locale
  }>
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params

  if (!routing.locales.includes(locale)) {
    notFound()
  }

  /*
   * Enable static rendering
   *
   * Set the locale to all layout and pages to statically render reliably.
   * This must be called before any usage of `next-intl` hooks or components.
   * i.e. `useTranslations` or `getMessages`.
   *
   * @see https://github.com/amannn/next-intl/issues/663#issuecomment-1882675561
   * @docs https://next-intl.dev/docs/routing/setup#add-setrequestlocale-to-all-relevant-layouts-and-pages
   */
  setRequestLocale(locale)

  const messages = await getMessages({ locale })

  const { isEnabled } = await draftMode()

  const { layout: headerLayout } = (await getCachedGlobal({
    slug: 'header',
    depth: 1,
  })()) as Header
  const { layout: footerLayout } = (await getCachedGlobal({
    slug: 'footer',
    depth: 1,
  })()) as Footer

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AdminBar adminBarProps={{ preview: isEnabled }} />
            <RenderBlocks blocks={headerLayout} />
            {children}
            <RenderBlocks blocks={footerLayout} />
          </NextIntlClientProvider>
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
