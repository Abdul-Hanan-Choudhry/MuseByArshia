import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  const body = await req.json()

  if (body.isActive) {
    await prisma.saleBanner.updateMany({
      where: { isActive: true, id: { not: params.id } },
      data: { isActive: false },
    })
  }

  const banner = await prisma.saleBanner.update({
    where: { id: params.id },
    data: {
      message: body.message,
      isActive: body.isActive,
      startDate: body.startDate ? new Date(body.startDate) : null,
      endDate: body.endDate ? new Date(body.endDate) : null,
      linkUrl: body.linkUrl ?? null,
      linkText: body.linkText ?? null,
    },
  })

  return NextResponse.json(banner)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  await prisma.saleBanner.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
