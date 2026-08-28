'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { useIsMobile } from '@/lib/use-mobile'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

type StaggerChildrenProps = {
  children: ReactNode
  className?: string
}

export function StaggerChildren({ children, className }: Readonly<StaggerChildrenProps>) {
  const reduceMotion = useReducedMotion()
  const isMobile = useIsMobile()

  if (reduceMotion || isMobile) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: Readonly<StaggerChildrenProps>) {
  const reduceMotion = useReducedMotion()
  const isMobile = useIsMobile()

  if (reduceMotion || isMobile) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}
