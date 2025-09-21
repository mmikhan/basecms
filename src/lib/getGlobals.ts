import { unstable_cache } from 'next/cache'
import { getPayload, GlobalSlug } from 'payload'
import config from '@payload-config'

type GlobalIdentifier = {
  slug: GlobalSlug
  depth?: number | undefined
}

export const getCachedGlobal = ({ slug, depth }: GlobalIdentifier) =>
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
