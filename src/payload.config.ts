import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { General } from './globals/General'
import { plugins } from './plugins'

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
  },
  collections: [Pages, Users, Media],
  editor: lexicalEditor(),
  globals: [General],
  secret: process.env.PAYLOAD_SECRET || '',
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
