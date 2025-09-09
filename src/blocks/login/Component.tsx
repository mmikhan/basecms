import { LoginBlock as LoginBlockProps } from '@/payload-types'
import { LoginForm } from './Form'
import { cookies } from 'next/headers'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { SuccessIcon } from '@payloadcms/ui'

export const LoginBlock: React.FC<LoginBlockProps> = async (props) => {
  const verifiedEmail = (await cookies()).get('verified')?.value

  return (
    <>
      {verifiedEmail && (
        <Alert variant="default" className="mb-4">
          <SuccessIcon />
          <AlertTitle>Your email has been verified</AlertTitle>
          <AlertDescription>
            Your email has been verified. Please login to your account.
          </AlertDescription>
        </Alert>
      )}
      <LoginForm {...props} />
    </>
  )
}
