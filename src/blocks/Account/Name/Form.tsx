'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Customer, AccountNameBlock } from '@/payload-types'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { updateAccount } from '@/actions/auth'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
})

type AccountNameFormProps = AccountNameBlock & {
  user: Customer
}

export const AccountNameForm: React.FC<AccountNameFormProps> = ({
  title,
  description,
  user: { id, name },
}) => {
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setError(null)
      await updateAccount({ ...data, id })
      setIsSuccess(true)
    } catch (error) {
      setIsSuccess(false)
      setError(error instanceof Error ? error.message : 'Unknown error')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <CardContent className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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
              Update Name
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Update Name Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isSuccess && !error && (
              <Alert>
                <AlertTitle>Name Updated</AlertTitle>
                <AlertDescription>Your name has been updated successfully.</AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
