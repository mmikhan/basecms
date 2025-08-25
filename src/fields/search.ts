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
    name: 'description',
    type: 'text',
    label: 'Description',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'image',
    label: 'Image',
    type: 'upload',
    relationTo: 'media',
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
