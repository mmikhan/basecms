import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import RichText from '@/components/RichText'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import { Redirects } from '@/components/Redirects'
import { ModeToggle } from '@/components/mode-toggle'

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

export default async function Page({ params }: { params: Promise<{ slug?: string }> }) {
  const { slug = 'home' } = await params
  const { isEnabled: draft } = await draftMode()

  const page = await queryPageBySlug({ slug })

  if (!page) {
    return <Redirects url={`/${slug}`} />
  }

  const { hero, layout } = page

  return (
    <div className="page">
      <h1 className="text-3xl font-bold underline">Page: {slug}</h1>
      <p>This is a dynamic page for the slug: {slug}</p>

      <Redirects disableNotFound url={`/${slug}`} />

      {draft && <RefreshRouteOnSave />}

      {hero?.richText && <RichText data={hero.richText} enableGutter={false} />}
      {layout && layout.length > 0 && <RenderBlocks blocks={layout} />}
      <ModeToggle />
    </div>
  )
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
