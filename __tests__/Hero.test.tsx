import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Hero } from '@/views/Hero'

vi.mock('next/root-params', () => ({
  lang: () => Promise.resolve('es'),
}))

describe('Hero', () => {
  it('renders a single main heading with the value proposition', async () => {
    render(await Hero())
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    await waitFor(() => expect(heading.textContent).toContain('crecimiento'))
  })

  it('renders both CTAs pointing to the right anchors', async () => {
    render(await Hero())
    expect(screen.getByRole('link', { name: 'Empieza tu plan' })).toHaveAttribute(
      'href',
      '#contacto',
    )
    expect(screen.getByRole('link', { name: 'Conoce los servicios' })).toHaveAttribute(
      'href',
      '#servicios',
    )
  })

  it('renders the brand isotipo as inline SVG (no image request)', async () => {
    const { container } = render(await Hero())
    const isotipo = container.querySelector('svg[width="100%"]')
    expect(isotipo).toBeInTheDocument()
    expect(container.querySelector('img[src*="nodus-isotipo"]')).not.toBeInTheDocument()
  })
})
