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
import { Card } from '@/components/Card'

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

  const { post, collectionSlug } = await queryPostBySlug({ slug })

  if (!post) return <Redirects url={`/posts/${slug}`} />

  return (
    <article className="py-16">
      <Redirects disableNotFound url={`/posts/${slug}`} />

      {draft && <RefreshRouteOnSave />}

      <PostHero {...post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />

          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="mt-12 max-w-[52rem] lg:container lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
                {post.relatedPosts
                  .filter((post) => typeof post === 'object')
                  ?.map((doc, index) => {
                    if (typeof doc === 'string') return null

                    return (
                      <Card key={index} {...doc} collectionSlug={collectionSlug} showCategories />
                    )
                  })}
              </div>
            </div>
          )}
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

  const config = payload.collections.posts.config

  return { post: post.docs?.[0] || null, collectionSlug: config.slug }
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const { post } = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}
