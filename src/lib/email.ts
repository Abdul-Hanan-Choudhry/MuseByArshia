import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

function esc(s: string | number): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function paymentLabel(method: string): string {
  const map: Record<string, string> = {
    COD: 'Cash on Delivery',
    CARD: 'Credit / Debit Card',
    JAZZCASH: 'JazzCash',
    EASYPAISA: 'EasyPaisa',
    BANK_TRANSFER: 'Bank Transfer',
    SADAPAY: 'Sadapay',
  }
  return map[method] ?? method
}

function emailShell(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#EDE8DF;font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#EDE8DF;padding:40px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr>
        <td style="background:#1A1714;padding:40px 48px;text-align:center;">
          <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#C4A882;font-weight:normal;">Original Paintings</p>
          <h1 style="margin:10px 0 0;font-family:Georgia,serif;font-size:34px;font-weight:normal;font-style:italic;color:#F5F0E8;letter-spacing:1px;">Muse by Arshia</h1>
          <div style="width:48px;height:1px;background:#C4A882;margin:14px auto 0;"></div>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="background:#FFFFFF;padding:52px 48px;">
          ${body}
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#1A1714;padding:32px 48px;text-align:center;">
          <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C4A882;">Follow the journey</p>
          <a href="https://www.instagram.com/arshiasdiary_?igsh=c2VxeGdvbTV1bWZm"
             style="font-family:Arial,sans-serif;font-size:13px;color:#F5F0E8;text-decoration:none;">@arshiasdiary_</a>
          <p style="margin:20px 0 0;font-family:Arial,sans-serif;font-size:11px;color:#6B6560;">
            &copy; 2025 Muse By Arshia &nbsp;&middot;&nbsp; All rights reserved.
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface OrderForEmail {
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  address: string
  city: string
  postalCode?: string | null
  subtotal: number
  discountAmount: number
  shippingCost: number
  total: number
  paymentMethod: string
  paymentReference?: string | null
  items: Array<{
    price: number
    quantity: number
    product: { title: string }
  }>
}

interface ShippingEmailData {
  orderNumber: string
  customerName: string
  customerEmail: string
  trackingNumber: string
  courierName: string
  total: number
  items: Array<{
    price: number
    quantity: number
    product: { title: string }
  }>
}

// ─── Order Confirmation ───────────────────────────────────────────────────────

export async function sendOrderConfirmationEmail(order: OrderForEmail) {
  const itemRows = order.items
    .map(
      (item) => `<tr>
        <td style="padding:12px 0;border-bottom:1px solid #EDE8DF;font-family:Arial,sans-serif;font-size:13px;color:#2C2926;">${esc(item.product.title)}</td>
        <td style="padding:12px 0;border-bottom:1px solid #EDE8DF;font-family:Arial,sans-serif;font-size:13px;color:#2C2926;text-align:right;white-space:nowrap;">Rs.&nbsp;${esc(item.price.toLocaleString())}</td>
      </tr>`
    )
    .join('')

  const discountRow =
    order.discountAmount > 0
      ? `<tr>
          <td style="padding:6px 0;font-family:Arial,sans-serif;font-size:13px;color:#4A4540;">Subtotal</td>
          <td style="padding:6px 0;font-family:Arial,sans-serif;font-size:13px;color:#4A4540;text-align:right;">Rs.&nbsp;${esc(order.subtotal.toLocaleString())}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-family:Arial,sans-serif;font-size:13px;color:#8B3A2A;">Discount</td>
          <td style="padding:6px 0;font-family:Arial,sans-serif;font-size:13px;color:#8B3A2A;text-align:right;">&minus;&nbsp;Rs.&nbsp;${esc(order.discountAmount.toLocaleString())}</td>
        </tr>`
      : ''

  const body = `
    <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#9B7B5A;">Order Confirmed</p>
    <h2 style="margin:0 0 28px;font-family:Georgia,serif;font-size:28px;font-weight:normal;color:#1A1714;">Thank you, ${esc(order.customerName)}.</h2>

    <p style="margin:0 0 28px;font-family:Arial,sans-serif;font-size:14px;color:#4A4540;line-height:1.8;">
      Your order has been received and is now being prepared with care.
      We will reach out on <strong style="color:#1A1714;">${esc(order.customerPhone)}</strong> to confirm your delivery.
    </p>

    <!-- Order number -->
    <div style="background:#F5F0E8;border-left:3px solid #C4A882;padding:18px 22px;margin:0 0 36px;">
      <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#9B7B5A;">Order Number</p>
      <p style="margin:6px 0 0;font-family:Georgia,serif;font-size:20px;color:#1A1714;font-weight:bold;">${esc(order.orderNumber)}</p>
    </div>

    <!-- Items table -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 4px;">
      <tr>
        <th style="text-align:left;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#9B7B5A;padding-bottom:10px;border-bottom:1px solid #1A1714;">Artwork</th>
        <th style="text-align:right;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#9B7B5A;padding-bottom:10px;border-bottom:1px solid #1A1714;">Price</th>
      </tr>
      ${itemRows}
    </table>

    <!-- Totals -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 36px;">
      ${discountRow}
      <tr>
        <td style="padding:6px 0;font-family:Arial,sans-serif;font-size:13px;color:#4A4540;">Shipping</td>
        <td style="padding:6px 0;font-family:Arial,sans-serif;font-size:13px;color:#4A4540;text-align:right;">
          ${order.shippingCost === 0 ? 'Free' : `Rs.&nbsp;${esc(order.shippingCost.toLocaleString())}`}
        </td>
      </tr>
      <tr>
        <td style="padding:14px 0 0;font-family:Georgia,serif;font-size:16px;font-style:italic;color:#1A1714;border-top:1px solid #E8E4DE;">Total</td>
        <td style="padding:14px 0 0;font-family:Georgia,serif;font-size:16px;font-style:italic;color:#1A1714;border-top:1px solid #E8E4DE;text-align:right;"><strong>Rs.&nbsp;${esc(order.total.toLocaleString())}</strong></td>
      </tr>
    </table>

    <!-- Payment + Address -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E8;margin:0 0 36px;">
      <tr>
        <td style="padding:18px 22px;width:50%;vertical-align:top;">
          <p style="margin:0 0 5px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#9B7B5A;">Payment</p>
          <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#1A1714;">${esc(paymentLabel(order.paymentMethod))}</p>
        </td>
        <td style="padding:18px 22px;width:50%;vertical-align:top;border-left:1px solid #E0DAD0;">
          <p style="margin:0 0 5px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#9B7B5A;">Deliver to</p>
          <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#1A1714;line-height:1.6;">
            ${esc(order.address)}<br/>${esc(order.city)}${order.postalCode ? `,&nbsp;${esc(order.postalCode)}` : ''}
          </p>
        </td>
      </tr>
    </table>

    <p style="margin:0;font-family:Georgia,serif;font-size:13px;font-style:italic;color:#6B6560;line-height:1.8;">
      Every piece is packed with care before it leaves the studio. We will keep you updated as your order makes its way to you.
    </p>
  `

  // Customer confirmation — may fail on Resend free tier if no domain is verified
  try {
    await resend?.emails.send({
      from: 'Muse By Arshia <onboarding@resend.dev>',
      to: order.customerEmail,
      subject: `Order Confirmed — ${order.orderNumber} | Muse By Arshia`,
      html: emailShell(body),
    })
  } catch (err) {
    console.error('[email] customer confirmation failed (domain not verified?):', err)
  }

  // Admin notification — always runs regardless of customer email result
  const adminBody = `
    <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#9B7B5A;">New Order</p>
    <h2 style="margin:0 0 28px;font-family:Georgia,serif;font-size:24px;font-weight:normal;color:#1A1714;">${esc(order.orderNumber)}</h2>
    <table cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:13px;color:#4A4540;width:100%;">
      <tr><td style="padding:5px 0;color:#9B7B5A;width:120px;">Customer</td><td style="padding:5px 0;"><strong style="color:#1A1714;">${esc(order.customerName)}</strong></td></tr>
      <tr><td style="padding:5px 0;color:#9B7B5A;">Phone</td><td style="padding:5px 0;">${esc(order.customerPhone)}</td></tr>
      <tr><td style="padding:5px 0;color:#9B7B5A;">City</td><td style="padding:5px 0;">${esc(order.city)}</td></tr>
      <tr><td style="padding:5px 0;color:#9B7B5A;">Payment</td><td style="padding:5px 0;">${esc(paymentLabel(order.paymentMethod))}</td></tr>
      ${order.paymentReference ? `<tr><td style="padding:5px 0;color:#9B7B5A;">Txn Ref</td><td style="padding:5px 0;font-family:'Courier New',Courier,monospace;color:#1A1714;font-weight:bold;">${esc(order.paymentReference)}</td></tr>` : ''}
      <tr><td style="padding:12px 0 0;color:#1A1714;font-size:16px;font-weight:bold;">Total</td><td style="padding:12px 0 0;color:#1A1714;font-size:16px;font-weight:bold;">Rs.&nbsp;${esc(order.total.toLocaleString())}</td></tr>
    </table>
  `

  try {
    await resend.emails.send({
      from: 'Muse By Arshia <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL!,
      subject: `New Order: ${order.orderNumber} — Rs. ${order.total.toLocaleString()}`,
      html: emailShell(adminBody),
    })
  } catch (err) {
    console.error('[email] admin order notification failed:', err)
  }
}



// ─── Shipping Notification ────────────────────────────────────────────────────

export async function sendShippingEmail(data: ShippingEmailData) {
  const itemRows = data.items
    .map(
      (item) => `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #EDE8DF;font-family:Arial,sans-serif;font-size:13px;color:#4A4540;">${esc(item.product.title)}</td>
        <td style="padding:10px 0;border-bottom:1px solid #EDE8DF;font-family:Arial,sans-serif;font-size:13px;color:#4A4540;text-align:right;white-space:nowrap;">Rs.&nbsp;${esc(item.price.toLocaleString())}</td>
      </tr>`
    )
    .join('')

  const body = `
    <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#9B7B5A;">Your Order Has Shipped</p>
    <h2 style="margin:0 0 28px;font-family:Georgia,serif;font-size:28px;font-weight:normal;color:#1A1714;">On its way, ${esc(data.customerName)}.</h2>

    <p style="margin:0 0 32px;font-family:Arial,sans-serif;font-size:14px;color:#4A4540;line-height:1.8;">
      Your painting has left the studio and is on its way to you.
      Use the details below to follow your shipment.
    </p>

    <!-- Tracking box -->
    <div style="background:#1A1714;padding:28px 32px;margin:0 0 36px;text-align:center;">
      <p style="margin:0 0 10px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#C4A882;">Tracking Number</p>
      <p style="margin:0 0 10px;font-family:'Courier New',Courier,monospace;font-size:24px;color:#F5F0E8;letter-spacing:4px;font-weight:bold;">${esc(data.trackingNumber)}</p>
      <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#9B9490;">via&nbsp;<strong style="color:#C4A882;">${esc(data.courierName)}</strong></p>
    </div>

    <!-- Order number -->
    <div style="background:#F5F0E8;border-left:3px solid #C4A882;padding:16px 22px;margin:0 0 36px;">
      <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#9B7B5A;">Order Number</p>
      <p style="margin:5px 0 0;font-family:Georgia,serif;font-size:17px;color:#1A1714;">${esc(data.orderNumber)}</p>
    </div>

    <!-- Items -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 8px;">
      <tr>
        <th style="text-align:left;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#9B7B5A;padding-bottom:10px;border-bottom:1px solid #1A1714;">Artwork</th>
        <th style="text-align:right;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#9B7B5A;padding-bottom:10px;border-bottom:1px solid #1A1714;">Price</th>
      </tr>
      ${itemRows}
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 36px;">
      <tr>
        <td style="padding:14px 0 0;font-family:Georgia,serif;font-size:16px;font-style:italic;color:#1A1714;border-top:1px solid #E8E4DE;">Total Paid</td>
        <td style="padding:14px 0 0;font-family:Georgia,serif;font-size:16px;font-style:italic;color:#1A1714;border-top:1px solid #E8E4DE;text-align:right;"><strong>Rs.&nbsp;${esc(data.total.toLocaleString())}</strong></td>
      </tr>
    </table>

    <p style="margin:0;font-family:Georgia,serif;font-size:13px;font-style:italic;color:#6B6560;line-height:1.8;">
      Thank you for bringing a piece of this art into your home. We hope it brings you as much joy as it brought us creating it.
    </p>
  `

  // Customer shipping notification
  try {
    await resend?.emails.send({
      from: 'Muse By Arshia <onboarding@resend.dev>',
      to: data.customerEmail,
      subject: `Your order has shipped — ${data.orderNumber} | Muse By Arshia`,
      html: emailShell(body),
    })
  } catch (err) {
    console.error('[email] shipping notification to customer failed:', err)
  }

  // Admin copy so you always know it fired
  const adminShipBody = `
    <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#9B7B5A;">Shipping Email Sent</p>
    <h2 style="margin:0 0 24px;font-family:Georgia,serif;font-size:22px;font-weight:normal;color:#1A1714;">${esc(data.orderNumber)}</h2>
    <table cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:13px;color:#4A4540;width:100%;">
      <tr><td style="padding:5px 0;color:#9B7B5A;width:130px;">Customer</td><td style="padding:5px 0;"><strong style="color:#1A1714;">${esc(data.customerName)}</strong></td></tr>
      <tr><td style="padding:5px 0;color:#9B7B5A;">Email</td><td style="padding:5px 0;">${esc(data.customerEmail)}</td></tr>
      <tr><td style="padding:5px 0;color:#9B7B5A;">Tracking</td><td style="padding:5px 0;font-weight:bold;color:#1A1714;">${esc(data.trackingNumber)}</td></tr>
      <tr><td style="padding:5px 0;color:#9B7B5A;">Courier</td><td style="padding:5px 0;">${esc(data.courierName)}</td></tr>
    </table>
  `

  try {
    await resend?.emails.send({
      from: 'Muse By Arshia <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL!,
      subject: `Shipped: ${data.orderNumber} via ${data.courierName}`,
      html: emailShell(adminShipBody),
    })
  } catch (err) {
    console.error('[email] admin shipping notification failed:', err)
  }
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

export async function sendNewsletterConfirmation(email: string) {
  const body = `
    <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#9B7B5A;">Welcome</p>
    <h2 style="margin:0 0 24px;font-family:Georgia,serif;font-size:26px;font-weight:normal;color:#1A1714;">You're on the list.</h2>
    <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#4A4540;line-height:1.8;">
      Thank you for subscribing. You will be the first to know about new paintings,
      upcoming collections, and exclusive updates straight from the studio.
    </p>
  `

  try {
    await resend?.emails.send({
      from: 'Muse By Arshia <onboarding@resend.dev>',
      to: email,
      subject: `You're subscribed — Muse By Arshia`,
      html: emailShell(body),
    })
  } catch (err) {
    console.error('[email] newsletter confirmation failed:', err)
  }
}
