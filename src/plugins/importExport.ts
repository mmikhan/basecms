import { importExportPlugin } from '@payloadcms/plugin-import-export'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

export default importExportPlugin({
  overrideExportCollection: ({ collection }) => {
    if (collection.admin) {
      collection.admin.group = 'System'
    }

    if (collection.upload && typeof collection.upload === 'object') {
      collection.upload.staticDir = path.resolve(dirname(__filename), 'uploads')
    }

    return collection
  },
  overrideImportCollection: ({ collection }) => {
    if (collection.admin) {
      collection.admin.group = 'System'
    }

    if (collection.upload && typeof collection.upload === 'object') {
      collection.upload.staticDir = path.resolve(dirname(__filename), 'uploads')
    }

    return collection
  },
  collections: [{ slug: 'pages' }, { slug: 'posts' }],
  debug: process.env.NODE_ENV === 'development',
})
