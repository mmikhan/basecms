import { getPayload, type TypedLocale } from 'payload'
import config from '@payload-config'
import { PageRange } from './PageRange'
import { CollectionArchive } from './CollectionArchive'
import { PaginationComponent } from './Pagination'
import { POSTS_PER_PAGE } from '@/lib/utils'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { unstable_cache } from 'next/cache'

export const PostsArchive: React.FC<{ page: number; locale: TypedLocale }> = async ({
  page,
  locale,
}) => {
  // Enable static rendering
  setRequestLocale(locale)

  const posts = await queryPosts({ page, locale })

  if (page > posts.totalPages && posts.totalDocs > 0) notFound()

  return (
    <div className="py-24 container mx-auto">
      <div className="mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="mb-8">
        <PageRange {...posts} limit={POSTS_PER_PAGE} locale={locale} />
      </div>

      <CollectionArchive data={posts.docs} collectionSlug={'posts'} />

      {posts.totalDocs > 0 && <PaginationComponent {...posts} locale={locale} />}
    </div>
  )
}

const queryPosts = unstable_cache(
  async ({ page, locale }: { page: number; locale: TypedLocale }) => {
    const payload = await getPayload({ config })

    return await payload.find({
      collection: 'posts',
      locale,
      depth: 1,
      limit: POSTS_PER_PAGE,
      page,
      overrideAccess: false,
    })
  },
  ['posts_archive'],
  {
    tags: ['posts'],
  },
)
