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
  labels: {
    singular: 'Low Impact Hero',
    plural: 'Low Impact Heroes',
  },
  interfaceName: 'LowImpactHero',
  fields: [
    {
      name: 'richText',
      type: 'richText',
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
      label: false,
    },
    linkGroup({
      overrides: { maxRows: 2 },
      appearances: ['inline', 'default', 'destructive', 'ghost', 'link', 'outline', 'secondary'],
    }),
  ],
}
