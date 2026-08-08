import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/cn'

export type CardVariant = 'default' | 'bordered' | 'elevated'

const VARIANT_CLASSES: Record<CardVariant, string> = {
  default: 'bg-white',
  bordered: 'border border-navy/10 bg-white',
  elevated: 'bg-white shadow-lg shadow-navy/5',
}

type CardProps = ComponentPropsWithoutRef<'div'> & {
  variant?: CardVariant
}

export function Card({ variant = 'default', className, ...rest }: CardProps) {
  return <div className={cn('rounded-2xl p-6', VARIANT_CLASSES[variant], className)} {...rest} />
}
