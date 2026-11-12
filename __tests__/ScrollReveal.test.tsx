import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ScrollReveal } from '@/components/animations/ScrollReveal'

describe('ScrollReveal', () => {
  it('renders its content visible in the HTML, driven only by the scroll-reveal class', () => {
    render(
      <ScrollReveal className="h-full">
        <p>Contenido</p>
      </ScrollReveal>,
    )
    const wrapper = screen.getByText('Contenido').parentElement
    expect(wrapper).toHaveClass('scroll-reveal', 'h-full')
    expect(wrapper).not.toHaveAttribute('style')
  })

  it('exposes its grid position for the cascade', () => {
    render(
      <ScrollReveal index={2}>
        <p>Tercera</p>
      </ScrollReveal>,
    )
    const wrapper = screen.getByText('Tercera').parentElement
    expect(wrapper?.style.getPropertyValue('--reveal-index')).toBe('2')
  })
})
