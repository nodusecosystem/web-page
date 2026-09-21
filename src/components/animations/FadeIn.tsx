'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useIsMobile } from '@/lib/use-mobile'

type FadeInProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  immediate?: boolean
}

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
  immediate = false,
}: Readonly<FadeInProps>) {
  const reduceMotion = useReducedMotion()
  const isMobile = useIsMobile()

  if (reduceMotion || isMobile || immediate) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
