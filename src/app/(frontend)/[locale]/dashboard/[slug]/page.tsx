import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import { getCachedDocument } from '@/lib/getDocument'
import type { Dashboard } from '@/payload-types'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { CollectionSlug, getPayload } from 'payload'
import config from '@payload-config'

type DashboardSlugPageProps = {
  params: Promise<{ slug?: string }>
}

export default async function DashboardSlugPage({ params }: DashboardSlugPageProps) {
  const { slug = 'dashboard' } = await params

  const { isEnabled: draft } = await draftMode()

  const page = (await getCachedDocument({
    collection: 'dashboard',
    slug: slug as CollectionSlug,
    draft,
    limit: 1,
    pagination: true,
  })()) as Dashboard

  if (!page) return notFound()

  const { layout } = page

  return (
    <>
      {draft === true && <RefreshRouteOnSave />}
      {layout && layout.length > 0 && <RenderBlocks blocks={layout} />}
    </>
  )
}

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
