import type { CollectionSlug, GlobalSlug, PayloadRequest } from 'payload'
import { samplePage } from './pages/sample'
import { media } from './media'
import { home } from './pages/home'
import { nav } from './nav'
import { Footer, Header } from '@/payload-types'

export const seed = async ({ req }: { req: PayloadRequest }) => {
  const payload = req.payload

  payload.logger.info('🌱 Starting database seeding...')

  payload.logger.info(`— Clearing collections and globals...`)

  const collections = Object.keys(payload.collections) as CollectionSlug[]
  const globals: GlobalSlug[] = ['header', 'footer']

  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          layout: [{ media: {}, links: {} }],
        } as Header | Footer,
        req,
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  payload.logger.info('— Creating seed data...')

  const [shoesShop, bigBuckBunny, baseCMSLogo] = await media({ payload })

  const [homepage, samplePageDoc] = await Promise.all([
    payload.create({
      collection: 'pages',
      data: home({ heroMedia: bigBuckBunny }),
      req,
      depth: 0,
    }),

    payload.create({
      collection: 'pages',
      data: samplePage({ contentMedia: shoesShop }),
      req,
      depth: 0,
    }),
  ])

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: nav({ logo: baseCMSLogo, homepage, samplePage: samplePageDoc }),
      req,
      depth: 0,
    }),
  ])

  payload.logger.info('🌱 Seeding completed successfully')
}
