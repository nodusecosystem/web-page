import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ScrollToTop } from '@/components/ui/ScrollToTop'

describe('ScrollToTop', () => {
  it('is hidden when the page is at the top', () => {
    render(<ScrollToTop />)
    expect(screen.queryByRole('button', { name: 'Volver al inicio' })).not.toBeInTheDocument()
  })

  it('appears after scrolling past the threshold and scrolls back to top on click', () => {
    const scrollToMock = vi.fn()
    Object.defineProperty(window, 'scrollTo', {
      value: scrollToMock,
      writable: true,
      configurable: true,
    })

    render(<ScrollToTop />)
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true, configurable: true })
    fireEvent.scroll(window)

    const button = screen.getByRole('button', { name: 'Volver al inicio' })
    fireEvent.click(button)
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('stays hidden when the scroll is below the threshold', () => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true })
    render(<ScrollToTop />)
    Object.defineProperty(window, 'scrollY', { value: 150, writable: true, configurable: true })
    fireEvent.scroll(window)
    expect(screen.queryByRole('button', { name: 'Volver al inicio' })).not.toBeInTheDocument()
  })
})
