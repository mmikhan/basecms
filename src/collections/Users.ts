import { admin } from '@/access/admin'
import { adminOrSelf } from '@/access/adminOrSelf'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    // Only admins can create users
    create: admin,
    // Admins can read all, but any other logged in user can only read themselves
    read: adminOrSelf,
    // Admins can update all, but any other logged in user can only update themselves
    update: adminOrSelf,
    // Only admins can delete
    delete: admin,
  },
  enableQueryPresets: true,
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
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
        create: admin,
        update: admin,
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
