import { NextResponse, type NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getServerSideURL } from '@/lib/getURL'

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url)
  const token = url.searchParams.get('token')

  if (!token) {
    return NextResponse.json({ message: 'Token is required' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config })

    await payload.verifyEmail({ collection: 'customers', token, req: request })

    const response = NextResponse.redirect(`${getServerSideURL()}/login`)
    response.cookies.set('verified', 'true', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1,
    })

    return response
  } catch (error) {
    return NextResponse.json(
      {
        message: `Error verifying email: ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 500 },
    )
  }
}
