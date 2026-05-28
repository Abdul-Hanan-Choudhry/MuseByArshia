'use client'
import { useState } from 'react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (res.ok) {
      setStatus('success')
      setMessage('Thank you for subscribing!')
      setEmail('')
    } else {
      const data = await res.json()
      setStatus('error')
      setMessage(data.error === 'Already subscribed' ? 'You are already subscribed.' : 'Something went wrong. Please try again.')
    }
  }

  return (
    <section className="bg-ink py-20 px-6 text-center">
      <h3 className="font-display text-4xl font-light text-cream mb-3">
        Sign up for my newsletter
      </h3>
      <p className="font-sans font-light text-cream/50 text-sm mb-8">
        Join my mailing list to get news and updates
      </p>

      {status === 'success' ? (
        <p className="font-sans text-cream/80 text-sm" role="status">{message}</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="flex-1 bg-white/10 border border-white/20 text-cream placeholder:text-cream/40 px-4 py-3 font-sans text-sm focus:outline-none focus:border-cream/60"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-cream text-ink font-sans text-sm tracking-widest px-8 py-3 hover:bg-blush transition-colors disabled:opacity-60"
          >
            {status === 'loading' ? '...' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="font-sans text-sale-red text-xs mt-2" role="alert">{message}</p>
      )}
    </section>
  )
}
