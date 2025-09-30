import type { Page } from '@/payload-types'
import type { Payload } from 'payload'

export const samplePage = async ({ payload }: { payload: Payload }) => {
  payload.logger.info('Creating sample page...')

  const data: Omit<Page, 'id' | 'updatedAt' | 'createdAt' | 'publishedAt'> = {
    title: 'Sample',
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
                    text: 'A sample page',
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
                    text: 'A sample page that comes with the core CMS',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
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
        blockName: null,
        links: [],
        blockType: 'lowImpactHero',
      },
    ],
    meta: {
      title: null,
      image: null,
      description: null,
    },
    slug: 'sample',
    slugLock: true,
    _status: 'published',
  }

  try {
    await payload.create({
      collection: 'pages',
      data,
      locale: 'en',
    })
  } catch (error) {
    payload.logger.error('🌱 Error creating sample page:', error)

    throw error
  }
}
