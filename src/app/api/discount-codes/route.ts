import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export async function GET() {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  const codes = await prisma.discountCode.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(codes)
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  const body = await req.json()

  const code = await prisma.discountCode.create({
    data: {
      code: body.code.toUpperCase(),
      type: body.type,
      value: body.value,
      minimumOrder: body.minimumOrder ?? null,
      maxUses: body.maxUses ?? null,
      isActive: body.isActive ?? true,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
    },
  })

  return NextResponse.json(code, { status: 201 })
}
