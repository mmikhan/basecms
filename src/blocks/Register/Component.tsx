import { RegisterBlock as RegisterBlockProps } from '@/payload-types'
import { RegisterForm } from './Form'

export const RegisterBlock: React.FC<RegisterBlockProps> = (props) => {
  return <RegisterForm {...props} />
}
