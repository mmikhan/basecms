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
        req,
      }: {
        req: PayloadRequest
        token: Customer['_verificationToken']
        user: Customer
      }) => {
        return `A new account has just been created for you to access. Please click on the following link or paste the URL below into your browser to verify your email: <a href="${getServerSideURL()}/next/verify?token=${token}&locale=${req.locale}">${getServerSideURL()}/next/verify?token=${token}&locale=${req.locale}</a>. After verifying your email, you will be able to log in successfully.`
      },
    },
    forgotPassword: {
      generateEmailHTML: (args) => {
        const token = args?.token ?? ''
        const locale = args?.req?.locale ?? 'en'

        return `We received a request to reset the password for your account. Please click on the following link or paste the URL below into your browser to reset your password: <a href="${getServerSideURL()}/next/reset?token=${token}&locale=${locale}">${getServerSideURL()}/next/reset?token=${token}&locale=${locale}</a>. If you did not request this, please ignore this email and your password will remain unchanged.`
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
