import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function esc(s: string | number): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

interface OrderForEmail {
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  address: string
  city: string
  total: number
  paymentMethod: string
  items: Array<{
    price: number
    quantity: number
    product: { title: string }
  }>
}

export async function sendOrderConfirmationEmail(order: OrderForEmail) {
  const itemsHtml = order.items
    .map(
      (item) =>
        `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${esc(item.product.title)}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">Rs. ${esc(item.price.toLocaleString())}</td>
        </tr>`
    )
    .join('')

  await resend.emails.send({
    from: 'Muse By Arshia <onboarding@resend.dev>',
    to: order.customerEmail,
    subject: `Order Confirmed — ${order.orderNumber}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1A1714;">
        <div style="background: #1A1714; padding: 32px; text-align: center;">
          <h1 style="color: #F5F0E8; font-size: 24px; margin: 0; font-weight: 300; letter-spacing: 4px;">ORDER CONFIRMED</h1>
        </div>
        <div style="padding: 32px;">
          <p>Dear ${esc(order.customerName)},</p>
          <p>Thank you for your order! We've received your order <strong>${esc(order.orderNumber)}</strong> and will process it shortly.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
            ${itemsHtml}
            <tr>
              <td style="padding: 12px 8px; font-weight: bold;">Total</td>
              <td style="padding: 12px 8px; font-weight: bold; text-align: right;">Rs. ${order.total.toLocaleString()}</td>
            </tr>
          </table>
          <p><strong>Payment:</strong> ${order.paymentMethod === 'COD' ? 'Cash on Delivery' : esc(order.paymentMethod)}</p>
          <p>We will contact you on <strong>${esc(order.customerPhone)}</strong> to confirm delivery.</p>
          <hr style="border: none; border-top: 1px solid #E8E4DE; margin: 24px 0;" />
          <p style="color: #6B6B68; font-size: 13px;">Shipping to: ${esc(order.address)}, ${esc(order.city)}</p>
        </div>
      </div>
    `,
  })

  await resend.emails.send({
    from: 'Muse By Arshia <onboarding@resend.dev>',
    to: process.env.ADMIN_EMAIL!,
    subject: `New Order: ${order.orderNumber} — Rs. ${order.total.toLocaleString()}`,
    html: `
      <p>New order from <strong>${esc(order.customerName)}</strong> (${esc(order.customerPhone)})</p>
      <p>City: ${esc(order.city)}</p>
      <p>Total: Rs. ${esc(order.total.toLocaleString())} via ${esc(order.paymentMethod)}</p>
      <p>Order #: ${esc(order.orderNumber)}</p>
    `,
  })
}

export async function sendNewsletterConfirmation(email: string) {
  await resend.emails.send({
    from: 'Muse By Arshia <onboarding@resend.dev>',
    to: email,
    subject: `You're subscribed!`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1A1714;">
        <p>Thank you for subscribing to our newsletter!</p>
        <p>You'll be the first to know about new paintings, upcoming collections, and exclusive offers.</p>
      </div>
    `,
  })
}
