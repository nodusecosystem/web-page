import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import OnboardingLayout from '@/app/[lang]/onboarding/layout'
import esDict from '@/lib/i18n/es.json'

vi.mock('next/root-params', () => ({
  lang: () => Promise.resolve('es'),
}))

describe('OnboardingLayout', () => {
  it('renders the brand and the language toggle without the site navigation', async () => {
    render(await OnboardingLayout({ children: <p>Contenido</p> }))

    expect(screen.getByText('Contenido')).toBeInTheDocument()

    const toggle = screen.getByRole('navigation', { name: esDict.layout.langToggle.ariaLabel })
    expect(toggle).toBeInTheDocument()
    const current = screen.getByRole('link', { name: esDict.layout.langToggle.es })
    expect(current).toHaveAttribute('href', '/es/onboarding')
    expect(current).toHaveAttribute('aria-current', 'true')
    expect(screen.getByRole('link', { name: esDict.layout.langToggle.en })).toHaveAttribute(
      'href',
      '/en/onboarding',
    )

    expect(
      screen.queryByRole('navigation', { name: esDict.layout.header.nav }),
    ).not.toBeInTheDocument()
  })
})
