import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getServerSideURL } from '@/lib/getURL'
import { routing } from '@/i18n/routing'

const getPagesSitemap = unstable_cache(
  async () => {
    const SITE_URL = getServerSideURL()
    const payload = await getPayload({ config })

    const results = await payload.find({
      collection: 'pages',
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

    return routing.locales.flatMap((locale) => {
      const staticPages = [
        {
          loc: `${SITE_URL}/${locale}/search`,
          lastmod: dateFallback,
        },
        {
          loc: `${SITE_URL}/${locale}/posts`,
          lastmod: dateFallback,
        },
      ]

      const dynamicPages =
        results.docs?.flatMap((page) => {
          if (!page?.slug) return []

          const path = page.slug === 'home' ? '' : `/${page.slug}`

          return {
            loc: `${SITE_URL}/${locale}${path}`,
            lastmod: page.updatedAt || dateFallback,
          }
        }) || []

      return [...staticPages, ...dynamicPages]
    })
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
