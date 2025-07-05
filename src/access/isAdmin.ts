import { User } from '@/payload-types'
import { Access, FieldAccess } from 'payload'

export const isAdmin: Access<User> = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin'))
}

export const isAdminFieldLevel: FieldAccess<{ id: string }, User> = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin'))
}
