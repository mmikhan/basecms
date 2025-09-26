import { admin } from '@/access/admin'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/hooks/populate'
import { revalidatePathAfterChange, revalidatePathAfterDelete } from '@/hooks/revalidate'
import type { Dashboard as DashboardType } from '@/payload-types'
import { CollectionConfig } from 'payload'

export const Dashboard: CollectionConfig = {
  slug: 'dashboard',
  access: {
    create: admin,
    read: authenticatedOrPublished,
    update: admin,
    delete: admin,
  },
  orderable: true,
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
        const { slug } = data as unknown as DashboardType

        return `/${locale}/${slug === 'dashboard' ? 'dashboard' : `dashboard/${slug}`}`
      },
    },
    preview: (doc, { locale }) => {
      const { slug } = doc as unknown as DashboardType
      const path = slug === 'dashboard' ? 'dashboard' : `dashboard/${slug}`

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
                'accountName',
                'accountPassword',
              ],
              blocks: [],
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
    afterChange: [revalidatePathAfterChange],
    afterDelete: [revalidatePathAfterDelete],
  },
  versions: {
    drafts: { autosave: { interval: 100 }, schedulePublish: true },
    maxPerDoc: 50,
  },
}
