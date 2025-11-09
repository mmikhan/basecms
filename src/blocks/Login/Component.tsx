import { LoginBlock as LoginBlockProps } from '@/payload-types'
import { LoginForm } from './Form'
import { Suspense } from 'react'

export const LoginBlock: React.FC<LoginBlockProps> = async (props) => {
  return (
    <div className="container max-w-sm mx-auto pt-32">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm {...props} />
      </Suspense>
    </div>
  )
}
