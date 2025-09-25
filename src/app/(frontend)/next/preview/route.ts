import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import type { Route } from 'next'
import { isAuth } from '@/actions/auth'

export async function GET(
  req: {
    cookies: {
      get: (name: string) => {
        value: string
      }
    }
  } & NextRequest,
): Promise<Response> {
  const { searchParams } = new URL(req.url)
  const { path, previewSecret } = Object.fromEntries(searchParams.entries())

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  if (!path) {
    return new Response('Insufficient search params', { status: 404 })
  }

  const draft = await draftMode()
  const { user } = await isAuth(req.headers)

  if (!user) {
    draft.disable()
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  draft.enable()

  redirect(path as Route)
}
