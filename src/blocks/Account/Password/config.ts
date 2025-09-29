import type { Block } from 'payload'

export const AccountPassword: Block = {
  slug: 'accountPassword',
  admin: {
    group: 'Account',
  },
  labels: {
    singular: 'Password',
    plural: 'Passwords',
  },
  interfaceName: 'AccountPasswordBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
    },
  ],
}
