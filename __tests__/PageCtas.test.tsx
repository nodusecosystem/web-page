import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import esDict from '@/lib/i18n/es.json'
import { AboutHero } from '@/views/AboutHero'
import { CTASection } from '@/views/CTASection'
import { ServicesHero } from '@/views/ServicesHero'

vi.mock('next/root-params', () => ({
  lang: () => Promise.resolve('es'),
}))

describe('localized call to action links', () => {
  it('renders ServicesHero with a single h1 and a localized contact link', async () => {
    render(await ServicesHero())

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: esDict.servicesPage.hero.ctaPrimary })).toHaveAttribute(
      'href',
      '/es/contact',
    )
  })

  it('links AboutHero CTAs to the localized services and contact pages', async () => {
    render(await AboutHero())

    expect(screen.getByRole('link', { name: esDict.about.hero.ctaPrimary })).toHaveAttribute(
      'href',
      '/es/services',
    )
    expect(screen.getByRole('link', { name: esDict.about.hero.ctaSecondary })).toHaveAttribute(
      'href',
      '/es/contact',
    )
  })

  it('links the CTASection button to the localized contact page', async () => {
    render(await CTASection({}))

    expect(screen.getByRole('link', { name: esDict.cta.button })).toHaveAttribute(
      'href',
      '/es/contact',
    )
  })
})
