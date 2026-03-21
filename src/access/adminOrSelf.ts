import type { Access } from 'payload'

export const adminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user.collection === 'users' && user.roles?.includes('admin')) return true

  return {
    id: {
      equals: user.id,
    },
  }
}
