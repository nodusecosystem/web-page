'use client'

import dynamic from 'next/dynamic'
import { useReducedMotion } from 'framer-motion'
import { useIsMobile } from '@/lib/use-mobile'

const CursorGrid = dynamic(() => import('@/components/ui/reactbits/CursorGrid'), {
  ssr: false,
})

const Aurora = dynamic(() => import('@/components/ui/reactbits/Aurora'), {
  ssr: false,
})

export function HeroBackground() {
  const reduceMotion = useReducedMotion()
  const isMobile = useIsMobile()

  if (reduceMotion) return null

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {isMobile ? (
        <Aurora colorStops={['#5BC7D0', '#ffffff', '#5BC7D0']} amplitude={0.8} blend={0.5} />
      ) : (
        <CursorGrid
          cellSize={48}
          color="#5BC7D0"
          radius={170}
          falloff="smooth"
          holdTime={450}
          fadeDuration={900}
          lineWidth={1.2}
          maxOpacity={0.9}
          fillOpacity={0.06}
          gridOpacity={0}
          clickPulse
          pulseSpeed={600}
        />
      )}
    </div>
  )
}
