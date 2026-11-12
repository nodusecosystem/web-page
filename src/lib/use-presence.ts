'use client'

import { useEffect, useState } from 'react'

/**
 * Mantiene montado un elemento mientras dura su transición de salida en CSS.
 * La entrada la anima `@starting-style` (variante `starting:` de Tailwind);
 * la salida, una clase aplicada mientras `leaving` es `true`.
 */
export function usePresence(open: boolean, exitMs: number) {
  const [mounted, setMounted] = useState(open)
  if (open && !mounted) setMounted(true)

  useEffect(() => {
    if (open || !mounted) return
    const timer = window.setTimeout(() => setMounted(false), exitMs)
    return () => window.clearTimeout(timer)
  }, [open, mounted, exitMs])

  return { mounted, leaving: mounted && !open }
}
