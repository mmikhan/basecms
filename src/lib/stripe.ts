import Stripe from 'stripe'
import type { Customer } from '@/payload-types'
import { getServerSideURL } from './getURL'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2022-08-01',
})

export const createCheckoutSession = async (
  mode: Stripe.Checkout.SessionCreateParams.Mode,
  line_items: Stripe.Checkout.SessionCreateParams.LineItem[],
  customer?: Customer,
) => {
  return await stripe.checkout.sessions.create({
    mode,
    line_items,
    client_reference_id: customer?.id.toString(),
    customer: customer?.stripeID ?? undefined,
    customer_update: { name: 'auto', address: 'auto' },
    allow_promotion_codes: true,
    automatic_tax: { enabled: true },
    tax_id_collection: { enabled: true },
    metadata: customer ? { id: customer.id, name: customer.name, email: customer.email } : {},
    success_url: `${getServerSideURL()}/next/checkout?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${getServerSideURL()}/next/cancel?session_id={CHECKOUT_SESSION_ID}`,
  })
}
