import { admin } from '@/access/admin'
import { adminOrSelf } from '@/access/adminOrSelf'
import { anyone } from '@/access/anyone'
import { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: anyone,
    read: adminOrSelf,
    update: adminOrSelf,
    delete: admin,
  },
  auth: {
    tokenExpiration: 7200,
    verify: true,
    maxLoginAttempts: 5,
    lockTime: 600 * 1000,
  },
  labels: {
    plural: 'Customers',
    singular: 'Customer',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
