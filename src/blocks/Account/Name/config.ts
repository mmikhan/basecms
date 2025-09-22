import type { Block } from 'payload'

export const AccountName: Block = {
  slug: 'accountName',
  admin: {
    group: 'Account',
  },
  labels: {
    singular: 'Name',
    plural: 'Names',
  },
  interfaceName: 'AccountNameBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
    },
  ],
}
