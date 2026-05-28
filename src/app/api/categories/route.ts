import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'
import { generateSlug } from '@/lib/utils'

export async function GET() {
  const categories = await prisma.category.findMany({
    where: { isVisible: true },
    include: { _count: { select: { products: true } } },
    orderBy: { sortOrder: 'asc' },
  })
  return NextResponse.json(categories)
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  const body = await req.json()
  const slug = body.slug || generateSlug(body.name)

  const category = await prisma.category.create({
    data: {
      name: body.name,
      slug,
      description: body.description ?? null,
      coverImage: body.coverImage ?? null,
      sortOrder: body.sortOrder ?? 0,
    },
  })

  return NextResponse.json(category, { status: 201 })
}
