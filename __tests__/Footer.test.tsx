import { render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Footer } from '@/components/layout/Footer'
import { SITE_NAME, SOCIAL_LINKS } from '@/lib/constants/site'
import { localePath } from '@/lib/format'
import esDict from '@/lib/i18n/es.json'

vi.mock('next/root-params', () => ({
  lang: () => Promise.resolve('es'),
}))

describe('Footer', () => {
  it('renders the brand name and copyright with the current year', async () => {
    render(await Footer())
    const year = new Date().getFullYear()
    expect(
      screen.getByText(`© ${year} ${SITE_NAME}. ${esDict.layout.footer.rightsSuffix}`),
    ).toBeInTheDocument()
  })

  it('renders navigation links with their localized labels', async () => {
    render(await Footer())
    const nav = screen.getByRole('navigation', { name: esDict.layout.footer.navHeading })
    for (const link of esDict.layout.nav.links) {
      expect(within(nav).getByRole('link', { name: link.label })).toHaveAttribute(
        'href',
        localePath('es', link.href),
      )
    }
  })

  it('links every service to the /services page', async () => {
    render(await Footer())
    for (const service of esDict.services.items) {
      expect(screen.getByRole('link', { name: service.title })).toHaveAttribute(
        'href',
        localePath('es', '/services'),
      )
    }
  })

  it('renders social media links pointing to the configured profiles', async () => {
    render(await Footer())
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

  it('renders legal links', async () => {
    render(await Footer())
    for (const link of esDict.layout.footer.legalLinks) {
      expect(screen.getByRole('link', { name: link.label })).toHaveAttribute(
        'href',
        localePath('es', link.href),
      )
    }
  })
})
