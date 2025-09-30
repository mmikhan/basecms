import { postgresAdapter } from '@payloadcms/db-postgres'
import { defaultLexical } from './fields/defaultLexical'
import path from 'path'
import { buildConfig, type LocalizationConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { resendAdapter } from '@payloadcms/email-resend'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { General } from './globals/General'
import { plugins } from './plugins'
import { CallToAction } from './blocks/CallToAction/config'
import { HighImpactHero } from './blocks/heros/HighImpact/config'
import { MediumImpactHero } from './blocks/heros/MediumImpact/config'
import { getServerSideURL } from './lib/getURL'
import { LowImpactHero } from './blocks/heros/LowImpact/config'
import { Content } from './blocks/Content/config'
import { MediaBlock } from './blocks/MediaBlock/config'
import { Code } from './blocks/Code/config'
import { Banner } from './blocks/Banner/config'
import { Header } from './globals/Header'
import { Nav } from './blocks/Nav/config'
import { FooterBlock } from './blocks/Footer/config'
import { Footer } from './globals/Footer'
import { Categories } from './collections/Categories'
import { Posts } from './collections/Posts'
import { Archive } from './blocks/ArchiveBlock/config'
import { FormBlock } from './blocks/Form/config'
import { PricingTable } from './blocks/PricingTable/config'
import { Orders } from './collections/Orders'
import { BillingPortal } from './blocks/BillingPortal/config'
import { Customers } from './collections/Customers'
import { LoginBlock } from './blocks/Login/config'
import { LogoutBlock } from './blocks/Logout/config'
import { RegisterBlock } from './blocks/Register/config'
import { ForgotPasswordBlock } from './blocks/ForgotPassword/config'
import { ResetPasswordBlock } from './blocks/ResetPassword/config'
import { AccountName } from './blocks/Account/Name/config'
import { AccountPassword } from './blocks/Account/Password/config'
import { Dashboard } from './collections/Dashboard'
import { localization } from './i18n/localization'
import { Accordion } from './blocks/Accordion/config'
import { Carousel } from './blocks/Carousel/config'
import { en } from '@payloadcms/translations/languages/en'
import { nl } from '@payloadcms/translations/languages/nl'
import { bnBd } from '@payloadcms/translations/languages/bnBd'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    autoLogin:
      process.env.NODE_ENV === 'development'
        ? { email: 'john@example.com', password: 'password', prefillOnly: true }
        : false,
    components: {
      beforeDashboard: ['@/components/BeforeDashboard'],
      graphics: {
        Icon: '@/components/icon',
        Logo: '@/components/logo',
      },
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  blocks: [
    CallToAction,
    HighImpactHero,
    MediumImpactHero,
    LowImpactHero,
    Content,
    MediaBlock,
    Code,
    Banner,
    Nav,
    FooterBlock,
    Archive,
    FormBlock,
    PricingTable,
    BillingPortal,
    LoginBlock,
    LogoutBlock,
    RegisterBlock,
    ForgotPasswordBlock,
    ResetPasswordBlock,
    AccountName,
    AccountPassword,
    Accordion,
    Carousel,
  ],
  collections: [Pages, Users, Media, Categories, Posts, Orders, Customers, Dashboard],
  editor: defaultLexical,
  globals: [General, Header, Footer],
  secret: process.env.PAYLOAD_SECRET || '',
  cors: [getServerSideURL()].filter(Boolean),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [...plugins],
  email: resendAdapter({
    defaultFromAddress: 'dev@resend.dev',
    defaultFromName: 'AdMarket',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  localization: localization as LocalizationConfig,
  i18n: {
    supportedLanguages: { en, nl, 'bn-BD': bnBd },
    fallbackLanguage: 'en',
  },
})
