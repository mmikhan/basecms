import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'

export default nestedDocsPlugin({
  collections: ['categories'],
  generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
})
