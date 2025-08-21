import { link } from '@/fields/link'
import type { Block } from 'payload'

export const FooterBlock: Block = {
  slug: 'footerBlock',
  admin: {
    group: 'Footer',
  },
  labels: {
    singular: 'Footer Block',
    plural: 'Footer Blocks',
  },
  interfaceName: 'FooterBlock',
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
          RowLabel: '@/blocks/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
}
