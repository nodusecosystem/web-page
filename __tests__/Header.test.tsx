import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Header } from '@/components/layout/Header'
import esDict from '@/lib/i18n/es.json'

vi.mock('next/navigation', () => ({
  usePathname: () => '/es/about',
}))

const HEADER_PROPS = {
  links: esDict.layout.nav.links,
  cta: esDict.layout.nav.cta,
  ariaLabels: esDict.layout.header,
  homeHref: '/es',
  currentLocale: 'es',
  langToggle: esDict.layout.langToggle,
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

  it('opens the language dropdown and marks the current locale as active', () => {
    render(<Header {...HEADER_PROPS} />)
    const toggle = screen.getByRole('button', { name: HEADER_PROPS.langToggle.ariaLabel })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    const spanish = screen.getByRole('menuitem', { name: HEADER_PROPS.langToggle.es })
    const english = screen.getByRole('menuitem', { name: HEADER_PROPS.langToggle.en })

    expect(spanish).toHaveAttribute('aria-current', 'true')
    expect(english).not.toHaveAttribute('aria-current')
    expect(spanish).toHaveAttribute('href', '/es/about')
    expect(english).toHaveAttribute('href', '/en/about')
  })

  it('closes the language dropdown when clicking outside', async () => {
    render(<Header {...HEADER_PROPS} />)
    fireEvent.click(screen.getByRole('button', { name: HEADER_PROPS.langToggle.ariaLabel }))
    expect(screen.getByRole('menuitem', { name: HEADER_PROPS.langToggle.en })).toBeInTheDocument()

    fireEvent.mouseDown(document.body)
    await waitFor(() =>
      expect(
        screen.queryByRole('menuitem', { name: HEADER_PROPS.langToggle.en }),
      ).not.toBeInTheDocument(),
    )
  })

  it('closes the language dropdown with the Escape key', async () => {
    render(<Header {...HEADER_PROPS} />)
    fireEvent.click(screen.getByRole('button', { name: HEADER_PROPS.langToggle.ariaLabel }))
    expect(screen.getByRole('menuitem', { name: HEADER_PROPS.langToggle.en })).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape' })
    await waitFor(() =>
      expect(
        screen.queryByRole('menuitem', { name: HEADER_PROPS.langToggle.en }),
      ).not.toBeInTheDocument(),
    )
  })
})
