import { draftMode } from 'next/headers'
import { CollectionSlug, getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import { Redirects } from '@/components/Redirects'
import { type Metadata } from 'next'
import { generateMeta } from '@/lib/generateMeta'
import { getCachedDocument } from '@/lib/getDocument'
import type { Page } from '@/payload-types'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
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
  params: Promise<{ slug?: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug = 'home' } = await params
  const { isEnabled: draft } = await draftMode()

  const page = (await getCachedDocument({
    collection: 'pages',
    slug: slug as CollectionSlug,
    draft,
    limit: 1,
    pagination: true,
  })()) as Page

  if (!page) {
    return <Redirects url={`/${slug}`} />
  }

  const { layout } = page

  return (
    <>
      <Redirects disableNotFound url={`/${slug}`} />

      {draft && <RefreshRouteOnSave />}

      {layout && layout.length > 0 && <RenderBlocks blocks={layout} />}
    </>
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = 'home' } = await params

  const page = (await getCachedDocument({
    collection: 'pages',
    slug: slug as CollectionSlug,
  })()) as Page

  return generateMeta({ doc: page })
}
