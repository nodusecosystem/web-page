'use client'

import dynamic from 'next/dynamic'
import { useRef, useSyncExternalStore, type ReactNode } from 'react'
import { useIsMobile } from '@/lib/use-mobile'
import { cn } from '@/lib/cn'

const GlowCursorFx = dynamic(() => import('@/components/ui/reactbits/GlowCursorFx'), {
  ssr: false,
})

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
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  if (reduceMotion || isMobile) return <>{children}</>

  return (
    <div ref={containerRef} className={cn('relative h-full w-full overflow-hidden', className)}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 block h-full w-full select-none"
        style={{ mixBlendMode: 'screen' }}
        aria-hidden="true"
      />
      <GlowCursorFx
        containerRef={containerRef}
        canvasRef={canvasRef}
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
        opacity={1}
        pulseSpeed={1.1}
        noiseStrength={0.035}
        idleFade
        idleTimeout={700}
        fadeDuration={900}
        maxDevicePixelRatio={1.5}
        enabled
      />
      <div className="relative z-[1] h-full w-full">{children}</div>
    </div>
  )
}
