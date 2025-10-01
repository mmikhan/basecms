import { link } from '@/fields/link'
import type { Block } from 'payload'

export const ForgotPasswordBlock: Block = {
  slug: 'forgotPasswordBlock',
  admin: {
    group: 'Forgot Password',
  },
  labels: {
    singular: 'Forgot Password Block',
    plural: 'Forgot Password Blocks',
  },
  interfaceName: 'ForgotPasswordBlock',
  fields: [
    link({
      overrides: {
        name: 'login',
      },
      appearances: false,
    }),
  ],
}
