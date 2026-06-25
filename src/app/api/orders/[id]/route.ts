import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'
import { sendShippingEmail, sendCancellationEmail } from '@/lib/email'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      items: { include: { product: true } },
      discountCode: true,
    },
  })

  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(order)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  const body = await req.json()

  const current = await prisma.order.findUnique({
    where: { id: params.id },
    select: { status: true },
  })

  if (!current) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const order = await prisma.order.update({
    where: { id: params.id },
    data: {
      status: body.status,
      paymentStatus: body.paymentStatus,
      trackingNumber: body.trackingNumber,
      courierName: body.courierName,
      notes: body.notes,
    },
    include: {
      items: { include: { product: { select: { title: true } } } },
    },
  })

  const isNowShipped = current.status !== 'SHIPPED' && body.status === 'SHIPPED'
  const isNowCancelled = current.status !== 'CANCELLED' && body.status === 'CANCELLED'

  if (isNowShipped && order.trackingNumber) {
    try {
      await sendShippingEmail({
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        trackingNumber: order.trackingNumber,
        courierName: order.courierName ?? 'Courier',
        total: order.total,
        items: order.items,
      })
    } catch (err) {
      console.error('[shipping email] failed:', err)
    }
  }

  if (isNowCancelled) {
    try {
      await sendCancellationEmail({
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        total: order.total,
        items: order.items,
      })
    } catch (err) {
      console.error('[cancellation email] failed:', err)
    }
  }

  return NextResponse.json(order)
}
