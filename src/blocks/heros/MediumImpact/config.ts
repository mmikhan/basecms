import { linkGroup } from '@/fields/linkGroup'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const MediumImpactHero: Block = {
  slug: 'mediumImpactHero',
  admin: {
    group: 'Hero',
  },
  labels: {
    singular: 'Medium Impact Hero',
    plural: 'Medium Impact Heroes',
  },
  interfaceName: 'MediumImpactHero',
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
      overrides: { maxRows: 2, dbName: 'links' },
      appearances: ['inline', 'default', 'destructive', 'ghost', 'link', 'outline', 'secondary'],
    }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
