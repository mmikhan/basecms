import type { Footer, Media, Page } from '@/payload-types'

type FooterArgs = {
  logo: Media
  homepage: Page
  samplePage: Page
}

export const footer: (
  args: FooterArgs,
) => Omit<Footer, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'sizes'> = ({
  logo,
  homepage,
  samplePage,
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
        ],
        blockType: 'footerBlock',
      },
    ],
    globalType: 'footer',
  }
}
