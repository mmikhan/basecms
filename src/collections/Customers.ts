import { admin } from '@/access/admin'
import { adminOrSelf } from '@/access/adminOrSelf'
import { anyone } from '@/access/anyone'
import { getServerSideURL } from '@/lib/getURL'
import { Customer } from '@/payload-types'
import { CollectionConfig, type PayloadRequest } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: anyone,
    read: adminOrSelf,
    update: adminOrSelf,
    delete: admin,
  },
  auth: {
    tokenExpiration: 7200,
    maxLoginAttempts: 5,
    lockTime: 600 * 1000,
    verify: {
      generateEmailHTML: ({
        token,
      }: {
        req: PayloadRequest
        token: Customer['_verificationToken']
        user: Customer
      }) => {
        return `A new account has just been created for you to access. Please click on the following link or paste the URL below into your browser to verify your email: <a href="${getServerSideURL()}/next/verify?token=${token}">${getServerSideURL()}/next/verify?token=${token}</a>. After verifying your email, you will be able to log in successfully.`
      },
    },
  },
  labels: {
    plural: 'Customers',
    singular: 'Customer',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
