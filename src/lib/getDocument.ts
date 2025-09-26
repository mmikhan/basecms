import type { Config } from 'src/payload-types'
import config from '@payload-config'
import { CollectionSlug, getPayload, TypedLocale } from 'payload'
import { unstable_cache } from 'next/cache'
import { slugify } from 'transliteration'

type DocumentQueryParams = {
  collection: keyof Config['collections']
  slug: CollectionSlug
  locale?: TypedLocale
  depth?: number | undefined
  draft?: boolean | undefined
  limit?: number | undefined
  pagination?: boolean | undefined
  overrideAccess?: boolean | undefined
}

export const getCachedDocument = ({
  collection,
  slug,
  locale,
  depth,
  draft,
  limit,
  pagination,
  overrideAccess,
}: DocumentQueryParams) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })

      const page = await payload.find({
        collection,
        locale,
        depth,
        draft,
        limit,
        pagination,
        overrideAccess,
        where: {
          slug: {
            equals: slugify(decodeURIComponent(slug), { trim: true }),
          },
        },
      })

      return page.docs[0]
    },
    [collection, slug],
    {
      tags: [`${collection}_${slug}`],
    },
  )
