'use client'

import type { ReactNode } from 'react'
import BorderGlow from '@/components/ui/reactbits/BorderGlow'

type GlowPanelProps = {
  children: ReactNode
  className?: string
  borderRadius?: number
}

export function GlowPanel({ children, className, borderRadius = 24 }: GlowPanelProps) {
  return (
    <BorderGlow
      glowColor="180 81 57"
      backgroundColor="#071919"
      colors={['#3aeaea', '#ffffff', '#3aeaea']}
      borderRadius={borderRadius}
      className={className}
    >
      {children}
    </BorderGlow>
  )
}
