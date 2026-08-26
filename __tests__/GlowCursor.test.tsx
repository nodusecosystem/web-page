import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { GlowCursor } from '@/components/ui/GlowCursor'

const createMatchMedia = (matches: boolean) => (query: string) =>
  ({
    matches,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }) as MediaQueryList

describe('GlowCursor', () => {
  beforeEach(() => {
    window.matchMedia = createMatchMedia(false) as unknown as typeof window.matchMedia
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders its content and a decorative canvas trail', () => {
    const { container } = render(<GlowCursor>Contenido</GlowCursor>)
    expect(container).toHaveTextContent('Contenido')
    const canvas = container.querySelector('canvas[aria-hidden="true"]')
    expect(canvas).toBeInTheDocument()
  })

  it('does not render the trail when prefers-reduced-motion is active', () => {
    window.matchMedia = createMatchMedia(true) as unknown as typeof window.matchMedia
    const { container } = render(<GlowCursor>Contenido</GlowCursor>)
    expect(container.querySelector('canvas')).not.toBeInTheDocument()
    expect(container).toHaveTextContent('Contenido')
  })
})
