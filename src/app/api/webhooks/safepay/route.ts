import { NextRequest, NextResponse } from 'next/server'
import type { IncomingHttpHeaders } from 'http'
import { safepay } from '@/lib/safepay'
import { prisma } from '@/lib/prisma'
import { sendOrderConfirmationEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const signature = req.headers.get('x-sfpy-signature') ?? ''

  const valid = safepay.verify.webhook({
    body,
    headers: { 'x-sfpy-signature': signature } as IncomingHttpHeaders,
  })

  if (!valid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const notification = (body?.data as Record<string, unknown>)?.notification as Record<string, unknown> | undefined

  if (!notification) {
    return NextResponse.json({ received: true })
  }

  const state = notification.state as string | undefined
  const metadata = notification.metadata as Record<string, string> | undefined
  const orderId = metadata?.order_id

  if (state === 'PAID' && orderId) {
    try {
      const order = await prisma.order.findUnique({
        where: { orderNumber: orderId },
        include: { items: { include: { product: { select: { title: true } } } } },
      })

      if (order && order.paymentStatus === 'PENDING') {
        const updated = await prisma.order.update({
          where: { id: order.id },
          data: { paymentStatus: 'PAID', status: 'CONFIRMED' },
          include: { items: { include: { product: { select: { title: true } } } } },
        })

        try {
          await sendOrderConfirmationEmail(updated)
        } catch (err) {
          console.error('[safepay webhook] email failed:', err)
        }
      }
    } catch (err) {
      console.error('[safepay webhook] db error:', err)
    }
  }

  return NextResponse.json({ received: true })
}
