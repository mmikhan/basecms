import type { CollectionSlug, PayloadRequest } from 'payload'
import { samplePage } from './pages/sample'
import { media } from './media'
import { home } from './pages/home'

export const seed = async ({ req }: { req: PayloadRequest }) => {
  const payload = req.payload

  payload.logger.info('🌱 Starting database seeding...')

  payload.logger.info(`— Clearing collections and globals...`)

  const collections = Object.keys(payload.collections) as CollectionSlug[]

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  payload.logger.info('— Creating seed data...')

  const [shoesShop, bigBuckBunny] = await media({ payload })

  await Promise.all([
    payload.create({
      collection: 'pages',
      data: home({ heroMedia: bigBuckBunny }),
      depth: 0,
    }),
  ])

  await Promise.all([
    payload.create({
      collection: 'pages',
      data: samplePage({ contentMedia: shoesShop }),
      depth: 0,
    }),
  ])

  payload.logger.info('🌱 Seeding completed successfully')
}
