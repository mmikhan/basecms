import type { CollectionSlug, GlobalSlug, PayloadRequest } from 'payload'
import { samplePage } from './pages/sample'
import { media } from './media'
import { home } from './pages/home'
import { nav } from './nav'
import { Footer, Header } from '@/payload-types'
import { footer } from './footer'
import { accountPage } from './pages/account'
import { dashboard } from './pages/dashboard'
import { forgotPasswordPage } from './pages/forgotPassword'
import type { Route } from 'next'
import { registerPage } from './pages/register'
import { loginPage } from './pages/login'
import { carCategory } from './categories/car'
import { animalCategory } from './categories/animal'
import { helloWorldPost } from './posts/helloWorld'
import { toyotaIsTheLeaderPost } from './posts/toyota-is-the-leader'

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

  const [shoesShop, bigBuckBunny, baseCMSLogo, imagePost1, imagePost2] = await media({ payload })

  const [homepage, samplePageDoc, admin, user] = await Promise.all([
    payload.create({
      collection: 'pages',
      data: home({ heroMedia: bigBuckBunny, registerPage: '/register' as Route }),
      req,
      depth: 0,
    }),

    payload.create({
      collection: 'pages',
      data: samplePage({ contentMedia: shoesShop }),
      req,
      depth: 0,
    }),

    payload.create({
      collection: 'users',
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        roles: 'admin',
      },
      req,
      depth: 0,
    }),

    payload.create({
      collection: 'users',
      data: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password',
        roles: 'user',
      },
      req,
      depth: 0,
    }),

    payload.create({
      collection: 'customers',
      data: {
        name: 'Seed Customer',
        email: 'seed@resend.dev',
        password: 'password',
        _verified: true,
      },
      req,
      depth: 0,
    }),
  ])

  const accountPageDoc = await payload.create({
    collection: 'dashboard',
    data: accountPage,
    req,
    depth: 0,
  })

  const dashboardDoc = await payload.create({
    collection: 'dashboard',
    data: dashboard({ accountPage: accountPageDoc, logoutRedirect: homepage }),
    req,
    depth: 0,
  })

  const forgotPasswordPageDoc = await payload.create({
    collection: 'pages',
    data: forgotPasswordPage({ loginPage: '/login' as Route }),
    req,
    depth: 0,
  })

  const registerPageDoc = await payload.create({
    collection: 'pages',
    data: registerPage({ loginPage: '/login' as Route }),
    req,
    depth: 0,
  })

  const loginPageDoc = await payload.create({
    collection: 'pages',
    data: loginPage({
      registerPage: registerPageDoc,
      forgotPasswordPage: forgotPasswordPageDoc,
      redirectPage: dashboardDoc,
    }),
    req,
    depth: 0,
  })

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: nav({
        logo: baseCMSLogo,
        homepage,
        samplePage: samplePageDoc,
        loginPage: loginPageDoc,
      }),
      req,
      depth: 0,
    }),

    payload.updateGlobal({
      slug: 'footer',
      data: footer({ logo: baseCMSLogo, homepage, samplePage: samplePageDoc }),
      req,
      depth: 0,
    }),
  ])

  const carCategoryDoc = await payload.create({
    collection: 'categories',
    data: carCategory({}),
    req,
    depth: 0,
  })

  const animalCategoryDoc = await payload.create({
    collection: 'categories',
    data: animalCategory({ parent: carCategoryDoc }),
    req,
    depth: 0,
  })

  await payload.create({
    collection: 'posts',
    data: helloWorldPost({ heroImage: imagePost1, categories: [carCategoryDoc], author: admin }),
    req,
    depth: 0,
  })

  await payload.create({
    collection: 'posts',
    data: toyotaIsTheLeaderPost({
      heroImage: imagePost2,
      categories: [animalCategoryDoc],
      author: user,
    }),
    req,
    depth: 0,
  })

  payload.logger.info('🌱 Seeding completed successfully')
}
