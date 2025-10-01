import type { Dashboard, Page } from '@/payload-types'
import type { RequiredDataFromCollectionSlug } from 'payload'

type LoginPageArgs = {
  registerPage: Page
  forgotPasswordPage: Page
  redirectPage: Dashboard
}

export const loginPage: (args: LoginPageArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  registerPage,
  forgotPasswordPage,
  redirectPage,
}) => {
  return {
    title: 'Login',
    layout: [
      {
        blockName: null,
        blockType: 'loginBlock',
        register: {
          type: 'reference',
          newTab: null,
          reference: {
            relationTo: 'pages',
            value: registerPage,
          },
          url: null,
          label: 'Register',
        },
        forgotPassword: {
          type: 'reference',
          newTab: null,
          reference: {
            relationTo: 'pages',
            value: forgotPasswordPage,
          },
          url: null,
          label: 'Forgot password',
        },
        redirect: {
          type: 'reference',
          newTab: null,
          reference: {
            relationTo: 'dashboard',
            value: redirectPage,
          },
          url: null,
        },
      },
    ],
    meta: {
      title: null,
      image: null,
      description: null,
    },
    slug: 'login',
    _status: 'published',
  }
}
