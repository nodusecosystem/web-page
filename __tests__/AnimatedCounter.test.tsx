import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AnimatedCounter } from '@/components/animations/AnimatedCounter'

describe('AnimatedCounter', () => {
  it('renders non-numeric values as plain text', () => {
    render(<AnimatedCounter value="24/7" />)
    expect(screen.getByText('24/7')).toBeInTheDocument()
  })

  it('keeps the raw value accessible via sr-only label', () => {
    const { container } = render(<AnimatedCounter value="+120%" />)
    const srOnly = container.querySelector('.sr-only')
    expect(srOnly).toHaveTextContent('+120%')
  })

  it('renders the final value with suffix', () => {
    const { container } = render(<AnimatedCounter value="25+" />)
    expect(container.querySelector('.sr-only')).toHaveTextContent('25+')
  })
})
