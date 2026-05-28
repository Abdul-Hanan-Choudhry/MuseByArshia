import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function generateOrderNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 9000) + 1000
  return `ART-${year}-${random}`
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function formatPrice(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-PK')}`
}

export function calculateShipping(city: string, total: number): number {
  if (total >= 15000) return 0
  const majorCities = ['karachi', 'lahore', 'islamabad', 'rawalpindi', 'multan', 'faisalabad']
  return majorCities.includes(city.toLowerCase()) ? 300 : 500
}

export function getDiscountAmount(
  cartTotal: number,
  type: 'PERCENTAGE' | 'FIXED',
  value: number
): number {
  if (type === 'PERCENTAGE') {
    return Math.round(cartTotal * (value / 100))
  }
  return Math.min(value, cartTotal)
}
