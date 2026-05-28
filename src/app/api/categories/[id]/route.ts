import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  const body = await req.json()

  const category = await prisma.category.update({
    where: { id: params.id },
    data: {
      name: body.name,
      slug: body.slug,
      description: body.description ?? null,
      coverImage: body.coverImage ?? null,
      sortOrder: body.sortOrder,
      isVisible: body.isVisible,
    },
  })

  return NextResponse.json(category)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  await prisma.category.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
