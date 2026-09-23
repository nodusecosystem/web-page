import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { PageTransition } from '@/components/animations/PageTransition'

vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>()
  return {
    ...actual,
    ViewTransition: ({ children }: { children: ReactNode }) => children,
  }
})

describe('PageTransition', () => {
  it('renders the page content', () => {
    render(
      <PageTransition>
        <h1>Contenido de la página</h1>
      </PageTransition>,
    )

    expect(screen.getByRole('heading', { name: 'Contenido de la página' })).toBeInTheDocument()
  })

  it('renders the decorative wipe panel hidden from assistive tech', () => {
    const { container } = render(
      <PageTransition>
        <p>Contenido</p>
      </PageTransition>,
    )

    const panel = container.querySelector('.page-wipe-panel')
    expect(panel).toBeInTheDocument()
    expect(panel).toHaveAttribute('aria-hidden', 'true')
  })
})
