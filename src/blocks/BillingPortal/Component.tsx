import { Button } from '@/components/ui/button'
import { BillingPortalBlock as BillingPortalBlockProps } from '@/payload-types'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import type { Route } from 'next'
import { isAuth } from '@/actions/auth'

export const BillingPortalBlock: React.FC<BillingPortalBlockProps> = async ({ label }) => {
  const { user: customer } = await isAuth()

  return (
    <form
      action={async () => {
        'use server'

        if (!customer) return redirect('/login')

        const session = await stripe.billingPortal.sessions.create({
          customer: customer?.collection === 'customers' ? (customer?.stripeID as string) : '',
        })

        redirect(session.url as Route)
      }}
    >
      <Button type="submit">{label}</Button>
    </form>
  )
}
