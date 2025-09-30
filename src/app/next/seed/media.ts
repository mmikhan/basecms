import type { Payload } from 'payload'
import { fetchFileByURL } from './fetch'

export const media = async ({ payload }: { payload: Payload }) => {
  payload.logger.info('Creating media...')

  const [shoesShop, bigBuckBunny] = await Promise.all([
    fetchFileByURL(
      'https://ecommerce.mandala.sh/api/media/file/shoes-shop-hero-image-for-first-section-background%201.png',
    ),
    fetchFileByURL(
      'https://github.com/bower-media-samples/big-buck-bunny-1080p-30s/raw/refs/heads/master/video.mp4',
    ),
  ])

  return await Promise.all([
    payload.create({
      collection: 'media',
      data: {
        alt: 'Shoes shop hero image for first section background',
        isPrivate: false,
        requiresSignedURL: false,
      },
      file: shoesShop,
    }),
    payload.create({
      collection: 'media',
      data: {
        alt: 'Big Buck Bunny',
        isPrivate: false,
        requiresSignedURL: false,
      },
      file: bigBuckBunny,
    }),
  ])
}
