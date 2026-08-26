'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type TitleStrokeProps = {
  children: ReactNode
  className?: string
  fillClassName?: string
}

export function TitleStroke({ children, className, fillClassName }: TitleStrokeProps) {
  const reduceMotion = useReducedMotion()
  const strokeClasses = cn(
    className,
    'pointer-events-none select-none [-webkit-text-stroke:1.6px_#3aeaea] text-transparent',
  )

  return (
    <span className={cn('relative block', className)}>
      <span aria-hidden className={strokeClasses}>
        {children}
      </span>
      <motion.span
        aria-hidden
        className={cn('absolute inset-0', className, fillClassName ?? 'text-white')}
        initial={reduceMotion ? undefined : { clipPath: 'inset(0 100% 0 0)' }}
        whileInView={reduceMotion ? undefined : { clipPath: 'inset(0 0 0 0)' }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' }}
      >
        {children}
      </motion.span>
      <span className="sr-only">{children}</span>
    </span>
  )
}
