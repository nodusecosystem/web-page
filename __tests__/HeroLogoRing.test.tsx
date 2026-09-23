import { act, render, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { HeroLogoRing } from '@/components/ui/HeroLogoRing'

describe('HeroLogoRing', () => {
  it('renders the glass ring surface', () => {
    const { container } = render(<HeroLogoRing />)
    const ring = container.querySelector('.glass-ring')
    expect(ring).toBeInTheDocument()
    expect(ring).toHaveClass('glass-surface', 'glass-ring', 'pointer-events-none')
  })

  it('tracks the pointer to move the highlight and the rim angle', async () => {
    const { container } = render(<HeroLogoRing />)
    const ring = container.querySelector('.glass-ring') as HTMLElement
    vi.spyOn(ring, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 400,
      bottom: 400,
      width: 400,
      height: 400,
      toJSON: () => ({}),
    } as DOMRect)

    act(() => {
      window.dispatchEvent(new MouseEvent('pointermove', { clientX: 200, clientY: 100 }))
    })

    await waitFor(() => {
      expect(ring.style.getPropertyValue('--glass-highlight')).toBe('0.5')
      expect(ring.style.getPropertyValue('--rim-angle')).toBe('0deg')
    })
  })
})
