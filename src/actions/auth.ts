'use server'

import { cache } from 'react'
import { headers } from 'next/headers'
import config from '@payload-config'
import { CollectionSlug, getPayload, PayloadRequest } from 'payload'
import * as auth from '@payloadcms/next/auth'
import { Customer } from '@/payload-types'

export const isAuth = cache(async () => {
  const payload = await getPayload({ config })

  return await payload.auth({ headers: await headers() })
})

export const login = async ({
  email,
  password,
  collection = 'customers',
}: {
  email: string
  password: string
  collection?: CollectionSlug
}) => {
  try {
    return await auth.login({
      collection,
      config,
      email,
      password,
    })
  } catch (error) {
    throw new Error(`${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function logout() {
  try {
    return await auth.logout({ allSessions: true, config })
  } catch (error) {
    throw new Error(`Logout failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function refresh() {
  try {
    return await auth.refresh({
      config,
    })
  } catch (error) {
    throw new Error(`Refresh failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function register({
  name,
  email,
  password,
  collection = 'customers',
}: Pick<Customer, 'name' | 'email' | 'password'> & {
  collection?: CollectionSlug
}) {
  try {
    const payload = await getPayload({ config })
    const req = { headers: await headers() } as PayloadRequest

    return await payload.create({
      collection,
      req,
      data: {
        name,
        email,
        password,
      },
    })
  } catch (error) {
    throw new Error(`${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
