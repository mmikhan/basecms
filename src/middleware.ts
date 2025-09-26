import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuth } from './actions/auth'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export const config = {
  runtime: 'nodejs',
  matcher: ['/((?!admin|api|trpc|next|_vercel|.*\\..*).*)'],
}

const handleI18nRouting = createMiddleware(routing)

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.includes('/dashboard')) {
    const auth = await isAuth(request.headers)

    if (!auth.user) {
      const pathSegments = request.nextUrl.pathname.split('/').filter(Boolean)
      const potentialLocale = pathSegments[0]
      const locale = routing.locales.includes(potentialLocale)
        ? potentialLocale
        : routing.defaultLocale

      const loginUrl = new URL(`/${locale}/login`, request.url)
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname)

      return NextResponse.redirect(loginUrl)
    }
  }

  return handleI18nRouting(request)
}
