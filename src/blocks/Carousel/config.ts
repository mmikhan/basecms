import { link } from '@/fields/link'
import { marginFields, paddingFields } from '@/fields/spacing'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const Carousel: Block = {
  slug: 'carousel',
  admin: {
    group: 'Carousel',
  },
  labels: {
    singular: 'Carousel',
    plural: 'Carousels',
  },
  interfaceName: 'CarouselBlock',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'default',
      required: true,
      options: [
        {
          label: 'default',
          value: 'default',
        },
        {
          label: 'Logo',
          value: 'logo',
        },
      ],
    },
    {
      name: 'title',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'slides',
      type: 'array',
      required: true,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'enableLink',
          type: 'checkbox',
        },
        link({
          appearances: false,
          disableLabel: true,
          overrides: {
            admin: {
              condition: (_, { enableLink = false }: { enableLink?: boolean }) =>
                Boolean(enableLink),
            },
          },
        }),
      ],
    },
    {
      name: 'autoplay',
      type: 'number',
      admin: {
        condition: (_, { type }) => Boolean(type !== 'logo'),
      },
    },
    marginFields,
    paddingFields,
  ],
}
