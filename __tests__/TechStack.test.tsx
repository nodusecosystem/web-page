import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TechStack } from '@/components/ui/TechStack'
import { TECH_STACK } from '@/lib/constants/tech-stack'
import esDict from '@/lib/i18n/es.json'

vi.mock('next/root-params', () => ({
  lang: () => Promise.resolve('es'),
}))

describe('TechStack', () => {
  it('renders the section heading', async () => {
    render(await TechStack())
    expect(screen.getByText(esDict.techStack.heading)).toBeInTheDocument()
  })

  it('renders every technology name', async () => {
    render(await TechStack())
    for (const tech of TECH_STACK) {
      expect(screen.getAllByText(tech.name)).toHaveLength(2)
    }
  })

  it('duplicates the list for the seamless marquee loop', async () => {
    render(await TechStack())
    const list = screen.getAllByRole('listitem')
    expect(list).toHaveLength(TECH_STACK.length * 2)
  })

  it('marks technology icons as decorative', async () => {
    render(await TechStack())
    const icons = document.querySelectorAll('svg[aria-hidden="true"]')
    expect(icons.length).toBeGreaterThanOrEqual(TECH_STACK.length)
  })
})
