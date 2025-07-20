import { getPayload } from 'payload'
import config from '@payload-config'

const seed = async () => {
  const payload = await getPayload({ config })

  await payload.create({
    collection: 'users',
    data: {
      email: 'john@example.com',
      password: 'password',
      firstName: 'John',
      lastName: 'Doe',
      roles: 'admin',
    },
  })

  await payload.create({
    collection: 'users',
    data: {
      email: 'jane@example.com',
      password: 'password',
      firstName: 'Jane',
      lastName: 'Doe',
      roles: 'user',
    },
  })
}

await seed().finally(() => {
  console.log('Seeding completed.')
  process.exit(0)
})
