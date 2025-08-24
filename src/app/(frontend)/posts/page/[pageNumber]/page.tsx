import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { POSTS_PER_PAGE } from '@/lib/utils'
import { PostsArchive } from '@/components/PostsArchive'

type PostsPaginationPageProps = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function PostsPaginationPage({ params }: PostsPaginationPageProps) {
  const { pageNumber } = await params
  const page = parseInt(pageNumber, 10)

  if (isNaN(page)) notFound()

  return <PostsArchive page={page} />
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const { totalDocs } = await payload.count({
    collection: 'posts',
  })

  const totalPages = Math.ceil(totalDocs / POSTS_PER_PAGE)

  // We don't need to generate page 1 here, as it's handled by /posts/page.tsx
  if (totalPages <= 1) {
    return []
  }

  return Array.from({ length: totalPages }, (_, i) => ({
    pageNumber: (i + 1).toString(),
  }))
}

export async function generateMetadata({ params }: PostsPaginationPageProps): Promise<Metadata> {
  const { pageNumber } = await params
  const title = `Posts - Page ${pageNumber}`
  const description = 'An archive of all posts.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/posts/page/${pageNumber}`,
    },
  }
}
