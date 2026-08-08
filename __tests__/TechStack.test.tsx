import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TechStack } from '@/components/ui/TechStack'
import { TECH_STACK } from '@/lib/constants/tech-stack'

describe('TechStack', () => {
  it('renders the section heading', () => {
    render(<TechStack />)
    expect(screen.getByText('Tecnologías y plataformas que dominamos')).toBeInTheDocument()
  })

  it('renders every technology name', () => {
    render(<TechStack />)
    for (const tech of TECH_STACK) {
      expect(screen.getAllByText(tech.name)).toHaveLength(2)
    }
  })

  it('duplicates the list for the seamless marquee loop', () => {
    render(<TechStack />)
    const list = screen.getAllByRole('listitem')
    expect(list).toHaveLength(TECH_STACK.length * 2)
  })

  it('marks technology icons as decorative', () => {
    render(<TechStack />)
    const icons = document.querySelectorAll('svg[aria-hidden="true"]')
    expect(icons.length).toBeGreaterThanOrEqual(TECH_STACK.length)
  })
})
