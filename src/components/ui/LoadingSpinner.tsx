import { cn } from '@/lib/utils'

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-block w-6 h-6 border-2 border-ink/20 border-t-ink rounded-full animate-spin',
        className
      )}
    />
  )
}
