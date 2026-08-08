import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Footer } from '@/components/layout/Footer'
import { FOOTER_LEGAL_LINKS, NAV_LINKS } from '@/lib/constants/navigation'
import { SERVICES } from '@/lib/constants/services'
import { SITE_NAME, SOCIAL_LINKS } from '@/lib/constants/site'

describe('Footer', () => {
  it('renders the brand name and copyright with the current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(
      screen.getByText(`© ${year} ${SITE_NAME}. Todos los derechos reservados.`),
    ).toBeInTheDocument()
  })

  it('renders navigation links with their real hrefs', () => {
    render(<Footer />)
    const nav = screen.getByRole('navigation', {
      name: 'Enlaces de navegación del pie de página',
    })
    for (const link of NAV_LINKS) {
      expect(within(nav).getByRole('link', { name: link.label })).toHaveAttribute(
        'href',
        link.href,
      )
    }
  })

  it('links every service to the /servicios page', () => {
    render(<Footer />)
    for (const service of SERVICES) {
      expect(screen.getByRole('link', { name: service.title })).toHaveAttribute(
        'href',
        '/servicios',
      )
    }
  })

  it('renders social media links pointing to the configured profiles', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Perfil de LinkedIn de nodus: digital strategy' })).toHaveAttribute(
      'href',
      SOCIAL_LINKS.linkedin,
    )
    expect(screen.getByRole('link', { name: 'Perfil de Instagram de nodus: digital strategy' })).toHaveAttribute(
      'href',
      SOCIAL_LINKS.instagram,
    )
    expect(screen.getByRole('link', { name: 'Perfil de Facebook de nodus: digital strategy' })).toHaveAttribute(
      'href',
      SOCIAL_LINKS.facebook,
    )
  })

  it('renders legal links', () => {
    render(<Footer />)
    for (const link of FOOTER_LEGAL_LINKS) {
      expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href)
    }
  })
})
