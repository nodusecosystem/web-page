import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import esDict from '@/lib/i18n/es.json'
import { OnboardingHero } from '@/views/OnboardingHero'

vi.mock('next/root-params', () => ({
  lang: () => Promise.resolve('es'),
}))

describe('OnboardingHero', () => {
  it('renders a single h1 with informative badges that are not buttons', async () => {
    render(await OnboardingHero())

    expect(
      screen.getByRole('heading', { level: 1, name: esDict.onboarding.hero.title }),
    ).toBeInTheDocument()
    expect(screen.getByText(esDict.onboarding.hero.timeBadge)).toBeInTheDocument()
    expect(screen.getByText(esDict.onboarding.hero.privacyNote)).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
