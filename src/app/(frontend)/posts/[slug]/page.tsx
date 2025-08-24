import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'
import configPromise from '@payload-config'
import { Redirects } from '@/components/Redirects'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import RichText from '@/components/RichText'
import { PostHero } from '@/components/PostHero'
import { Metadata } from 'next'
import { generateMeta } from '@/lib/generateMeta'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return posts.docs.map(({ slug }) => ({
    slug,
  }))
}

type Props = {
  params: Promise<{ slug?: string }>
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()

  const post = await queryPostBySlug({ slug })

  if (!post) return <Redirects url={`/posts/${slug}`} />

  return (
    <article className="py-16">
      <Redirects disableNotFound url={`/posts/${slug}`} />

      {draft && <RefreshRouteOnSave />}

      <PostHero {...post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />
        </div>
      </div>
    </article>
  )
}

const queryPostBySlug = cache(async ({ slug }: { slug: string | undefined }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const post = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return post.docs?.[0] || null
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}
