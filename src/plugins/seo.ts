import { getServerSideURL } from '@/lib/getURL'
import { Page } from '@/payload-types'
import { seoPlugin } from '@payloadcms/plugin-seo'
import type { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'

// TODO: custom post types. i.e. GenerateTitle<Page | Post>
// TODO: locale. i.e. async ({doc, locale})
const generateTitle: GenerateTitle<Page> = async ({ doc }) => {
  return `${doc?.title} - AdMarket`
}

const generateURL: GenerateURL<Page> = async ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export default seoPlugin({
  generateTitle,
  generateURL,
})
