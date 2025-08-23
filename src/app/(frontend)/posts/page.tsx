import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PageRange } from '@/components/PageRange'
import { PaginationComponent } from '@/components/Pagination'
import { CollectionArchive } from '@/components/CollectionArchive'

export const dynamic = 'force-static'

export default async function PostsArchivePage() {
  const { posts, slug, labels } = await getCachedPosts()

  return (
    <div className="pt-24 pb-24 container mx-auto">
      <div className="mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="mb-8">
        <PageRange {...posts} {...labels} limit={12} />
      </div>

      <CollectionArchive {...posts} collectionSlug={slug} />

      <PaginationComponent {...posts} />
    </div>
  )
}

const getCachedPosts = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })

    const posts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: 12,
      overrideAccess: false,
    })

    const config = payload.collections.posts.config
    const slug = config.slug
    const labels = config.labels

    return { posts, slug, labels }
  },
  ['posts'],
  { tags: ['posts'] },
)
