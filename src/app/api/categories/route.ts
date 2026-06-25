import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'
import { generateSlug } from '@/lib/utils'

const DEFAULT_CATEGORIES = [
  { name: 'Portraits', slug: 'portraits', sortOrder: 1 },
  { name: 'Abstract', slug: 'abstract', sortOrder: 2 },
  { name: 'Landscape', slug: 'landscape', sortOrder: 3 },
  { name: 'Still Life', slug: 'still-life', sortOrder: 4 },
  { name: 'Limited Editions', slug: 'limited-editions', sortOrder: 5 },
]

export async function GET() {
  let categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { sortOrder: 'asc' },
  })

  if (categories.length === 0) {
    await Promise.all(
      DEFAULT_CATEGORIES.map((cat) =>
        prisma.category.upsert({
          where: { slug: cat.slug },
          update: {},
          create: { name: cat.name, slug: cat.slug, sortOrder: cat.sortOrder },
        })
      )
    )
    categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { sortOrder: 'asc' },
    })
  }

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
