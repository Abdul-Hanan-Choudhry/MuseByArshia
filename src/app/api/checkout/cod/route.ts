import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateOrderNumber, calculateShipping } from '@/lib/utils'
import { sendOrderConfirmationEmail } from '@/lib/email'

const ALLOWED_PAYMENT_METHODS = ['COD', 'JAZZCASH', 'EASYPAISA', 'BANK_TRANSFER', 'SADAPAY'] as const
type AllowedMethod = typeof ALLOWED_PAYMENT_METHODS[number]

export async function POST(req: NextRequest) {
  try {
  const body = await req.json()
  const { items, customer, discountCodeId, discountAmount, paymentMethod, paymentReference } = body

  if (!items?.length || !customer) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // --- Input validation ---
  const name = String(customer.name ?? '').trim()
  const email = String(customer.email ?? '').trim()
  const phone = String(customer.phone ?? '').trim()
  const address = String(customer.address ?? '').trim()
  const city = String(customer.city ?? '').trim()
  const postalCode = String(customer.postalCode ?? '').trim()

  if (!name || name.length > 100) return NextResponse.json({ error: 'Invalid name' }, { status: 400 })
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }
  if (!phone || phone.length > 30) return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 })
  if (!address || address.length > 500) return NextResponse.json({ error: 'Invalid address' }, { status: 400 })
  if (!city || city.length > 100) return NextResponse.json({ error: 'Invalid city' }, { status: 400 })
  if (postalCode.length > 20) return NextResponse.json({ error: 'Invalid postal code' }, { status: 400 })

  const method: AllowedMethod = ALLOWED_PAYMENT_METHODS.includes(paymentMethod)
    ? paymentMethod
    : 'COD'

  const ref = paymentReference ? String(paymentReference).trim().slice(0, 200) : null

  const productIds = items.map((i: { productId: string }) => i.productId)
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, isVisible: true, isSoldOut: false },
  })

  if (products.length !== items.length) {
    return NextResponse.json({ error: 'One or more items are unavailable' }, { status: 400 })
  }

  const subtotal = products.reduce((sum, p) => sum + (p.salePrice ?? p.price), 0)
  const shippingCost = calculateShipping(city, subtotal)
  const safeDiscount = Math.min(discountAmount ?? 0, subtotal)
  const total = subtotal - safeDiscount + shippingCost

  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      address,
      city,
      postalCode: postalCode || null,
      subtotal,
      discountAmount: safeDiscount,
      shippingCost,
      total,
      paymentMethod: method,
      paymentStatus: 'PENDING',
      status: 'PENDING',
      paymentReference: ref,
      discountCodeId: discountCodeId || null,
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
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[checkout/cod] unhandled error:', message)
    return NextResponse.json({ error: 'Order failed', detail: message }, { status: 500 })
  }
}
