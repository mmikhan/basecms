import { getPayload, type TypedLocale } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { POSTS_PER_PAGE } from '@/lib/utils'
import { PostsArchive } from '@/components/PostsArchive'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

type PostsPaginationPageProps = {
  params: Promise<{
    pageNumber: string
    locale: Locale
  }>
}

export default async function PostsPaginationPage({ params }: PostsPaginationPageProps) {
  const { pageNumber, locale } = await params
  const page = parseInt(pageNumber, 10)

  if (isNaN(page)) notFound()

  return <PostsArchive page={page} locale={locale as TypedLocale} />
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

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
  const { pageNumber, locale } = await params
  const t = await getTranslations({ locale, namespace: 'PaginatedPostsArchivePage' })

  const title = t('title', { pageNumber })
  const description = t('description')

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${locale}/posts/page/${pageNumber}`,
    },
  }
}
