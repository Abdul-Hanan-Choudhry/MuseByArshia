'use client'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const order = searchParams.get('order')
  const [seconds, setSeconds] = useState(5)

  useEffect(() => {
    if (seconds <= 0) {
      router.push('/shop')
      return
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [seconds, router])

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
          {order && (
            <p className="font-sans text-shop-muted text-sm">Order #{order}</p>
          )}
        </div>

        <p className="font-sans text-shop-muted text-sm leading-relaxed">
          Thank you for your purchase. You will receive an email confirmation shortly.
          We will contact you to confirm delivery details.
        </p>

        <p className="font-sans text-xs text-shop-muted">
          Redirecting to shop in {seconds}s…
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop">
            <Button variant="outline">Browse More</Button>
          </Link>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-shop-bg" />}>
      <SuccessContent />
    </Suspense>
  )
}
