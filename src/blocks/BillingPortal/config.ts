import { link } from '@/fields/link'
import { Block } from 'payload'

export const BillingPortal: Block = {
  slug: 'billingPortal',
  admin: {
    group: 'Billing',
  },
  labels: {
    plural: 'Billing Portals',
    singular: 'Billing Portal',
  },
  interfaceName: 'BillingPortalBlock',
  fields: [
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Existing',
          value: 'existing',
        },
        {
          label: 'Custom',
          value: 'custom',
        },
      ],
    },
    {
      name: 'link',
      label: 'Link',
      type: 'text',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'existing',
      },
    },
    {
      name: 'configuration',
      label: false,
      type: 'group',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'custom',
      },
      fields: [
        {
          type: 'group',
          name: 'customerInfo',
          label: 'Customer Information',
          fields: [
            {
              name: 'customer',
              label: 'Customer information',
              type: 'checkbox',
              defaultValue: true,
              required: true,
            },
            {
              name: 'name',
              label: 'Name',
              type: 'checkbox',
              defaultValue: true,
              required: true,
              admin: { condition: (_, sd) => !!sd.customer },
            },
            {
              name: 'email',
              label: 'Email',
              type: 'checkbox',
              defaultValue: true,
              required: true,
              admin: { condition: (_, sd) => !!sd.customer },
            },
            {
              name: 'billingAddress',
              label: 'Billing address',
              type: 'checkbox',
              defaultValue: true,
              required: true,
              admin: { condition: (_, sd) => !!sd.customer },
            },
            {
              name: 'shippingAddress',
              label: 'Shipping address',
              type: 'checkbox',
              required: true,
              admin: { condition: (_, sd) => !!sd.customer },
            },
            {
              name: 'phoneNumber',
              label: 'Phone number',
              type: 'checkbox',
              defaultValue: true,
              required: true,
              admin: { condition: (_, sd) => !!sd.customer },
            },
            {
              name: 'taxId',
              label: 'Tax ID',
              type: 'checkbox',
              required: true,
              admin: { condition: (_, sd) => !!sd.customer },
            },
          ],
        },
        {
          type: 'group',
          name: 'subscriptionControls',
          label: 'Subscription Controls',
          fields: [
            {
              name: 'paymentMethods',
              label: 'Update payment methods',
              type: 'checkbox',
              defaultValue: true,
              required: true,
            },
            { name: 'cancel', label: 'Cancel subscriptions', type: 'checkbox', required: true },
            {
              type: 'row',
              fields: [
                {
                  name: 'settings',
                  label: false,
                  type: 'radio',
                  defaultValue: 'end_of_period',
                  required: true,
                  dbName: 'cancel_settings',
                  admin: { condition: (_, siblingData) => !!siblingData.cancel },
                  options: [
                    { label: 'Immediately', value: 'immediately' },
                    { label: 'At the end of billing period', value: 'end_of_period' },
                  ],
                },
                {
                  name: 'reason',
                  label: 'Reason',
                  type: 'checkbox',
                  required: true,
                  admin: { condition: (_, siblingData) => !!siblingData.cancel },
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          name: 'cancellationReasons',
          label: 'Cancellation Reasons',
          admin: {
            condition: (_, siblingData) => !!siblingData.subscriptionControls?.reason,
          },
          fields: [
            {
              name: 'too_expensive',
              label: "It's too expensive",
              type: 'checkbox',
              defaultValue: true,
              required: true,
            },
            {
              name: 'missing_features',
              label: 'I need more features',
              type: 'checkbox',
              required: true,
            },
            {
              name: 'switched_service',
              label: 'I found an alternative',
              type: 'checkbox',
              defaultValue: true,
              required: true,
            },
            {
              name: 'unused',
              label: 'I no longer need it',
              type: 'checkbox',
              defaultValue: true,
              required: true,
            },
            {
              name: 'customer_service',
              label: 'Customer service was less than expected',
              type: 'checkbox',
              required: true,
            },
            {
              name: 'too_complex',
              label: 'Ease of use was less than expected',
              type: 'checkbox',
              required: true,
            },
            {
              name: 'low_quality',
              label: 'Quality was less than expected',
              type: 'checkbox',
              required: true,
            },
            {
              name: 'other',
              label: 'Other reason',
              type: 'checkbox',
              defaultValue: true,
              required: true,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'switchPlans',
              label: 'Customer can switch plans',
              type: 'checkbox',
              required: true,
            },
            {
              name: 'changeQuantity',
              label: 'Customer can change quantity of their plan',
              type: 'checkbox',
              required: true,
            },
          ],
        },
        { name: 'heading', label: 'Portal header', type: 'text', required: true },
        link({
          appearances: false,
          overrides: {
            name: 'terms',
            label: 'Terms of service',
          },
        }),
        link({
          appearances: false,
          overrides: {
            name: 'privacy',
            label: 'Privacy policy',
          },
        }),
      ],
    },
  ],
}
