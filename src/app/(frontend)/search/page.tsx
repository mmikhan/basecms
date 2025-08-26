import { getPayload } from 'payload'
import { cache } from 'react'
import config from '@payload-config'
import { POSTS_PER_PAGE } from '@/lib/utils'
import { SearchForm } from '@/components/searchForm'
import { CollectionArchive } from '@/components/CollectionArchive'
import { CardPostData } from '@/components/Card'
import { Metadata } from 'next'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>
}) {
  const { q: query } = await searchParams
  const { docs } = await querySearchByQuery({ query })
  const type = docs?.[0]?.type

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
        <p>No results found.</p>
      )}
    </div>
  )
}

const querySearchByQuery = cache(async ({ query }: { query: string }) => {
  const payload = await getPayload({ config })

  if (!query) return { docs: [] }

  return await payload.find({
    collection: 'search',
    depth: 1,
    limit: POSTS_PER_PAGE,
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              { title: { like: query } },
              { slug: { like: query } },
              { content: { like: query } },
            ],
          },
        }
      : {}),
  })
})

export function generateMetadata(): Metadata {
  return {
    title: 'Search',
    description: 'Search the site',
  }
}
