'use client'

import { useCallback, useRef, type PointerEvent as ReactPointerEvent, type RefObject } from 'react'

type GlassPointerOptions = {
  /** Inclinación 3D máxima en grados (0 = sin tilt) */
  tilt?: number
}

export function useGlassPointer<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { tilt = 0 }: GlassPointerOptions = {},
) {
  const reducedMotionRef = useRef<boolean | null>(null)

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<T>) => {
      const node = ref.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height
      node.style.setProperty('--mx', `${px * 100}%`)
      node.style.setProperty('--my', `${py * 100}%`)

      if (!tilt) return
      if (reducedMotionRef.current === null) {
        reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      }
      if (reducedMotionRef.current) return

      node.style.setProperty('--ry', `${((px - 0.5) * tilt * 2).toFixed(2)}deg`)
      node.style.setProperty('--rx', `${((0.5 - py) * tilt * 2).toFixed(2)}deg`)
    },
    [ref, tilt],
  )

  const handlePointerLeave = useCallback(() => {
    const node = ref.current
    if (!node) return
    node.style.setProperty('--rx', '0deg')
    node.style.setProperty('--ry', '0deg')
  }, [ref])

  return { handlePointerMove, handlePointerLeave }
}
