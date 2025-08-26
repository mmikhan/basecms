import type { Field } from 'payload'

export const searchFields: Field[] = [
  {
    name: 'slug',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'content',
    type: 'text',
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
