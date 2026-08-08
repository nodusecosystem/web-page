import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Header } from '@/components/layout/Header'
import { HEADER_CTA, NAV_LINKS } from '@/lib/constants/navigation'

describe('Header', () => {
  it('renders all navigation links and the CTA', () => {
    render(<Header />)
    for (const link of NAV_LINKS) {
      expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href)
    }
    expect(screen.getByRole('link', { name: HEADER_CTA.label })).toHaveAttribute(
      'href',
      HEADER_CTA.href,
    )
  })

  it('opens and closes the mobile menu', async () => {
    render(<Header />)
    const toggle = screen.getByRole('button', { name: 'Abrir menú de navegación' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: 'Menú de navegación móvil' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar menú de navegación' }))
    await waitFor(() =>
      expect(
        screen.queryByRole('navigation', { name: 'Menú de navegación móvil' }),
      ).not.toBeInTheDocument(),
    )
  })
})
