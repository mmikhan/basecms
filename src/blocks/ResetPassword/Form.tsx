'use client'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { resetPassword } from '@/actions/auth'
import { useState } from 'react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'
import { ResetPasswordBlock } from '@/payload-types'
import { useSearchParams } from 'next/navigation'
import { CMSLink } from '@/components/Link'

const formSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const ResetPasswordForm: React.FC<ResetPasswordBlock> = ({ redirect: link }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setError(null)
      await resetPassword({ ...data, resetPasswordToken: token })
      setIsSuccess(true)
    } catch (error) {
      setIsSuccess(false)
      setError(error instanceof Error ? error.message : 'Unknown error')
    }
  }

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  if (!token) {
    return (
      <Card className="container mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Invalid or missing token</AlertTitle>
            <AlertDescription>
              The password reset link is invalid or has expired. Please request a new one.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <CMSLink {...link} />
        </CardFooter>
      </Card>
    )
  }

  if (isSuccess) {
    return (
      <Card className="container mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle>Your password has been successfully reset.</CardTitle>
          <CardDescription>You can now log in with your new password.</CardDescription>
          <CardAction>
            <CMSLink {...link} />
          </CardAction>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="container mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Register to your account</CardTitle>
        <CardDescription>Enter your email below to register for an account</CardDescription>
        <CardAction>
          <CMSLink {...link} />
        </CardAction>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <CardContent className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Reset Password
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Forgot Password Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
