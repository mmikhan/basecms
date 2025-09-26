import { admin } from '@/access/admin'
import { anyone } from '@/access/anyone'
import { seoFields } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { populateAuthors } from '@/hooks/populate'
import { revalidatePathAfterChange, revalidatePathAfterDelete } from '@/hooks/revalidate'
import type { Post } from '@/payload-types'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Post',
    plural: 'Posts',
  },
  access: {
    create: admin,
    read: anyone,
    update: admin,
    delete: admin,
  },
  enableQueryPresets: true,
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    heroImage: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, collectionConfig, locale }) => {
        const { slug } = data as unknown as Post

        return `/${locale}/${collectionConfig?.slug}/${slug}`
      },
    },
    preview: (doc, { locale }) => {
      const { slug } = doc as unknown as Post

      const encodedParams = new URLSearchParams({
        path: `/posts/${slug}`,
        locale,
        previewSecret: process.env.PREVIEW_SECRET ?? '',
      })

      return `/next/preview?${encodedParams.toString()}`
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              localized: true,
              relationTo: 'media',
            },
            {
              name: 'content',
              label: false,
              required: true,
              type: 'richText',
              localized: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: ['banner', 'code', 'mediaBlock'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              hasMany: true,
              relationTo: 'posts',
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
            },
            {
              name: 'categories',
              type: 'relationship',
              hasMany: true,
              relationTo: 'categories',
              admin: {
                position: 'sidebar',
              },
            },
          ],
        },
        seoFields,
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      hasMany: true,
      required: true,
      relationTo: 'users',
      defaultValue: ({ user }) => (user ? [user.id] : []),
      admin: {
        position: 'sidebar',
      },
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    ...slugField(),
  ],
  hooks: {
    afterRead: [populateAuthors],
    afterChange: [revalidatePathAfterChange],
    afterDelete: [revalidatePathAfterDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
