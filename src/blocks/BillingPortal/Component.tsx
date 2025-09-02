import { Button } from '@/components/ui/button'
import { BillingPortalBlock as BillingPortalBlockProps } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'

export const BillingPortalBlock: React.FC<BillingPortalBlockProps> = async ({ label }) => {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })

  return (
    <form
      action={async () => {
        'use server'

        const session = await stripe.billingPortal.sessions.create({
          customer: user?.stripeID ?? '',
        })

        redirect(session.url)
      }}
    >
      <Button type="submit">{label}</Button>
    </form>
  )
}
