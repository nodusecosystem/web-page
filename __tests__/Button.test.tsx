import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders as a button element with its children', () => {
    render(<Button>Haz clic</Button>)
    expect(screen.getByRole('button', { name: 'Haz clic' })).toBeInTheDocument()
  })

  it('renders as an anchor when href is provided', () => {
    render(<Button href="#contacto">Contáctanos</Button>)
    const link = screen.getByRole('link', { name: 'Contáctanos' })
    expect(link).toHaveAttribute('href', '#contacto')
  })

  it('applies the primary variant and default size classes', () => {
    render(<Button>Haz clic</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-deep-blue')
    expect(button).toHaveClass('h-11')
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Haz clic</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
