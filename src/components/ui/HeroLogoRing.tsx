'use client'

import { useEffect, useRef } from 'react'
import { useIsMobile } from '@/lib/use-mobile'

export function HeroLogoRing() {
  const isMobile = useIsMobile()
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ringRef.current
    if (!node || isMobile) return

    let frame = 0
    const update = (event: PointerEvent) => {
      frame = 0
      const rect = node.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height
      node.style.setProperty('--glass-highlight', inside ? '0.5' : '0')

      if (!inside) {
        node.style.setProperty('--rim-angle', '220deg')
        return
      }

      node.style.setProperty('--mx', `${(x / rect.width) * 100}%`)
      node.style.setProperty('--my', `${(y / rect.height) * 100}%`)
      const angle = (Math.atan2(y - rect.height / 2, x - rect.width / 2) * 180) / Math.PI + 90
      node.style.setProperty('--rim-angle', `${angle}deg`)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (frame) return
      frame = window.requestAnimationFrame(() => update(event))
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [isMobile])

  if (isMobile) {
    return (
      <div
        aria-hidden
        className="absolute inset-6 rounded-full border border-white/10 bg-dark/80 backdrop-blur"
      />
    )
  }

  return (
    <div
      ref={ringRef}
      aria-hidden
      className="glass-surface glass-ring pointer-events-none"
    />
  )
}
