import { admin } from '@/access/admin'
import { revalidateCacheTag } from '@/hooks/revalidate'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { Field } from 'payload'

export default redirectsPlugin({
  collections: ['pages', 'posts'],
  redirectTypes: ['301', '302', '303', '307', '308'],
  overrides: {
    access: {
      create: admin,
      read: admin,
      update: admin,
      delete: admin,
    },
    fields: ({ defaultFields }): Field[] => {
      return defaultFields.map((field) => {
        if ('name' in field && field.name === 'from') {
          return {
            ...field,
            admin: {
              description: 'You will need to rebuild the website when changing this field.',
            },
          } as Field
        }

        return field
      })
    },
    hooks: {
      afterChange: [revalidateCacheTag('redirects')],
      afterDelete: [revalidateCacheTag('redirects')],
    },
  },
})
