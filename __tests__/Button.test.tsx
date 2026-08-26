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

  it('uses the solid variant by default with brand colors', () => {
    render(<Button>Haz clic</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveStyle('--sb-tint: #3aeaea')
    expect(button).toHaveStyle('--sb-tint-opacity: 1')
    expect(button).toHaveStyle('--sb-text-color: #071919')
  })

  it('uses glassmorphism on outline and ghost variants', () => {
    render(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button', { name: 'Outline' })).toHaveStyle('--sb-blur: 10px')
  })

  it('preserves submit type for forms', () => {
    render(<Button type="submit">Enviar</Button>)
    expect(screen.getByRole('button', { name: 'Enviar' })).toHaveAttribute('type', 'submit')
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Haz clic</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
