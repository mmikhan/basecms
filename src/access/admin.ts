import type { Access } from 'payload'

export const admin: Access = ({ req: { user } }) => {
  if (user?.collection !== 'users') return false

  return user.roles?.includes('admin') || false
}
