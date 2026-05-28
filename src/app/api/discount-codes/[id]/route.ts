import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  const body = await req.json()

  const code = await prisma.discountCode.update({
    where: { id: params.id },
    data: {
      code: body.code?.toUpperCase(),
      type: body.type,
      value: body.value,
      minimumOrder: body.minimumOrder ?? null,
      maxUses: body.maxUses ?? null,
      isActive: body.isActive,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
    },
  })

  return NextResponse.json(code)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  await prisma.discountCode.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
