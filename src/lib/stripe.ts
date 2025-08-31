import Stripe from 'stripe'
import type { User } from '@/payload-types'
import { getServerSideURL } from './getURL'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2022-08-01',
})

export const createCheckoutSession = async (
  mode: Stripe.Checkout.SessionCreateParams.Mode,
  line_items: Stripe.Checkout.SessionCreateParams.LineItem[],
  user: User,
) => {
  return await stripe.checkout.sessions.create({
    mode,
    line_items,
    client_reference_id: user.id.toString(),
    customer_email: user.email,
    allow_promotion_codes: true,
    automatic_tax: { enabled: true },
    tax_id_collection: { enabled: true },
    metadata: { id: user.id, name: user.name, email: user.email },
    success_url: `${getServerSideURL()}/api/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${getServerSideURL()}/api/cancel?session_id={CHECKOUT_SESSION_ID}`,
  })
}
