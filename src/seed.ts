import { getPayload } from 'payload'
import config from '@payload-config'

const seed = async () => {
  const payload = await getPayload({ config })

  await payload.create({
    collection: 'users',
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
      roles: 'admin',
    },
  })

  await payload.create({
    collection: 'users',
    data: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password',
      roles: 'user',
    },
  })
}

await seed().finally(() => {
  console.log('Seeding completed.')
  process.exit(0)
})
