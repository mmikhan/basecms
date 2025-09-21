import { isAuth } from '@/actions/auth'
import UpdatePasswordForm from './UpdatePasswordForm'
import UpdateAccountForm from './UpdateAccountForm'

export default async function AccountPage() {
  const { user } = await isAuth()

  if (!user) return

  return (
    <>
      <UpdateAccountForm {...user} />
      <UpdatePasswordForm {...user} />
    </>
  )
}
