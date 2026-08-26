import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/cn'

export function Badge({ className, ...rest }: ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-teal-light/10 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-dark uppercase',
        className,
      )}
      {...rest}
    />
  )
}
