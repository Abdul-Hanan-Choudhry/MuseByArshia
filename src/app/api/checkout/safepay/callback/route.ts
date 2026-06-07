import { NextRequest, NextResponse } from 'next/server'
import { safepay } from '@/lib/safepay'
import { prisma } from '@/lib/prisma'
import { sendOrderConfirmationEmail } from '@/lib/email'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const tracker = searchParams.get('tracker') ?? ''
  const sig = searchParams.get('sig') ?? ''
  const orderId = searchParams.get('order_id') ?? ''

  const baseUrl = process.env.NEXTAUTH_URL!

  if (!tracker || !sig) {
    return NextResponse.redirect(`${baseUrl}/checkout?error=invalid_callback`)
  }

  const valid = safepay.verify.signature({ body: { tracker, sig } })
  if (!valid) {
    return NextResponse.redirect(`${baseUrl}/checkout?error=payment_failed`)
  }

  try {
    let order = orderId
      ? await prisma.order.findUnique({
          where: { orderNumber: orderId },
          include: { items: { include: { product: { select: { title: true } } } } },
        })
      : null

    if (!order) {
      order = await prisma.order.findFirst({
        where: { safepayToken: tracker },
        include: { items: { include: { product: { select: { title: true } } } } },
      })
    }

    if (!order) {
      return NextResponse.redirect(`${baseUrl}/checkout?error=order_not_found`)
    }

    if (order.paymentStatus !== 'PENDING') {
      return NextResponse.redirect(`${baseUrl}/checkout/success?order=${order.orderNumber}`)
    }

    const updated = await prisma.order.update({
      where: { id: order.id },
      data: { paymentStatus: 'PAID', status: 'CONFIRMED' },
      include: { items: { include: { product: { select: { title: true } } } } },
    })

    try {
      await sendOrderConfirmationEmail(updated)
    } catch (err) {
      console.error('[safepay callback] email failed:', err)
    }

    return NextResponse.redirect(`${baseUrl}/checkout/success?order=${order.orderNumber}`)
  } catch (err) {
    console.error('[safepay callback] error:', err)
    return NextResponse.redirect(`${baseUrl}/checkout?error=payment_failed`)
  }
}
