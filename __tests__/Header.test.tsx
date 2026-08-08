import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Header } from '@/components/layout/Header'
import esDict from '@/lib/i18n/es.json'

const HEADER_PROPS = {
  links: esDict.layout.nav.links,
  cta: esDict.layout.nav.cta,
  ariaLabels: esDict.layout.header,
  homeHref: '/es',
}

describe('Header', () => {
  it('renders all navigation links and the CTA', () => {
    render(<Header {...HEADER_PROPS} />)
    for (const link of HEADER_PROPS.links) {
      expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href)
    }
    expect(screen.getByRole('link', { name: HEADER_PROPS.cta.label })).toHaveAttribute(
      'href',
      HEADER_PROPS.cta.href,
    )
  })

  it('opens and closes the mobile menu', async () => {
    render(<Header {...HEADER_PROPS} />)
    const toggle = screen.getByRole('button', { name: HEADER_PROPS.ariaLabels.openMenu })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getByRole('navigation', { name: HEADER_PROPS.ariaLabels.mobileNav }),
    ).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: HEADER_PROPS.ariaLabels.closeMenu }))
    await waitFor(() =>
      expect(
        screen.queryByRole('navigation', { name: HEADER_PROPS.ariaLabels.mobileNav }),
      ).not.toBeInTheDocument(),
    )
  })
})
