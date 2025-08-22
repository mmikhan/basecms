import { getPath } from '@/hooks/revalidate'
import { getServerSideURL } from '@/lib/getURL'
import type { Page, Post } from '@/payload-types'
import { seoPlugin } from '@payloadcms/plugin-seo'
import type { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'

// TODO: custom post types. i.e. GenerateTitle<Page | Post>
// TODO: locale. i.e. async ({doc, locale})
const generateTitle: GenerateTitle<Page | Post> = async ({ doc }) => {
  return `${doc?.title} - AdMarket`
}

const generateURL: GenerateURL<Page | Post> = async ({ doc, collectionConfig }) => {
  const url = getServerSideURL()
  const slug = getPath(collectionConfig?.slug ?? '', doc?.slug ?? '')

  return doc?.slug ? new URL(slug, url).toString() : new URL(url).toString()
}

export default seoPlugin({
  generateTitle,
  generateURL,
})
