import type { Header, Media, Page } from '@/payload-types'

type NavArgs = {
  logo: Media
  homepage: Page
  samplePage: Page
  loginPage: Page
}

export const nav: (
  args: NavArgs,
) => Omit<Header, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'sizes'> = ({
  logo,
  homepage,
  samplePage,
  loginPage,
}) => {
  return {
    layout: [
      {
        media: logo,
        blockName: null,
        links: [
          {
            link: {
              type: 'reference',
              newTab: null,
              reference: {
                relationTo: 'pages',
                value: homepage,
              },
              url: null,
              label: 'Home',
              appearance: 'link',
            },
          },
          {
            link: {
              type: 'reference',
              newTab: null,
              reference: {
                relationTo: 'pages',
                value: samplePage,
              },
              url: null,
              label: 'Sample',
              appearance: 'link',
            },
          },
          {
            link: {
              type: 'custom',
              newTab: null,
              url: '/posts',
              label: 'Posts',
              appearance: 'link',
            },
          },
          {
            link: {
              type: 'reference',
              newTab: null,
              reference: {
                relationTo: 'pages',
                value: loginPage,
              },
              url: null,
              label: 'Login',
              appearance: 'default',
            },
          },
        ],
        blockType: 'nav',
      },
    ],
    globalType: 'header',
  }
}
