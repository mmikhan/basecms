import { Route } from 'next'
import type { RequiredDataFromCollectionSlug } from 'payload'

type RegisterPageArgs = {
  loginPage: Route
}

export const registerPage: (args: RegisterPageArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  loginPage,
}) => {
  return {
    title: 'Register',
    layout: [
      {
        blockName: null,
        blockType: 'registerBlock',
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
    slug: 'register',
    _status: 'published',
  }
}
