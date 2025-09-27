import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getServerSideURL } from '@/lib/getURL'
import { generateAlternateRefs } from '@/lib/sitemap'
import { routing } from '@/i18n/routing'

const getPostsSitemap = unstable_cache(
  async () => {
    const SITE_URL = getServerSideURL()
    const payload = await getPayload({ config })

    const results = await payload.find({
      collection: 'posts',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    return (
      results.docs
        ?.map((post) => {
          if (!post?.slug) return null

          const path = `/posts/${post.slug}`

          return {
            loc: `${SITE_URL}/${routing.defaultLocale}${path}`,
            lastmod: post.updatedAt || dateFallback,
            alternateRefs: generateAlternateRefs(path, routing.defaultLocale),
          }
        })
        .filter((item) => item !== null) || []
    )
  },
  ['posts-sitemap'],
  {
    tags: ['posts-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPostsSitemap()

  return getServerSideSitemap(sitemap)
}
