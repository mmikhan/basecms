import { draftMode } from 'next/headers'
import {
  type CollectionSlug,
  getPayload,
  type RequiredDataFromCollectionSlug,
  type TypedLocale,
} from 'payload'
import config from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import { Redirects } from '@/components/Redirects'
import { type Metadata } from 'next'
import { generateMeta } from '@/lib/generateMeta'
import type { Page } from '@/payload-types'
import { redirect } from '@/i18n/navigation'
import { Locale } from 'next-intl'
import { homeStatic } from '@/app/next/seed/pages/homeStatic'
import { setRequestLocale } from 'next-intl/server'
import { getCachedDocument } from '@/lib/getDocument'

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return pages.docs
    ?.filter(({ slug }) => slug !== 'home')
    .map(({ slug }) => ({
      slug,
    }))
}

type PageProps = {
  params: Promise<{ slug?: string; locale: Locale }>
}

export default async function Page({ params }: PageProps) {
  const { locale, slug = 'home' } = await params

  // Enable static rendering
  setRequestLocale(locale)

  if (!slug) return redirect({ href: '/', locale })

  let page: RequiredDataFromCollectionSlug<'pages'> | null

  const { isEnabled: draft } = await draftMode()

  page = (await getCachedDocument({
    collection: 'pages',
    slug: slug as CollectionSlug,
    locale: locale as TypedLocale,
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: false,
  })()) as Page

  if (!page && slug === 'home') page = homeStatic

  if (!page) return <Redirects url={`/${slug}`} locale={locale} />

  const { layout } = page

  return (
    <>
      <Redirects disableNotFound url={`/${slug}`} locale={locale} />

      {draft && <RefreshRouteOnSave />}

      {layout && layout.length > 0 && <RenderBlocks blocks={layout} />}
    </>
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug = 'home' } = await params

  const page = (await getCachedDocument({
    collection: 'pages',
    slug: slug as CollectionSlug,
    locale: locale as TypedLocale,
    limit: 1,
    pagination: false,
    overrideAccess: false,
  })()) as Page

  return generateMeta({ doc: page })
}
