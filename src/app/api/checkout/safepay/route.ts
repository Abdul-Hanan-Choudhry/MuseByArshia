import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateOrderNumber, calculateShipping } from '@/lib/utils'
import { safepay } from '@/lib/safepay'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, customer, discountCodeId, discountAmount } = body

    if (!items?.length || !customer?.name || !customer?.phone || !customer?.email || !customer?.address || !customer?.city) {
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
    const orderNumber = generateOrderNumber()

    const { token } = await safepay.payments.create({
      amount: total,
      currency: 'PKR',
    })

    const baseUrl = process.env.NEXTAUTH_URL!

    const checkoutUrl = safepay.checkout.create({
      token,
      orderId: orderNumber,
      cancelUrl: `${baseUrl}/checkout?cancelled=1`,
      redirectUrl: `${baseUrl}/api/checkout/safepay/callback`,
      source: 'custom',
      webhooks: true,
    })

    await prisma.order.create({
      data: {
        orderNumber,
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
        paymentMethod: 'CARD',
        paymentStatus: 'PENDING',
        status: 'PENDING',
        safepayToken: token,
        discountCodeId: discountCodeId ?? null,
        items: {
          create: products.map((p) => ({
            productId: p.id,
            price: p.salePrice ?? p.price,
            quantity: 1,
          })),
        },
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

    return NextResponse.json({ checkoutUrl })
  } catch (err) {
    console.error('[safepay] checkout init error:', err)
    return NextResponse.json({ error: 'Failed to initialize payment. Please try again.' }, { status: 500 })
  }
}
