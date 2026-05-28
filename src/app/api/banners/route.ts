import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export async function GET() {
  const now = new Date()

  const banner = await prisma.saleBanner.findFirst({
    where: {
      isActive: true,
      OR: [{ startDate: null }, { startDate: { lte: now } }],
      AND: [{ OR: [{ endDate: null }, { endDate: { gte: now } }] }],
    },
  })

  return NextResponse.json({ banner })
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  const body = await req.json()

  if (body.isActive) {
    await prisma.saleBanner.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    })
  }

  const banner = await prisma.saleBanner.create({
    data: {
      message: body.message,
      isActive: body.isActive ?? false,
      startDate: body.startDate ? new Date(body.startDate) : null,
      endDate: body.endDate ? new Date(body.endDate) : null,
      linkUrl: body.linkUrl ?? null,
      linkText: body.linkText ?? null,
    },
  })

  return NextResponse.json(banner, { status: 201 })
}
