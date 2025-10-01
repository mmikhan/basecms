import { link } from '@/fields/link'
import type { Block } from 'payload'

export const RegisterBlock: Block = {
  slug: 'registerBlock',
  admin: {
    group: 'Register',
  },
  labels: {
    singular: 'Register Block',
    plural: 'Register Blocks',
  },
  interfaceName: 'RegisterBlock',
  fields: [
    link({
      overrides: {
        name: 'login',
      },
      appearances: false,
    }),
  ],
}
