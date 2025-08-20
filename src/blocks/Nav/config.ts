import { link } from '@/fields/link'
import type { Block } from 'payload'

export const Nav: Block = {
  slug: 'nav',
  admin: {
    group: 'Navigation',
  },
  labels: {
    singular: 'Navigation',
    plural: 'Navigations',
  },
  interfaceName: 'NavBlock',
  fields: [
    {
      name: 'media',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        link({
          appearances: ['default', 'destructive', 'ghost', 'link', 'outline', 'secondary'],
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/Nav/RowLabel#RowLabel',
        },
      },
    },
  ],
}
