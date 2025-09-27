import React, { cache } from 'react'
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
import { getPayload, type GlobalSlug, type TypedLocale } from 'payload'
import config from '@payload-config'

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

  setRequestLocale(locale)
  const messages = await getMessages({ locale })

  const { isEnabled } = await draftMode()
  const { layout: headerLayout } = (await queryGlobal({
    locale: locale as TypedLocale,
    slug: 'header',
    depth: 1,
  })) as Header
  const { layout: footerLayout } = (await queryGlobal({
    locale: locale as TypedLocale,
    slug: 'footer',
    depth: 1,
  })) as Footer

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-[100vh] flex flex-col">
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

const queryGlobal = cache(
  async ({ locale, slug, depth }: { locale: TypedLocale; slug: GlobalSlug; depth: number }) => {
    const payload = await getPayload({ config })

    return await payload.findGlobal({
      locale,
      slug,
      depth,
    })
  },
)

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@mmikhan',
  },
}
