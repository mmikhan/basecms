import { unstable_cache } from 'next/cache'
import { getPayload, GlobalSlug } from 'payload'
import config from '@payload-config'

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = (slug: GlobalSlug, depth = 0) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })

      return await payload.findGlobal({
        slug,
        depth,
      })
    },
    [slug],
    {
      tags: [`global_${slug}`],
    },
  )
