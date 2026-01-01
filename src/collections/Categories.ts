import { admin } from '@/access/admin'
import { anyone } from '@/access/anyone'
import { slugField, type CollectionConfig } from 'payload'
import slugify from 'slugify'

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
    slugField({
      slugify: ({ valueToSlugify }) =>
        typeof valueToSlugify === 'string'
          ? slugify(valueToSlugify, { lower: true, strict: true })
          : '',
    }),
  ],
}
