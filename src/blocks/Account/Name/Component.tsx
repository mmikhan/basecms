import { isAuth } from '@/actions/auth'
import { AccountNameForm } from './Form'
import type { AccountNameBlock as AccountNameBlockProps } from '@/payload-types'

export const AccountNameBlock: React.FC<AccountNameBlockProps> = async (props) => {
  const { user } = await isAuth()

  if (!user) return

  return <AccountNameForm {...props} user={user} />
}
