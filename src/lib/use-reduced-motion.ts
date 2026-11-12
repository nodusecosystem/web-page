'use client'

import { useSyncExternalStore } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(callback: () => void) {
  const list = window.matchMedia(REDUCED_MOTION_QUERY)
  list.addEventListener('change', callback)
  return () => list.removeEventListener('change', callback)
}

function getSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

/** `true` si el usuario pidió reducir el movimiento. En SSR asume que no. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
