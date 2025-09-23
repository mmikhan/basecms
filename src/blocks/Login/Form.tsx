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
import { login } from '@/actions/auth'
import { useState } from 'react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { LoginBlock } from '@/payload-types'
import type { Route } from 'next'
import { CMSLink } from '@/components/Link'
import { getUrl } from '@/lib/getURL'

const formSchema = z.object({
  email: z.email().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
})

export const LoginForm: React.FC<LoginBlock> = ({ register, forgotPassword, redirect: link }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setError(null)
      await login({ ...data })

      router.push((searchParams.get('redirect') ?? getUrl(link) ?? '/') as Route)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error')
    }
  }

  return (
    <Card className="container mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
        <CardAction>
          <CMSLink {...register} />
        </CardAction>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <CardContent className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <CMSLink
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      {...forgotPassword}
                    />
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Login Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
