import { adminOrSelf } from '@/access/adminOrSelf'
import { anyone } from '@/access/anyone'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: adminOrSelf,
    read: anyone,
    update: adminOrSelf,
    delete: adminOrSelf,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
