'use client'

import { useSyncExternalStore, type ReactNode } from 'react'
import GlowCursorShader from '@/components/ui/reactbits/GlowCursor'
import { useIsMobile } from '@/lib/use-mobile'
import { cn } from '@/lib/cn'

const MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(callback: () => void) {
  const list = window.matchMedia(MOTION_QUERY)
  list.addEventListener('change', callback)
  return () => list.removeEventListener('change', callback)
}

function getSnapshot() {
  return window.matchMedia(MOTION_QUERY).matches
}

type GlowCursorProps = {
  children: ReactNode
  className?: string
}

export function GlowCursor({ children, className }: GlowCursorProps) {
  const reduceMotion = useSyncExternalStore(subscribe, getSnapshot, () => false)
  const isMobile = useIsMobile()

  if (reduceMotion || isMobile) return <>{children}</>

  return (
    <GlowCursorShader
      color="#5BC7D0"
      secondaryColor="#ffffff"
      trailLength={40}
      trailWidth={8}
      trailTaper={0.8}
      followSpeed={0.16}
      glowIntensity={1.9}
      glowSpread={1.2}
      hotspot={0.65}
      brightness={1.25}
      pulseSpeed={1.1}
      noiseStrength={0.035}
      idleFade
      idleTimeout={700}
      fadeDuration={900}
      blendMode="screen"
      className={cn('relative', className)}
    >
      {children}
    </GlowCursorShader>
  )
}
