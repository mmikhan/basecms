import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import RichText from '@/components/RichText'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug = 'home' } = await params

  const page = await queryPageBySlug({ slug })

  if (!page) {
    return notFound()
  }

  const { hero, content } = page

  return (
    <div className="page">
      <h1 className="text-3xl font-bold underline">Page: {slug}</h1>
      <p>This is a dynamic page for the slug: {slug}</p>
      {hero?.richText && <RichText data={hero.richText} enableGutter={false} />}
      {content && content.length > 0 && <RenderBlocks blocks={content} />}
      <CallToActionBlock {...content[0]} />
    </div>
  )
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config })

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

  return result.docs[0] || null
})

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
    .filter(({ slug }) => slug !== 'home')
    .map(({ slug }) => ({
      slug,
    }))
}
