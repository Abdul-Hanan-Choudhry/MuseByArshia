export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'
import { generateSlug } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const featured = searchParams.get('featured')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = parseInt(searchParams.get('limit') ?? '12')
  const size = searchParams.get('size')

  const where: Record<string, unknown> = {
    isVisible: true,
    ...(category && { category: { slug: category } }),
    ...(featured === 'true' && { isFeatured: true }),
    ...(size && { size: { contains: size } }),
    ...((minPrice || maxPrice) && {
      price: {
        ...(minPrice && { gte: parseInt(minPrice) }),
        ...(maxPrice && { lte: parseInt(maxPrice) }),
      },
    }),
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: { select: { name: true, slug: true } } },
      orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({ where }),
  ])

  return NextResponse.json({
    products,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  })
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  const body = await req.json()
  const slug = body.slug || generateSlug(body.title)

  const product = await prisma.product.create({
    data: {
      title: body.title,
      slug,
      description: body.description,
      price: body.price,
      salePrice: body.salePrice ?? null,
      images: body.images ?? [],
      size: body.size,
      medium: body.medium,
      year: body.year ?? null,
      isFeatured: body.isFeatured ?? false,
      isVisible: body.isVisible ?? true,
      sortOrder: body.sortOrder ?? 0,
      categoryId: body.categoryId,
    },
    include: { category: { select: { name: true, slug: true } } },
  })

  return NextResponse.json(product, { status: 201 })
}
