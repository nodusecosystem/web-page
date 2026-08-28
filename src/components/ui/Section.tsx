import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/cn'

export function Section({ className, ...rest }: ComponentPropsWithoutRef<'section'>) {
  return (
    <section
      className={cn(
        '[content-visibility:auto] [contain-intrinsic-size:auto_720px] scroll-mt-20 py-20 sm:py-28',
        className,
      )}
      {...rest}
    />
  )
}
