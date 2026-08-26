'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'

type AnimatedCounterProps = {
  value: string | number
  className?: string
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function AnimatedCounter({
  value,
  className,
}: AnimatedCounterProps) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)

  const raw = String(value)
  const match = raw.match(/^([^0-9]*)(\d+)([^0-9]*)$/)
  const target = match ? Number(match[2]) : null
  const [display, setDisplay] = useState(target ?? 0)

  useEffect(() => {
    if (target === null || reduceMotion || !inView) return
    const start = performance.now()
    const duration = 1000
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setDisplay(Math.round(target * easeOutCubic(progress)))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, inView, reduceMotion])

  useEffect(() => {
    if (target === null || !ref.current) return
    const node = ref.current
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setDisplay(0)
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [target])

  if (target === null) {
    return <span className={className}>{value}</span>
  }

  const prefix = match?.[1] ?? ''
  const suffix = match?.[3] ?? ''
  const rendered = reduceMotion ? target : inView ? display : target

  return (
    <span ref={ref} className={cn('inline-block tabular-nums', className)}>
      <span className="sr-only">{raw}</span>
      <span aria-hidden>{prefix}{rendered}{suffix}</span>
    </span>
  )
}
