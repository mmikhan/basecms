import { User } from '../payload-types'

export const admin = ({ req: { user } }: { req: { user: User | null } }) => {
  if (!user) return false

  return user.roles?.includes('admin') || false
}
