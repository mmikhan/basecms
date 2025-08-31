import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'
import Stripe from 'stripe'

export const PricingTable: Block = {
  slug: 'pricingTable',
  admin: {
    group: 'Pricing Table',
  },
  labels: {
    plural: 'Pricing Tables',
    singular: 'Pricing Table',
  },
  interfaceName: 'PricingTableBlock',
  fields: [
    {
      name: 'plans',
      label: 'Plans',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          label: 'Price',
          type: 'number',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
        },
        {
          name: 'mode',
          label: 'Checkout Mode',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Payment',
              value: 'payment',
            },
            {
              label: 'Setup',
              value: 'setup',
            },
            {
              label: 'Subscription',
              value: 'subscription',
            },
          ] as { label: string; value: Stripe.Checkout.SessionCreateParams.Mode }[],
        },
        {
          name: 'priceId',
          label: 'Stripe Price ID',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
