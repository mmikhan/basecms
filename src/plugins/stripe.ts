import { stripePlugin } from '@payloadcms/plugin-stripe'

export default stripePlugin({
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? '',
  stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_ENDPOINT_SECRET,
  webhooks: {
    'customer.subscription.updated': ({ event, stripe }) => {
      console.log('Subscription updated event received:', event, stripe)
    },
  },
  sync: [
    {
      collection: 'customers',
      stripeResourceType: 'customers',
      stripeResourceTypeSingular: 'customer',
      fields: [
        {
          fieldPath: 'name',
          stripeProperty: 'name',
        },
        {
          fieldPath: 'email',
          stripeProperty: 'email',
        },
      ],
    },
  ],
})
