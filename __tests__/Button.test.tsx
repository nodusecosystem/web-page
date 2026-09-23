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

  it('uses the solid variant and medium size by default', () => {
    render(<Button>Haz clic</Button>)
    expect(screen.getByRole('button')).toHaveClass('glass-btn', 'variant-solid', 'size-md')
  })

  it('applies the requested variant and size', () => {
    render(
      <Button variant="outline" size="lg">
        Outline
      </Button>,
    )
    expect(screen.getByRole('button', { name: 'Outline' })).toHaveClass(
      'variant-outline',
      'size-lg',
    )
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

  it('renders internal hrefs as a Next link', () => {
    render(<Button href="/es/contact">Ir a contacto</Button>)
    expect(screen.getByRole('link', { name: 'Ir a contacto' })).toHaveAttribute(
      'href',
      '/es/contact',
    )
  })
})
