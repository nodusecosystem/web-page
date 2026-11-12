import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion'

const stubMatchMedia = (matches: boolean) =>
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string) =>
      ({
        matches,
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      }) as MediaQueryList,
  )

describe('usePrefersReducedMotion', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('reflects the prefers-reduced-motion media query', () => {
    const spy = stubMatchMedia(true)
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(true)
    expect(spy).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')
  })

  it('is false when the user has no motion preference', () => {
    stubMatchMedia(false)
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(false)
  })
})
