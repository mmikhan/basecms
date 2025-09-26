import { beforeSyncWithSearch } from '@/hooks/search'
import { searchPlugin } from '@payloadcms/plugin-search'

export default searchPlugin({
  collections: ['posts'],
  localize: true,
  beforeSync: beforeSyncWithSearch,
  searchOverrides: {
    fields: ({ defaultFields }) => {
      return [
        ...defaultFields,
        {
          name: 'slug',
          type: 'text',
          localized: true,
          index: true,
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'content',
          type: 'text',
          localized: true,
          label: 'Content',
          index: true,
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'heroImage',
          label: 'Hero Image',
          type: 'upload',
          relationTo: 'media',
          index: true,
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'type',
          label: 'Type',
          type: 'text',
          index: true,
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'categories',
          label: 'Categories',
          type: 'array',
          admin: {
            readOnly: true,
          },
          fields: [
            {
              name: 'id',
              type: 'text',
            },
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'relation',
              type: 'text',
            },
          ],
        },
      ]
    },
  },
})
