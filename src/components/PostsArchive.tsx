import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PageRange } from './PageRange'
import { CollectionArchive } from './CollectionArchive'
import { PaginationComponent } from './Pagination'
import { POSTS_PER_PAGE } from '@/lib/utils'
import { notFound } from 'next/navigation'

export const PostsArchive: React.FC<{ page: number }> = async ({ page }) => {
  const { posts, slug, labels } = await getCachedPosts({ page })

  if (page > posts.totalPages && posts.totalDocs > 0) notFound()

  return (
    <div className="py-24 container mx-auto">
      <div className="mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="mb-8">
        <PageRange {...posts} {...labels} limit={POSTS_PER_PAGE} />
      </div>

      <CollectionArchive {...posts} collectionSlug={slug} />

      <PaginationComponent {...posts} />
    </div>
  )
}

const getCachedPosts = unstable_cache(
  async ({ page }: { page: number }) => {
    const payload = await getPayload({ config: configPromise })

    const posts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: POSTS_PER_PAGE,
      page,
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
