import { User } from '@/payload-types'
import { AccessArgs } from 'payload'

type AuthenticatedAccess = (args: AccessArgs<User>) => boolean

export const authenticated: AuthenticatedAccess = ({ req: { user } }) => {
  return Boolean(user)
}
