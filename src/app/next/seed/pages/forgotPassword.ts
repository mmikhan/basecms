import { Route } from 'next'
import type { RequiredDataFromCollectionSlug } from 'payload'

type ForgotPasswordPageArgs = {
  loginPage: Route
}

export const forgotPasswordPage: (
  args: ForgotPasswordPageArgs,
) => RequiredDataFromCollectionSlug<'pages'> = ({ loginPage }) => {
  return {
    title: 'Forgot password',
    layout: [
      {
        blockName: null,
        blockType: 'forgotPasswordBlock',
        login: {
          type: 'custom',
          newTab: null,
          url: loginPage,
          label: 'Login',
        },
      },
    ],
    meta: {
      title: null,
      image: null,
      description: null,
    },
    slug: 'forgot-password',
    _status: 'published',
  }
}
