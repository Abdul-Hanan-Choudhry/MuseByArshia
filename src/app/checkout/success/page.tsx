import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface PageProps {
  searchParams: { order?: string }
}

export default function CheckoutSuccessPage({ searchParams }: PageProps) {
  return (
    <div className="min-h-screen bg-shop-bg pt-8 pb-20 flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center space-y-6">
        <div className="w-16 h-16 mx-auto bg-ink rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div>
          <h1 className="font-display text-4xl font-light text-ink mb-2">Order Placed!</h1>
          {searchParams.order && (
            <p className="font-sans text-shop-muted text-sm">Order #{searchParams.order}</p>
          )}
        </div>

        <p className="font-sans text-shop-muted text-sm leading-relaxed">
          Thank you for your purchase. You will receive an email confirmation shortly.
          We will contact you to confirm delivery details.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
