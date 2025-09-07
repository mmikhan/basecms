import { LoginBlock as LoginBlockProps } from '@/payload-types'
import { LoginForm } from './Form'

export const LoginBlock: React.FC<LoginBlockProps> = (props) => {
  return <LoginForm {...props} />
}
