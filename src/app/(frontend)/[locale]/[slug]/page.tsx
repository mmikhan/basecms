import { draftMode } from 'next/headers'
import { getPayload, type TypedLocale } from 'payload'
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

// const localizedDefaultHome = { en: 'home', bn: 'হোম', nl: 'huis' }

export default async function Page({ params }: PageProps) {
  // const { locale, slug = localizedDefaultHome[locale as TypedLocale] } = await params
  const { locale, slug = 'home' } = await params

  if (!slug) return redirect({ href: '/', locale })

  const page = await queryPageBySlug({ slug, locale: locale as TypedLocale })

  if (!page) return <Redirects url={`/${slug}`} />

  const { layout } = page

  const { isEnabled: draft } = await draftMode()

  return (
    <>
      <Redirects disableNotFound url={`/${slug}`} />

      {draft && <RefreshRouteOnSave />}

      {layout && layout.length > 0 && <RenderBlocks blocks={layout} />}
    </>
  )
}

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
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
        // equals: decodeURIComponent(slug),
        equals: slugify(decodeURIComponent(slug), { trim: true }),
      },
    },
  })

  return result.docs?.[0] || null
})

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // const { locale, slug = localizedDefaultHome[locale as TypedLocale] } = await params
  const { locale, slug = 'home' } = await params

  const page = await queryPageBySlug({ slug, locale: locale as TypedLocale })

  return generateMeta({ doc: page })
}
