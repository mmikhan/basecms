import { linkGroup } from '@/fields/linkGroup'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const LowImpactHero: Block = {
  slug: 'lowImpactHero',
  admin: {
    group: 'Hero',
  },
  labels: {
    singular: 'Low Impact Hero',
    plural: 'Low Impact Heroes',
  },
  interfaceName: 'LowImpactHero',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      localized: true,
      label: false,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({
              enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
            }),
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
