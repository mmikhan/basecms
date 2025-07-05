import { isAdminFieldLevel } from '@/access/isAdmin'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
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
      hasMany: true,
      defaultValue: ['user'],
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
      admin: {
        condition: (_, __, { user }) => Boolean(user),
      },
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      saveToJWT: true,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ req, data, operation }) => {
        if (operation === 'create') {
          const users = await req.payload.find({
            collection: 'users',
            limit: 0,
            depth: 0,
          })

          if (users.totalDocs === 0) {
            // If this is the first user, assign 'admin' role
            data.roles = ['admin']
          }
        }

        return data
      },
    ],
  },
}
