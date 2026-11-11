import { render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Footer } from '@/components/layout/Footer'
import { SERVICE_PAGE_IDS, servicePagePath } from '@/lib/constants/services'
import { CONTACT_EMAIL, CONTACT_PHONE, SITE_NAME, SOCIAL_LINKS } from '@/lib/constants/site'
import { localePath } from '@/lib/format'
import esDict from '@/lib/i18n/es.json'

vi.mock('next/root-params', () => ({
  lang: () => Promise.resolve('es'),
}))

vi.mock('next/navigation', async (importOriginal) => ({
  ...(await importOriginal<typeof import('next/navigation')>()),
  usePathname: () => '/es/services/pauta-digital',
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

  it('links every service landing page', async () => {
    render(await Footer())
    for (const id of SERVICE_PAGE_IDS) {
      expect(
        screen.getByRole('link', { name: esDict.servicePages.items[id].navLabel }),
      ).toHaveAttribute('href', localePath('es', servicePagePath(id, 'es')))
    }
  })

  it('renders crawlable language links that translate the service slug', async () => {
    render(await Footer())
    const nav = screen.getByRole('navigation', { name: esDict.layout.footer.languageLabel })
    expect(within(nav).getByRole('link', { name: esDict.layout.langToggle.en })).toHaveAttribute(
      'href',
      '/en/services/paid-media',
    )
    expect(within(nav).getByRole('link', { name: esDict.layout.langToggle.es })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('renders the contact details and service area', async () => {
    render(await Footer())
    expect(screen.getByRole('link', { name: CONTACT_EMAIL })).toHaveAttribute('href', `mailto:${CONTACT_EMAIL}`)
    expect(screen.getByRole('link', { name: CONTACT_PHONE })).toHaveAttribute('href', 'tel:+573106769289')
    expect(screen.getByText(esDict.layout.footer.serviceArea)).toBeInTheDocument()
  })

  it('renders social media links pointing to the configured profiles', async () => {
    render(await Footer())
    expect(screen.getByRole('link', { name: `Perfil de LinkedIn de ${SITE_NAME}` })).toHaveAttribute(
      'href',
      SOCIAL_LINKS.linkedin,
    )
    expect(screen.getByRole('link', { name: `Perfil de Instagram de ${SITE_NAME}` })).toHaveAttribute(
      'href',
      SOCIAL_LINKS.instagram,
    )
    expect(screen.getByRole('link', { name: `Perfil de Facebook de ${SITE_NAME}` })).toHaveAttribute(
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
