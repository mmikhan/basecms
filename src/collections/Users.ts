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
    {
      name: 'stripeCustomerId',
      type: 'text',
      required: false,
      unique: true,
      admin: {
        readOnly: true,
        condition: (_, __, { user }) => Boolean(user?.roles?.includes('admin')),
      },
      hooks: {
        beforeChange: [
          async ({ operation, value, req: { payload, user } }) => {
            if (operation === 'create') {
              if (process.env.NODE_ENV === 'development') {
                return Math.random().toString(36).slice(2)
              }
              // In production, use a placeholder or actual Stripe ID logic
              return 'cus_12345'
            }
          },
        ],
      },
    },
  ],
}
