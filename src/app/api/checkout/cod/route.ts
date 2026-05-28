import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateOrderNumber, calculateShipping } from '@/lib/utils'
import { sendOrderConfirmationEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { items, customer, discountCodeId, discountAmount, paymentMethod } = body

  if (!items?.length || !customer) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const productIds = items.map((i: { productId: string }) => i.productId)
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, isVisible: true, isSoldOut: false },
  })

  if (products.length !== items.length) {
    return NextResponse.json({ error: 'One or more items are unavailable' }, { status: 400 })
  }

  const subtotal = products.reduce((sum, p) => sum + (p.salePrice ?? p.price), 0)
  const shippingCost = calculateShipping(customer.city, subtotal)
  const safeDiscount = Math.min(discountAmount ?? 0, subtotal)
  const total = subtotal - safeDiscount + shippingCost

  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      address: customer.address,
      city: customer.city,
      postalCode: customer.postalCode ?? null,
      subtotal,
      discountAmount: safeDiscount,
      shippingCost,
      total,
      paymentMethod: paymentMethod ?? 'COD',
      paymentStatus: 'PENDING',
      status: 'PENDING',
      discountCodeId: discountCodeId ?? null,
      items: {
        create: products.map((p) => ({
          productId: p.id,
          price: p.salePrice ?? p.price,
          quantity: 1,
        })),
      },
    },
    include: {
      items: { include: { product: { select: { title: true } } } },
    },
  })

  await prisma.product.updateMany({
    where: { id: { in: productIds } },
    data: { isSoldOut: true },
  })

  if (discountCodeId) {
    await prisma.discountCode.update({
      where: { id: discountCodeId },
      data: { usedCount: { increment: 1 } },
    })
  }

  try {
    await sendOrderConfirmationEmail(order)
  } catch (err) {
    console.error('[email] order confirmation failed:', err)
  }

  return NextResponse.json({ success: true, orderNumber: order.orderNumber })
}
