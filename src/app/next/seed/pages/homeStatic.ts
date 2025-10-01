import type { RequiredDataFromCollectionSlug } from 'payload'

export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  title: 'Home Static',
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
                  text: 'Welcome to ',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
                {
                  mode: 'normal',
                  text: 'Base',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 2,
                  version: 1,
                },
                {
                  mode: 'normal',
                  text: ' CMS',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'A bare minimum, fast, block-based CMS built on top of Next.js and PayloadCMS',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
              textStyle: '',
              textFormat: 0,
            },
          ],
          direction: null,
        },
      },
      blockName: null,
      links: [
        {
          link: {
            type: 'custom',
            newTab: null,
            url: 'https://base-cms.com',
            label: 'Learn more',
            appearance: 'default',
          },
        },
        {
          link: {
            type: 'custom',
            newTab: null,
            url: '/register',
            label: 'Get Started',
            appearance: 'outline',
          },
        },
      ],
      blockType: 'lowImpactHero',
    },
  ],
  meta: {
    title: null,
    image: null,
    description: null,
  },
  slug: 'home-static',
  slugLock: true,
  _status: 'published',
}
