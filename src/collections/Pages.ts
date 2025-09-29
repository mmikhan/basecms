import { admin } from '@/access/admin'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/hooks/populate'
import { revalidatePathAfterChange, revalidatePathAfterDelete } from '@/hooks/revalidate'
import { CollectionConfig } from 'payload'
import { seoFields } from '@/fields/seo'
import type { Page } from '@/payload-types'

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
      url: ({ data, locale }) => {
        const { slug } = data as unknown as Page

        return `/${locale}/${slug === 'home' ? '' : slug}`
      },
    },
    preview: (doc, { locale }) => {
      const { slug } = doc as unknown as Page
      const path = slug === 'home' ? '' : slug

      const encodedParams = new URLSearchParams({
        path: `/${path}`,
        locale,
        previewSecret: process.env.PREVIEW_SECRET ?? '',
      })

      return `/next/preview?${encodedParams.toString()}`
    },
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
              name: 'layout',
              type: 'blocks',
              localized: true,
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
                'forgotPasswordBlock',
                'resetPasswordBlock',
                'accordion',
                'carousel',
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
