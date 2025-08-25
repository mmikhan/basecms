import { searchFields } from '@/fields/search'
import { beforeSyncWithSearch } from '@/hooks/search'
import { searchPlugin } from '@payloadcms/plugin-search'

export default searchPlugin({
  collections: ['posts'],
  beforeSync: beforeSyncWithSearch,
  searchOverrides: {
    fields: ({ defaultFields }) => {
      return [...defaultFields, ...searchFields]
    },
  },
})
