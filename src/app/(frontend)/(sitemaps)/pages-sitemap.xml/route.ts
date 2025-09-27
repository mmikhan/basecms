import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getServerSideURL } from '@/lib/getURL'
import { routing } from '@/i18n/routing'
import type { Locale } from 'next-intl'

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

    // Helper function to generate alternateRefs for a given path (excluding current locale)
    const generateAlternateRefs = (path: string, currentLocale: Locale) => {
      return routing.locales
        .filter((locale) => locale !== currentLocale)
        .map((locale) => ({
          href: `${SITE_URL}/${locale}${path}`,
          hreflang: locale,
        }))
    }

    return [
      // Static pages for all locales
      ...routing.locales.flatMap((locale) => [
        {
          loc: `${SITE_URL}/${locale}/search`,
          lastmod: dateFallback,
          alternateRefs: generateAlternateRefs('/search', locale),
        },
        {
          loc: `${SITE_URL}/${locale}/posts`,
          lastmod: dateFallback,
          alternateRefs: generateAlternateRefs('/posts', locale),
        },
      ]),

      // Dynamic pages for all locales
      ...(results.docs?.flatMap((page) => {
        if (!page?.slug) return []

        return routing.locales.map((locale) => {
          const path = page.slug === 'home' ? '' : `/${page.slug}`

          return {
            loc: `${SITE_URL}/${locale}${path}`,
            lastmod: page.updatedAt || dateFallback,
            alternateRefs: generateAlternateRefs(path, locale),
          }
        })
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
