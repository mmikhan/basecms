import type { Payload } from 'payload'
import { fetchFileByURL } from './fetch'

export const media = async ({ payload }: { payload: Payload }) => {
  payload.logger.info('Creating media...')

  const [shoesShop] = await Promise.all([
    fetchFileByURL(
      'https://ecommerce.mandala.sh/api/media/file/shoes-shop-hero-image-for-first-section-background%201.png',
    ),
  ])

  return await Promise.all([
    payload.create({
      collection: 'media',
      data: {
        alt: 'Shoes shop hero image for first section background',
      },
      file: shoesShop,
    }),
  ])
}
