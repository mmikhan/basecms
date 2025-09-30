import type { Page } from '@/payload-types'
import type { Payload } from 'payload'
import { fetchFileByURL } from '../fetch'

export const samplePage = async ({ payload }: { payload: Payload }) => {
  payload.logger.info('Creating sample page...')

  const [image] = await Promise.all([
    fetchFileByURL(
      'https://ecommerce.mandala.sh/api/media/file/shoes-shop-hero-image-for-first-section-background%201.png',
    ),
  ])

  const [imageDoc] = await Promise.all([
    payload.create({
      collection: 'media',
      data: {
        alt: 'Shoes shop hero image for first section background',
      },
      file: image,
    }),
  ])

  payload.logger.info(`Created media with ID: ${imageDoc.id}`)

  const pageDoc: Omit<Page, 'id' | 'updatedAt' | 'createdAt' | 'publishedAt'> = {
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
      {
        media: imageDoc.id,
        blockName: null,
        blockType: 'mediaBlock',
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
    const createdPage = await payload.create({
      collection: 'pages',
      data: pageDoc,
      locale: 'en',
    })

    payload.logger.info(`Created page with ID: ${createdPage.id}`)
  } catch (error) {
    payload.logger.error('🌱 Error creating sample page:', error)

    throw error
  }
}
