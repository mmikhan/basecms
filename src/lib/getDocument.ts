import type { Config } from 'src/payload-types'
import config from '@payload-config'
import { CollectionSlug, getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedDocument = (
  collection: keyof Config['collections'],
  slug: CollectionSlug,
  depth = 0,
) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })

      const page = await payload.find({
        collection,
        depth,
        where: {
          slug: {
            equals: slug,
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
