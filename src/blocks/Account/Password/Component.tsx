import { isAuth } from '@/actions/auth'
import { AccountPasswordBlock as AccountPasswordBlockProps } from '@/payload-types'
import { AccountPasswordForm } from './Form'

export const AccountPasswordBlock: React.FC<AccountPasswordBlockProps> = async (props) => {
  const { user } = await isAuth()

  if (!user || user.collection !== 'customers') return

  return <AccountPasswordForm {...props} user={user} />
}
