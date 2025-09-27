import { type CollectionSlug, getPayload, TypedLocale } from 'payload'
import { cache } from 'react'
import config from '@payload-config'
import { POSTS_PER_PAGE } from '@/lib/utils'
import { SearchForm } from '@/components/searchForm'
import { CollectionArchive } from '@/components/CollectionArchive'
import { CardPostData } from '@/components/Card'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Locale } from 'next-intl'
import { slugify } from 'transliteration'

type SearchPageProps = {
  searchParams: Promise<{
    q: string
  }>
  params: Promise<{
    locale: Locale
  }>
}

export default async function SearchPage({ searchParams, params }: SearchPageProps) {
  const { q: query } = await searchParams
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'SearchPage' })

  const { docs } = await querySearchByQuery({ query, locale: locale as TypedLocale })
  const type = docs?.[0]?.type as CollectionSlug

  return (
    <div className="container mx-auto py-24">
      <div className="mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">Search</h1>

          <div className="max-w-[50rem] mx-auto">
            <SearchForm />
          </div>
        </div>
      </div>

      {docs && docs.length > 0 && type ? (
        <CollectionArchive data={docs as CardPostData[]} collectionSlug={type} />
      ) : (
        <p>{t('noResults', { query })}</p>
      )}
    </div>
  )
}

const querySearchByQuery = cache(
  async ({ query, locale }: { query: string; locale: TypedLocale }) => {
    const payload = await getPayload({ config })

    if (!query) return { docs: [] }

    return await payload.find({
      collection: 'search',
      locale,
      depth: 1,
      limit: POSTS_PER_PAGE,
      pagination: false,
      ...(query
        ? {
            where: {
              or: [
                { title: { like: query } },
                { slug: { like: slugify(query, { trim: true }) } },
                { content: { like: query } },
              ],
            },
          }
        : {}),
    })
  },
)

export async function generateMetadata({
  searchParams,
  params,
}: SearchPageProps): Promise<Metadata> {
  const { q: query } = await searchParams
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'SearchPage' })

  return {
    title: query ? t('titleWithQuery', { query }) : t('title'),
    description: t('description'),
  }
}
