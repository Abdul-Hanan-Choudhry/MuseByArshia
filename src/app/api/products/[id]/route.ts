export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: {
      OR: [{ id: params.id }, { slug: params.id }],
      isVisible: true,
    },
    include: { category: { select: { name: true, slug: true } } },
  })

  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(product)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  const body = await req.json()

  const product = await prisma.product.update({
    where: { id: params.id },
    data: {
      title: body.title,
      slug: body.slug,
      description: body.description,
      price: body.price,
      salePrice: body.salePrice ?? null,
      images: body.images,
      size: body.size,
      medium: body.medium,
      year: body.year ?? null,
      isFeatured: body.isFeatured,
      isVisible: body.isVisible,
      isSoldOut: body.isSoldOut,
      sortOrder: body.sortOrder,
      categoryId: body.categoryId,
    },
    include: { category: { select: { name: true, slug: true } } },
  })

  return NextResponse.json(product)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  await prisma.product.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
