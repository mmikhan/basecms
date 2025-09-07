import { link } from '@/fields/link'
import type { Block } from 'payload'

export const LogoutBlock: Block = {
  slug: 'logoutBlock',
  admin: {
    group: 'Logout',
  },
  labels: {
    singular: 'Logout Block',
    plural: 'Logout Blocks',
  },
  interfaceName: 'LogoutBlock',
  fields: [
    link({
      overrides: {
        name: 'redirect',
      },
      appearances: ['default', 'destructive', 'ghost', 'link', 'outline', 'secondary'],
    }),
  ],
}
