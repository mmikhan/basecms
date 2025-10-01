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
import { cache } from 'react'
import { redirect } from '@/i18n/navigation'
import { Locale } from 'next-intl'
import { slugify } from 'transliteration'
import { homeStatic } from '@/app/next/seed/pages/homeStatic'

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

  if (!slug) return redirect({ href: '/', locale })

  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: slug as CollectionSlug,
    locale: locale as TypedLocale,
  })

  if (!page && slug === 'home') page = homeStatic

  if (!page) return <Redirects url={`/${slug}`} locale={locale} />

  const { layout } = page

  const { isEnabled: draft } = await draftMode()

  return (
    <>
      <Redirects disableNotFound url={`/${slug}`} locale={locale} />

      {draft && <RefreshRouteOnSave />}

      {layout && layout.length > 0 && <RenderBlocks blocks={layout} />}
    </>
  )
}

const queryPageBySlug = cache(
  async ({ slug, locale }: { slug: CollectionSlug; locale: TypedLocale }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'pages',
      locale,
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      where: {
        slug: {
          equals: slugify(decodeURIComponent(slug), { trim: true }),
        },
      },
    })

    return result.docs?.[0] || null
  },
)

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug = 'home' } = await params

  const page = await queryPageBySlug({
    slug: slug as CollectionSlug,
    locale: locale as TypedLocale,
  })

  return generateMeta({ doc: page })
}
