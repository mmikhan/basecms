import type { Media, Page } from '@/payload-types'
import type { Payload } from 'payload'

export const homepage = async ({ payload, media }: { payload: Payload; media: Media }) => {
  payload.logger.info('Creating homepage...')

  const homepageDoc: Omit<Page, 'id' | 'updatedAt' | 'createdAt' | 'publishedAt'> = {
    title: 'Home',
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
            direction: 'ltr',
          },
        },
        media,
        blockName: null,
        links: [
          {
            link: {
              type: 'custom',
              newTab: true,
              url: 'https://base-cms.com',
              label: 'Learn more',
              appearance: 'default',
            },
          },
        ],
        blockType: 'highImpactHero',
      },
    ],
    meta: {
      title: null,
      image: null,
      description: null,
    },
    slug: 'home',
    slugLock: true,
    _status: 'published',
  }

  try {
    const homepageCreated = await payload.create({
      collection: 'pages',
      data: homepageDoc,
    })

    payload.logger.info(`Created homepage with ID: ${homepageCreated.id}`)
  } catch (error) {
    payload.logger.error('Error creating homepage:', error)

    throw error
  }
}
