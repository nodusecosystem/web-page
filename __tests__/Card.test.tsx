import { fireEvent, render, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Card } from '@/components/ui/Card'

describe('Card', () => {
  it('renders children inside the border glow wrapper', () => {
    const { container } = render(<Card>Contenido de la card</Card>)
    expect(container).toHaveTextContent('Contenido de la card')
  })

  it('includes a decorative glow layer for every variant', () => {
    for (const variant of ['default', 'bordered', 'elevated', 'glass'] as const) {
      const { unmount, container } = render(<Card variant={variant}>X</Card>)
      expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
      unmount()
    }
  })

  it('applies a CSS-only glass surface, without SVG refraction filters', () => {
    const { container } = render(<Card variant="glass">X</Card>)
    expect(container.querySelector('[style*="backdrop-filter: blur(4px)"]')).toBeInTheDocument()
    expect(container.querySelector('filter')).not.toBeInTheDocument()
  })

  it('drives the border glow with CSS variables instead of re-rendering on pointer move', async () => {
    const { container } = render(<Card>Contenido</Card>)
    const glowRoot = container.firstElementChild as HTMLElement
    vi.spyOn(glowRoot, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 200,
      bottom: 100,
      width: 200,
      height: 100,
      toJSON: () => ({}),
    } as DOMRect)

    fireEvent.pointerMove(glowRoot, { clientX: 200, clientY: 50 })

    await waitFor(() => {
      expect(glowRoot.style.getPropertyValue('--border-glow-angle')).toBe('90.000deg')
      expect(glowRoot.style.getPropertyValue('--border-glow-proximity')).toBe('1')
    })
  })

  it('renders the plain variant without glow, glass or canvas layers', () => {
    const { container } = render(<Card variant="plain">Contenido simple</Card>)
    expect(container).toHaveTextContent('Contenido simple')
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument()
    expect(container.querySelector('svg')).not.toBeInTheDocument()
    expect(container.querySelector('canvas')).not.toBeInTheDocument()
  })
})
