import { admin } from '@/access/admin'
import { anyone } from '@/access/anyone'
import { slugField } from '@/fields/slug'
import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: admin,
    read: anyone,
    update: admin,
    delete: admin,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
  ],
}
