import { link } from '@/fields/link'
import type { Block } from 'payload'

export const LoginBlock: Block = {
  slug: 'loginBlock',
  admin: {
    group: 'Login',
  },
  labels: {
    singular: 'Login Block',
    plural: 'Login Blocks',
  },
  interfaceName: 'LoginBlock',
  fields: [
    link({
      overrides: {
        name: 'register',
      },
      appearances: false,
    }),
    link({
      overrides: {
        name: 'forgotPassword',
      },
      appearances: false,
    }),
    link({
      overrides: {
        name: 'redirect',
      },
      appearances: false,
      disableLabel: true,
    }),
  ],
}
