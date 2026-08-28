'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
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
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [idle, setIdle] = useState(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => setIdle(true), 600)
    return () => window.clearTimeout(timer)
  }, [])

  if (reduceMotion) return null

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {idle && visible ? (
        isMobile ? (
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
        )
      ) : null}
    </div>
  )
}
