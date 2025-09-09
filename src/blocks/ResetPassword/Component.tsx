import { ResetPasswordBlock as ResetPasswordBlockProps } from '@/payload-types'
import { Suspense } from 'react'
import { ResetPasswordForm } from './Form'

export const ResetPasswordBlock: React.FC<ResetPasswordBlockProps> = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm {...props} />
    </Suspense>
  )
}
