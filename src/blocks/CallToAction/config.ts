import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const CallToAction: Block = {
  slug: 'cta',
  labels: {
    singular: 'Call to Action',
    plural: 'Calls to Action',
  },
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'richText',
      type: 'richText',
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
    {
      name: 'link',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        description: 'Link to a page',
      },
    },
    {
      name: 'buttonText',
      type: 'text',
      admin: {
        description: 'Text for the call to action button',
      },
    },
  ],
}
