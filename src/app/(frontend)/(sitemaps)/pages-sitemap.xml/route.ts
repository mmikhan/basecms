import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getServerSideURL } from '@/lib/getURL'
import { routing } from '@/i18n/routing'
import { generateAlternateRefs } from '@/lib/sitemap'

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

    return [
      // Static pages for all locales
      {
        loc: `${SITE_URL}/${routing.defaultLocale}/search`,
        lastmod: dateFallback,
        alternateRefs: generateAlternateRefs('/search', routing.defaultLocale),
      },
      {
        loc: `${SITE_URL}/${routing.defaultLocale}/posts`,
        lastmod: dateFallback,
        alternateRefs: generateAlternateRefs('/posts', routing.defaultLocale),
      },

      // Dynamic pages for all locales
      ...(results.docs?.flatMap((page) => {
        if (!page?.slug) return []

        const path = page.slug === 'home' ? '' : `/${page.slug}`

        return {
          loc: `${SITE_URL}/${routing.defaultLocale}${path}`,
          lastmod: page.updatedAt || dateFallback,
          alternateRefs: generateAlternateRefs(path, routing.defaultLocale),
        }
      }) || []),
    ]
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
