import type { Dashboard, Page } from '@/payload-types'
import type { RequiredDataFromCollectionSlug } from 'payload'

type DashboardArgs = {
  accountPage: Dashboard
  logoutRedirect: Page
}

export const dashboard: (args: DashboardArgs) => RequiredDataFromCollectionSlug<'dashboard'> = ({
  accountPage,
  logoutRedirect,
}) => {
  return {
    _order: 'a1',
    title: 'Dashboard',
    layout: [
      {
        richText: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                tag: 'h1',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    mode: 'normal',
                    text: 'Dashboard',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: null,
              },
            ],
            direction: null,
          },
        },
        blockName: null,
        links: [
          {
            link: {
              type: 'reference',
              newTab: null,
              reference: {
                relationTo: 'dashboard',
                value: accountPage,
              },
              url: null,
              label: 'Account',
              appearance: 'default',
            },
          },
        ],
        blockType: 'lowImpactHero',
      },
      {
        blockName: null,
        blockType: 'logoutBlock',
        redirect: {
          type: 'reference',
          newTab: true,
          reference: {
            relationTo: 'pages',
            value: logoutRedirect,
          },
          url: null,
          label: 'Logout',
          appearance: 'destructive',
        },
      },
    ],
    slug: 'dashboard',
    _status: 'published',
  }
}
