import { adminOrSelf } from '@/access/adminOrSelf'
import { anyone } from '@/access/anyone'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: adminOrSelf,
    read: anyone,
    update: adminOrSelf,
    delete: adminOrSelf,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
    },
    {
      name: 'caption',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features({ rootFeatures }) {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    {
      name: 'cloudinaryFolder',
      label: 'Cloudinary Folder',
      type: 'text',
      admin: {
        components: {
          Field: {
            path: '@/fields/cloudinary#selectField',
          },
        },
      },
    },
  ],
  upload: {
    disableLocalStorage: true,
  },
  hooks: {
    afterRead: [
      ({ doc, req }) => {
        if ((doc.requiresSignedURL || doc.isPrivate) && !req.user) {
          return null
        }

        return doc
      },
    ],
  },
}
