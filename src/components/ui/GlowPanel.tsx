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
      glowColor="185 55 59"
      backgroundColor="#000F13"
      colors={['#5BC7D0', '#ffffff', '#5BC7D0']}
      borderRadius={borderRadius}
      className={className}
    >
      {children}
    </BorderGlow>
  )
}
