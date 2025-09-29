import { linkGroup } from '@/fields/linkGroup'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const CallToAction: Block = {
  slug: 'cta',
  admin: {
    group: 'Call to Action',
  },
  labels: {
    singular: 'Call to Action',
    plural: 'Calls to Action',
  },
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    linkGroup({
      overrides: { maxRows: 2 },
      appearances: ['inline', 'default', 'destructive', 'ghost', 'link', 'outline', 'secondary'],
    }),
  ],
}
