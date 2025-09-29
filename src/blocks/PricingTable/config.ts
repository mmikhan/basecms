import { currencies } from '@/lib/utils'
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
          localized: true,
          required: true,
        },
        {
          name: 'price',
          label: 'Price',
          type: 'number',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'richText',
          localized: true,
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
          name: 'type',
          label: 'Type',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Ad Hoc Pricing',
              value: 'ad_hoc',
            },
            {
              label: 'Fixed Pricing',
              value: 'fixed',
            },
          ],
        },
        {
          name: 'priceId',
          label: 'Stripe Price ID',
          type: 'text',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData.type === 'fixed',
          },
        },
        {
          name: 'currency',
          label: 'Currency',
          type: 'select',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData.type === 'ad_hoc',
          },
          options: currencies().map(({ code, country }) => ({
            label: `${country} (${code})`,
            value: code,
          })),
        },
        {
          name: 'interval',
          label: 'Interval',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Daily',
              value: 'day',
            },
            {
              label: 'Weekly',
              value: 'week',
            },
            {
              label: 'Monthly',
              value: 'month',
            },
            {
              label: 'Yearly',
              value: 'year',
            },
          ],
          admin: {
            condition: (_, siblingData) =>
              siblingData.mode === 'subscription' && siblingData.type === 'ad_hoc',
          },
        },
      ],
    },
  ],
}
