import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { PageRange } from '@/components/PageRange'
import { unstable_cache } from 'next/cache'
import { CollectionArchive } from '@/components/CollectionArchive'
import { PaginationComponent } from '@/components/Pagination'
import { Metadata } from 'next'
import { POSTS_PER_PAGE } from '@/lib/utils'

type PostsPaginationPageProps = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function PostsPaginationPage({ params }: PostsPaginationPageProps) {
  const { pageNumber } = await params

  if (!Number(pageNumber)) notFound()

  const { posts, slug, labels } = await queryByPageNumber(Number(pageNumber))

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

const queryByPageNumber = unstable_cache(
  async (pageNumber: number) => {
    const payload = await getPayload({ config: configPromise })

    const posts = await payload.find({
      collection: 'posts',
      page: Number(pageNumber),
      limit: POSTS_PER_PAGE,
      depth: 1,
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

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / POSTS_PER_PAGE)

  return Array.from({ length: totalPages }, (_, i) => ({
    pageNumber: (i + 1).toString(),
  }))
}

export async function generateMetadata({ params }: PostsPaginationPageProps): Promise<Metadata> {
  const { pageNumber } = await params

  return {
    title: `Posts - Page ${pageNumber}`,
    description: `A list of posts on page ${pageNumber}.`,
  }
}
