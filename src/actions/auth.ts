'use server'

import { cache } from 'react'
import { headers as NextHeaders } from 'next/headers'
import config from '@payload-config'
import { getPayload, type PayloadRequest } from 'payload'
import * as auth from '@payloadcms/next/auth'
import type { Customer, User } from '@/payload-types'

export const isAuth = cache(async (headers?: Headers) => {
  const payload = await getPayload({ config })

  return await payload.auth({ headers: headers ?? (await NextHeaders()) })
})

export const isAdmin = cache(async (headers?: Headers) => {
  const { user } = await isAuth(headers)

  return user && user.collection === 'users' && (user as User).roles === 'admin'
})

export const login = async ({ email, password }: { email: string; password: string }) => {
  try {
    return await auth.login({
      collection: 'customers',
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
}: Pick<Customer, 'name' | 'email' | 'password'>) {
  try {
    const payload = await getPayload({ config })
    const req = { headers: await NextHeaders() } as PayloadRequest

    return await payload.create({
      collection: 'customers',
      req,
      data: {
        name,
        email,
        password,
      } as Customer,
    })
  } catch (error) {
    throw new Error(`${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function forgotPassword({
  email,
  disableEmail = false,
}: Pick<Customer, 'email'> & { disableEmail?: boolean }) {
  try {
    const payload = await getPayload({ config })
    const req = { headers: await NextHeaders() } as PayloadRequest

    return await payload.forgotPassword({
      collection: 'customers',
      req,
      data: {
        email,
      },
      disableEmail,
    })
  } catch (error) {
    throw new Error(`${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function resetPassword({
  password,
  resetPasswordToken,
}: Pick<Customer, 'password' | 'resetPasswordToken'>) {
  try {
    const payload = await getPayload({ config })
    const req = { headers: await NextHeaders() } as PayloadRequest

    return await payload.resetPassword({
      collection: 'customers',
      req,
      data: {
        token: resetPasswordToken ?? '',
        password: password ?? '',
      },
      overrideAccess: true,
    })
  } catch (error) {
    throw new Error(`${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function updatePassword({ email, password }: Pick<Customer, 'email' | 'password'>) {
  try {
    const payload = await getPayload({ config })
    const req = { headers: await NextHeaders() } as PayloadRequest

    const token = await payload.forgotPassword({
      collection: 'customers',
      req,
      data: { email },
      disableEmail: false,
    })

    return await resetPassword({
      password,
      resetPasswordToken: token,
    })
  } catch (error) {
    throw new Error(`${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function updateAccount({ id, name }: Pick<Customer, 'id' | 'name'>) {
  try {
    const payload = await getPayload({ config })
    const req = { headers: await NextHeaders() } as PayloadRequest

    return await payload.update({
      id,
      collection: 'customers',
      req,
      data: {
        name,
      },
    })
  } catch (error) {
    throw new Error(`${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
