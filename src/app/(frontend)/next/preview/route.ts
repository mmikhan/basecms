import { draftMode } from 'next/headers'
import { NextRequest } from 'next/server'
import { isAuth } from '@/actions/auth'
import { redirect } from '@/i18n/navigation'

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url)
  const { path, locale, previewSecret } = Object.fromEntries(searchParams.entries())

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

  return redirect({ href: path, locale })
}
