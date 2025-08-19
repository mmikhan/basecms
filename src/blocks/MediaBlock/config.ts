import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  admin: {
    group: 'Media',
  },
  labels: {
    singular: 'Media Block',
    plural: 'Media Blocks',
  },
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
