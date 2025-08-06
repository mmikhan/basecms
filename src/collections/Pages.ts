import { admin } from '@/access/admin'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { CallToAction } from '@/blocks/CallToAction/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { generatePreviewPath } from '@/lib/generatePreviewPath'
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
    read: authenticatedOrPublished,
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
    livePreview: {
      url: ({ data, req }) => {
        return generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })
      },
    },
    preview: (data, { req }) => {
      return generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      })
    },
  },
  fields: [
    {
      name: 'title',
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
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'blocks',
              blocks: [CallToAction],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: { autosave: { interval: 100 }, schedulePublish: true },
    maxPerDoc: 50,
  },
}
