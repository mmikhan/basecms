import { admin } from '@/access/admin'
import { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'user',
  },
  access: {
    create: () => false,
    read: admin,
    update: () => false,
    delete: admin,
  },
  fields: [
    {
      name: 'product',
      label: 'Product',
      type: 'text',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'plan',
      label: 'Plan',
      type: 'text',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'quantity',
      label: 'Quantity',
      type: 'number',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'total',
      label: 'Total',
      type: 'number',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'text',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'mode',
      label: 'Mode',
      type: 'text',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'user',
      label: 'User',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: { readOnly: true },
    },
  ],
}
