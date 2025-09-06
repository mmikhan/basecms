import RichText from '@/components/RichText'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PricingTableBlock as PricingTableBlockProps } from '@/payload-types'
import { createCheckoutSession } from '@/lib/stripe'
import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Route } from 'next'

const getCurrentUser = cache(async () => {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })

  return user
})

export const PricingTableBlock: React.FC<PricingTableBlockProps> = async ({ plans }) => {
  const user = await getCurrentUser()

  return (
    <div className="container mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan) => (
        <Card key={plan.id}>
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>
              {plan.description ? <RichText data={plan.description} /> : null}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{plan.price}</p>
          </CardContent>
          <CardFooter>
            <form
              action={async () => {
                'use server'

                if (!user) return redirect('/login')

                const session = await createCheckoutSession(
                  plan.mode,
                  [
                    {
                      ...(plan.type === 'fixed'
                        ? { price: plan.priceId ?? '' }
                        : {
                            price_data: {
                              currency: plan.currency ?? 'usd',
                              unit_amount: plan.price * 100,
                              product_data: {
                                name: plan.name,
                              },
                              ...(plan.mode === 'subscription'
                                ? { recurring: { interval: plan.interval ?? 'month' } }
                                : {}),
                            },
                          }),
                      quantity: 1,
                      adjustable_quantity: { enabled: true, minimum: 1 },
                    },
                  ],
                  user ?? undefined,
                )
                redirect(session.url as Route)
              }}
            >
              <Button type="submit">Buy Now</Button>
            </form>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
