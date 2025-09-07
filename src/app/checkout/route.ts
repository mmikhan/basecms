import { getServerSideURL } from '@/lib/getURL'
import { stripe } from '@/lib/stripe'
import config from '@payload-config'
import { NextResponse, type NextRequest } from 'next/server'
import { getPayload } from 'payload'
import { cache } from 'react'

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.redirect(getServerSideURL())
  }

  const payload = await getPayload({ config })

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['line_items'] })
    if (!session) {
      return NextResponse.json({ message: 'No session found' }, { status: 404 })
    }

    payload.create({
      collection: 'orders',
      data: {
        product: session.line_items?.data?.[0]?.description ?? 'Product',
        plan: session.line_items?.data?.[0]?.price?.nickname ?? 'Plan',
        price: (session.line_items?.data?.[0]?.price?.unit_amount ?? 0) / 100,
        quantity: session.line_items?.data?.[0]?.quantity ?? 1,
        total: (session.line_items?.data?.[0].amount_total ?? 0) / 100,
        status: session.payment_status,
        mode: session.mode,
        customer: await getCustomerByEmail(
          session.customer_email ?? session.customer_details?.email ?? session.metadata?.email,
        ),
      },
    })
    return NextResponse.redirect(getServerSideURL())
  } catch (error) {
    payload.logger.error(error, 'Error creating order')
    return NextResponse.json({ message: 'Error creating order' }, { status: 500 })
  }
}

const getCustomerByEmail = cache(async (email: string | undefined) => {
  const payload = await getPayload({ config })
  const customer = await payload.find({
    collection: 'customers',
    where: {
      email: {
        equals: email,
      },
    },
  })

  return customer.docs[0]
})
