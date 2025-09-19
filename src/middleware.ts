import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuth } from './actions/auth'

export const config = {
  runtime: 'nodejs',
  matcher: '/dashboard/:path*',
}

export async function middleware(request: NextRequest) {
  const auth = await isAuth(request.headers)

  if (!auth.user) {
    const login = new URL('/login', request.url)
    login.searchParams.set('redirect', request.nextUrl.pathname)

    return NextResponse.redirect(login)
  }

  return NextResponse.next()
}
