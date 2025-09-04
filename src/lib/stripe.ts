import Stripe from 'stripe'
import type { User } from '@/payload-types'
import { getServerSideURL } from './getURL'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2022-08-01',
})

export const createCheckoutSession = async (
  mode: Stripe.Checkout.SessionCreateParams.Mode,
  line_items: Stripe.Checkout.SessionCreateParams.LineItem[],
  user?: User,
) => {
  return await stripe.checkout.sessions.create({
    mode,
    line_items,
    client_reference_id: user?.id.toString(),
    customer: user?.stripeID ?? undefined,
    customer_update: { name: 'auto', address: 'auto' },
    allow_promotion_codes: true,
    automatic_tax: { enabled: true },
    tax_id_collection: { enabled: true },
    metadata: user ? { id: user.id, name: user.name, email: user.email } : {},
    success_url: `${getServerSideURL()}/checkout?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${getServerSideURL()}/cancel?session_id={CHECKOUT_SESSION_ID}`,
  })
}

export const currencies = (currency?: string[]): { code: string; country: string }[] => {
  const supported =
    typeof Intl.supportedValuesOf === 'function' ? Intl.supportedValuesOf('currency') : []

  const filtered = currency ? supported.filter((code) => currency.includes(code)) : supported

  const displayNames =
    typeof Intl.DisplayNames === 'function'
      ? new Intl.DisplayNames(['en'], { type: 'region' })
      : undefined

  // Map currency to country using currency code's first two letters (ISO 3166 region)
  return filtered.map((code) => {
    // This is a heuristic; for many currencies, the first two letters match the country code
    // For more accuracy, a currency-country mapping should be used
    const countryCode = code.slice(0, 2)
    const country = displayNames ? (displayNames.of(countryCode) ?? '') : ''

    return { code, country }
  })
}
