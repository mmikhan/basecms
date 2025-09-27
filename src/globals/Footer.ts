import { admin } from '@/access/admin'
import { anyone } from '@/access/anyone'
import { revalidateCacheTag } from '@/hooks/revalidate'
import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: 'Settings',
  },
  access: {
    read: anyone,
    update: admin,
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      localized: true,
      label: false,
      blockReferences: ['footerBlock'],
      blocks: [],
      required: true,
      admin: {
        initCollapsed: true,
      },
    },
  ],
  hooks: {
    afterChange: [revalidateCacheTag('global_footer')],
  },
}
