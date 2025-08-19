import { postgresAdapter } from '@payloadcms/db-postgres'
import { defaultLexical } from './fields/defaultLexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

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
  ],
  collections: [Pages, Users, Media],
  editor: defaultLexical,
  globals: [General],
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
})
