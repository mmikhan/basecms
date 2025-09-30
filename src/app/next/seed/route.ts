import { createLocalReq, getPayload } from 'payload'
import config from '@/payload.config'
import { headers } from 'next/headers'
import { seed } from './run'
import { NextResponse } from 'next/server'
import { isAdmin, isAuth } from '@/actions/auth'

export async function POST(): Promise<NextResponse> {
  const { user } = await isAuth(await headers())

  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const admin = await isAdmin(await headers())

  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  try {
    const payload = await getPayload({ config })

    const payloadReq = await createLocalReq({ user: user ?? undefined }, payload)

    await seed({ req: payloadReq })

    return NextResponse.json({ message: 'Seed data created' }, { status: 200 })
  } catch (e) {
    return NextResponse.json(
      { message: `Error: ${e instanceof Error ? e.message : 'Unknown error'}` },
      {
        status: 500,
      },
    )
  }
}
