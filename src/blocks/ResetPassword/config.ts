import { link } from '@/fields/link'
import type { Block } from 'payload'

export const ResetPasswordBlock: Block = {
  slug: 'resetPasswordBlock',
  admin: {
    group: 'Reset Password',
  },
  labels: {
    singular: 'Reset Password Block',
    plural: 'Reset Password Blocks',
  },
  interfaceName: 'ResetPasswordBlock',
  fields: [
    link({
      overrides: {
        name: 'redirect',
      },
      appearances: false,
    }),
  ],
}
