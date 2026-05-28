import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { code, cartTotal } = await req.json()

  const discount = await prisma.discountCode.findUnique({
    where: { code: code.toUpperCase() },
  })

  if (!discount) {
    return NextResponse.json({ error: 'Invalid discount code' }, { status: 400 })
  }

  const now = new Date()

  if (!discount.isActive) {
    return NextResponse.json({ error: 'This code is no longer active' }, { status: 400 })
  }

  if (discount.expiresAt && discount.expiresAt < now) {
    return NextResponse.json({ error: 'This code has expired' }, { status: 400 })
  }

  if (discount.maxUses && discount.usedCount >= discount.maxUses) {
    return NextResponse.json(
      { error: 'This code has reached its usage limit' },
      { status: 400 }
    )
  }

  if (discount.minimumOrder && cartTotal < discount.minimumOrder) {
    return NextResponse.json(
      { error: `Minimum order of Rs. ${discount.minimumOrder.toLocaleString()} required` },
      { status: 400 }
    )
  }

  let discountAmount = 0
  if (discount.type === 'PERCENTAGE') {
    discountAmount = Math.round(cartTotal * (discount.value / 100))
  } else {
    discountAmount = Math.min(discount.value, cartTotal)
  }

  return NextResponse.json({
    valid: true,
    id: discount.id,
    code: discount.code,
    type: discount.type,
    value: discount.value,
    discountAmount,
  })
}
