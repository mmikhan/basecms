import { unstable_cache } from 'next/cache'
import { getPayload, GlobalSlug, TypedLocale } from 'payload'
import config from '@payload-config'

type GlobalIdentifier = {
  slug: GlobalSlug
  depth?: number | undefined
  locale?: TypedLocale
}

export const getCachedGlobal = ({ slug, depth, locale }: GlobalIdentifier) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })

      return await payload.findGlobal({
        slug,
        depth,
        locale,
      })
    },
    [slug],
    {
      tags: [`global_${slug}`],
    },
  )
