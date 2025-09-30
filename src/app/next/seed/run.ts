import type { CollectionSlug, Payload } from 'payload'
import { samplePage } from './pages/sample'
import { media } from './media'

export const seed = async ({ req }: { req: { payload: Payload } }) => {
  if (!process.env.PAYLOAD_SECRET)
    throw new Error('PAYLOAD_SECRET environment variable is required')

  if (!process.env.DATABASE_URI) throw new Error('DATABASE_URI environment variable is required')

  const payload = req.payload

  payload.logger.info('🌱 Starting database seeding...')

  try {
    payload.logger.info(`— Clearing collections and globals...`)

    const collections = Object.keys(payload.collections) as CollectionSlug[]

    payload.logger.info(`Collections found: ${collections.join(', ')}`)

    // Clear collections (with overrideAccess for seeding)
    await Promise.all(
      collections.map(async (collection) => {
        try {
          payload.logger.info(`Clearing collection: ${collection}`)

          await payload.db.deleteMany({
            collection,
            req: { ...req },
            where: {},
          })

          payload.logger.info(`Successfully cleared collection: ${collection}`)
        } catch (error) {
          payload.logger.error(`Error clearing collection ${collection}:`, error)

          throw error
        }
      }),
    )

    payload.logger.info('— Creating seed data...')
    await seedPages({ payload })

    payload.logger.info('🌱 Seeding completed successfully')
  } catch (error) {
    payload.logger.error('🌱 Error seeding database:', error)

    throw error
  }
}

export const seedPages = async ({ payload }: { payload: Payload }) => {
  const [shoesShop] = await media({ payload })

  await samplePage({ payload, media: shoesShop })
}
