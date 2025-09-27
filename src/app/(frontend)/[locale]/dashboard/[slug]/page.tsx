import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { type CollectionSlug, getPayload, type TypedLocale } from 'payload'
import config from '@payload-config'
import type { Locale } from 'next-intl'
import { cache } from 'react'
import { slugify } from 'transliteration'

type DashboardSlugPageProps = {
  params: Promise<{ slug?: string; locale: Locale }>
}

export default async function DashboardSlugPage({ params }: DashboardSlugPageProps) {
  const { slug = 'dashboard', locale } = await params

  const { isEnabled: draft } = await draftMode()

  const page = await queryPageBySlug({
    slug: slug as CollectionSlug,
    locale: locale as TypedLocale,
  })

  if (!page) return notFound()

  const { layout } = page

  return (
    <>
      {draft === true && <RefreshRouteOnSave />}
      {layout && layout.length > 0 && <RenderBlocks blocks={layout} />}
    </>
  )
}

const queryPageBySlug = cache(
  async ({ slug, locale }: { slug: CollectionSlug; locale: TypedLocale }) => {
    const payload = await getPayload({ config })
    const { isEnabled: draft } = await draftMode()

    const result = await payload.find({
      collection: 'dashboard',
      locale,
      draft,
      limit: 1,
      pagination: true,
      where: {
        slug: {
          equals: slugify(decodeURIComponent(slug), { trim: true }),
        },
      },
    })

    return result.docs?.[0] || null
  },
)

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'dashboard',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return pages.docs?.filter(({ slug }) => slug !== 'dashboard').map(({ slug }) => ({ slug })) || []
}
