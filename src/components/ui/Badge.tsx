import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'sale' | 'sold' | 'featured'
  className?: string
}

export function Badge({ children, variant = 'sale', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block text-xs font-sans font-medium px-2 py-1',
        {
          'bg-sale-red text-white': variant === 'sale',
          'bg-ink/80 text-cream': variant === 'sold',
          'bg-gold text-ink': variant === 'featured',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
