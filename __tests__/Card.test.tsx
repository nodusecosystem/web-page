import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
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

  it('renders the plain variant without glow, glass or canvas layers', () => {
    const { container } = render(<Card variant="plain">Contenido simple</Card>)
    expect(container).toHaveTextContent('Contenido simple')
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument()
    expect(container.querySelector('svg')).not.toBeInTheDocument()
    expect(container.querySelector('canvas')).not.toBeInTheDocument()
  })
})
