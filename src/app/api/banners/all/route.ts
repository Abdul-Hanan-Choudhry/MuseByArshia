import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export async function GET() {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  const banners = await prisma.saleBanner.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(banners)
}
