import { admin } from '@/access/admin'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/hooks/populate'
import { revalidatePathAfterChange, revalidatePathAfterDelete } from '@/hooks/revalidate'
import { generatePreviewPath } from '@/lib/generatePreviewPath'
import { CollectionConfig } from 'payload'
import { seoFields } from '@/fields/seo'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: admin,
    read: authenticatedOrPublished,
    update: admin,
    delete: admin,
  },
  enableQueryPresets: true,
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
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              label: false,
              blockReferences: [
                'cta',
                'highImpactHero',
                'mediumImpactHero',
                'lowImpactHero',
                'content',
                'mediaBlock',
                'code',
                'banner',
                'nav',
                'footerBlock',
                'archive',
                'formBlock',
                'pricingTable',
                'billingPortal',
                'loginBlock',
                'logoutBlock',
                'registerBlock',
              ],
              blocks: [],
              required: true,
              admin: {
                initCollapsed: true,
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
      },
    },
    ...slugField(),
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidatePathAfterChange],
    afterDelete: [revalidatePathAfterDelete],
  },
  versions: {
    drafts: { autosave: { interval: 100 }, schedulePublish: true },
    maxPerDoc: 50,
  },
}
