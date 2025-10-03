import type { Payload } from 'payload'
import { fetchFileByURL } from './fetch'

export const media = async ({ payload }: { payload: Payload }) => {
  payload.logger.info('Creating media...')

  const [shoesShop, bigBuckBunny, baseCMSLogo, imagePost1, imagePost2] = await Promise.all([
    fetchFileByURL(
      'https://ecommerce.mandala.sh/api/media/file/shoes-shop-hero-image-for-first-section-background%201.png',
    ),
    fetchFileByURL(
      'https://github.com/bower-media-samples/big-buck-bunny-1080p-30s/raw/refs/heads/master/video.mp4',
    ),
    fetchFileByURL('https://0hq06sm3rm.ufs.sh/f/bsPnLPBQxLjJLTlQD9RRm0o2zsBHjGiJAlI65FeMgQydPLtD'),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp',
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
    payload.create({
      collection: 'media',
      data: {
        alt: 'Base CMS Logo',
        isPrivate: false,
        requiresSignedURL: false,
      },
      file: baseCMSLogo,
    }),
    payload.create({
      collection: 'media',
      data: {
        alt: 'Image Post 1',
        isPrivate: false,
        requiresSignedURL: false,
      },
      file: imagePost1,
    }),
    payload.create({
      collection: 'media',
      data: {
        alt: 'Image Post 2',
        isPrivate: false,
        requiresSignedURL: false,
      },
      file: imagePost2,
    }),
  ])
}
