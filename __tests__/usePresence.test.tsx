import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { usePresence } from '@/lib/use-presence'

describe('usePresence', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('mounts as soon as it opens', () => {
    const { result, rerender } = renderHook(({ open }) => usePresence(open, 200), {
      initialProps: { open: false },
    })
    expect(result.current).toEqual({ mounted: false, leaving: false })

    rerender({ open: true })
    expect(result.current).toEqual({ mounted: true, leaving: false })
  })

  it('stays mounted while leaving and unmounts after the exit duration', () => {
    const { result, rerender } = renderHook(({ open }) => usePresence(open, 200), {
      initialProps: { open: true },
    })

    rerender({ open: false })
    expect(result.current).toEqual({ mounted: true, leaving: true })

    act(() => {
      vi.advanceTimersByTime(199)
    })
    expect(result.current.mounted).toBe(true)

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(result.current).toEqual({ mounted: false, leaving: false })
  })

  it('cancels the exit when it reopens before the duration ends', () => {
    const { result, rerender } = renderHook(({ open }) => usePresence(open, 200), {
      initialProps: { open: true },
    })

    rerender({ open: false })
    act(() => {
      vi.advanceTimersByTime(100)
    })
    rerender({ open: true })
    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(result.current).toEqual({ mounted: true, leaving: false })
  })
})
