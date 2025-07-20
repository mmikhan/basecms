import { User } from '@/payload-types'

export const user = ({ req: { user } }: { req: { user: User | null } }) => {
  if (!user) return false

  return user?.roles?.includes('user') || false
}
