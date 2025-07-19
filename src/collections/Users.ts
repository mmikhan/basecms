import { isAdminFieldLevel } from '@/access/isAdmin'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'roles',
      type: 'select',
      saveToJWT: true,
      defaultValue: 'user',
      admin: {
        condition: (_, __, { user }) => Boolean(user),
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      hooks: {
        beforeChange: [
          async ({ operation, req: { payload } }) => {
            if (operation === 'create') {
              const users = await payload.count({
                collection: 'users',
              })

              if (!Boolean(users.totalDocs)) {
                return 'admin'
              }

              return 'user'
            }
          },
        ],
      },
    },
  ],
}
