import { Block } from 'payload'

export const BillingPortal: Block = {
  slug: 'billingPortal',
  admin: {
    group: 'Billing',
  },
  labels: {
    plural: 'Billing Portals',
    singular: 'Billing Portal',
  },
  interfaceName: 'BillingPortalBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      localized: true,
      defaultValue: 'Manage Billing Portal',
      required: true,
    },
  ],
}
