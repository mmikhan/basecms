import { User } from '@/payload-types'
import { Access, FieldAccess } from 'payload'

export const isAdmin: Access<User> = ({ req: { user } }) => {
  if (user?.collection === 'users') {
    return Boolean((user as User)?.roles?.includes('admin'))
  }
  return false
}

export const isAdminFieldLevel: FieldAccess<{ id: string }, User> = ({ req: { user } }) => {
  if (user?.collection === 'users') {
    return Boolean((user as User)?.roles?.includes('admin'))
  }
  return false
}
