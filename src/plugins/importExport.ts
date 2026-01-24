import { importExportPlugin } from '@payloadcms/plugin-import-export'

export default importExportPlugin({
  overrideExportCollection: ({ collection }) => {
    if (collection.admin) {
      collection.admin.group = 'System'
    }

    return collection
  },
  overrideImportCollection: ({ collection }) => {
    if (collection.admin) {
      collection.admin.group = 'System'
    }

    return collection
  },
  collections: [{ slug: 'pages' }, { slug: 'posts' }],
  debug: process.env.NODE_ENV === 'development',
})
