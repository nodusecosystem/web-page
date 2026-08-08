import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Hero } from '@/views/Hero'

describe('Hero', () => {
  it('renders a single main heading with the value proposition', () => {
    render(<Hero />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading.textContent).toContain('crecimiento')
  })

  it('renders both CTAs pointing to the right anchors', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: 'Empieza tu plan' })).toHaveAttribute(
      'href',
      '#contacto',
    )
    expect(screen.getByRole('link', { name: 'Conoce los servicios' })).toHaveAttribute(
      'href',
      '#servicios',
    )
  })

  it('renders the brand isotipo as the LCP image with preload', () => {
    render(<Hero />)
    const image = screen.getByRole('img', { name: 'nodus: digital strategy' })
    expect(image).toHaveAttribute('src', expect.stringContaining('nodus-isotipo-blanco'))
    expect(image).toHaveAttribute('fetchpriority', 'high')
  })
})
