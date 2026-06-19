import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const normalised = email.trim().toLowerCase()

  try {
    await prisma.subscriber.create({ data: { email: normalised } })
  } catch {
    return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
  }

  return NextResponse.json({ success: true })
}
