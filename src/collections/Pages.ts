import { admin } from '@/access/admin'
import { anyone } from '@/access/anyone'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: admin,
    read: anyone,
    update: admin,
    delete: admin,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'richText',
                  type: 'richText',
                  label: false,
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => {
                      return [
                        ...rootFeatures,
                        HeadingFeature({
                          enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                        }),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                      ]
                    },
                  }),
                },
              ],
            },
          ],
          label: 'Hero',
        },
      ],
    },
  ],
}
