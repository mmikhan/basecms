import { importExportPlugin } from '@payloadcms/plugin-import-export'

export default importExportPlugin({
  collections: ['pages', 'posts'],
  debug: process.env.NODE_ENV === 'development',
})
