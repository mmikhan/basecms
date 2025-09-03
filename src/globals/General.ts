import { admin } from '@/access/admin'
import { GlobalConfig } from 'payload'

export const General: GlobalConfig = {
  admin: {
    group: 'Settings',
  },
  slug: 'general',
  access: {
    read: admin,
    update: admin,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              label: 'Site Name',
            },
            {
              name: 'siteLogo',
              type: 'upload',
              relationTo: 'media',
              label: 'Site Logo',
            },
            {
              name: 'siteDescription',
              type: 'textarea',
              label: 'Site Description',
            },
            {
              name: 'contactEmail',
              type: 'email',
              label: 'Contact Email',
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'socialMediaLinks',
              type: 'array',
              label: 'Social Media Links',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'],
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
              minRows: 0,
              maxRows: 5,
            },
          ],
        },
      ],
    },
  ],
}
