import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  try {
    await prisma.subscriber.create({ data: { email } })
  } catch {
    return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
  }

  return NextResponse.json({ success: true })
}
