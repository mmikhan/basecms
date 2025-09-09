import { ForgotPasswordBlock as ForgotPasswordBlockProps } from '@/payload-types'
import { ForgotPasswordForm } from './Form'

export const ForgotPasswordBlock: React.FC<ForgotPasswordBlockProps> = (props) => {
  return <ForgotPasswordForm {...props} />
}
