import { GlobalConfig } from 'payload'

export const General: GlobalConfig = {
  admin: {
    group: 'Settings',
  },
  slug: 'general',
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'Site Name',
      defaultValue: 'AdMarket',
      required: true,
    },
    {
      name: 'siteLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Site Logo',
      required: true,
      admin: {
        description: 'Upload a logo for the site. Recommended size: 200x200px.',
      },
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      label: 'Site Description',
      required: true,
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: 'Contact Email',
      required: true,
    },
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
}
