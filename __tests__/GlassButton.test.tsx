import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { GlassButton, GlassFilterDefs } from '@/components/ui/GlassButton'

describe('GlassButton', () => {
  it('renders a native button by default', () => {
    render(<GlassButton>Continuar</GlassButton>)
    const button = screen.getByRole('button', { name: 'Continuar' })
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveClass('glass-btn', 'variant-solid', 'size-md')
  })

  it('applies every variant and size', () => {
    const { rerender } = render(
      <GlassButton variant="ghost" size="sm">
        Ghost
      </GlassButton>,
    )
    expect(screen.getByRole('button', { name: 'Ghost' })).toHaveClass('variant-ghost', 'size-sm')

    rerender(
      <GlassButton variant="outline" size="lg">
        Outline
      </GlassButton>,
    )
    expect(screen.getByRole('button', { name: 'Outline' })).toHaveClass(
      'variant-outline',
      'size-lg',
    )
  })

  it('renders internal hrefs with next/link and external ones with an anchor', () => {
    const { rerender } = render(<GlassButton href="/es/services">Servicios</GlassButton>)
    expect(screen.getByRole('link', { name: 'Servicios' })).toHaveAttribute('href', '/es/services')

    rerender(<GlassButton href="https://example.com">Externo</GlassButton>)
    expect(screen.getByRole('link', { name: 'Externo' })).toHaveAttribute(
      'href',
      'https://example.com',
    )
  })

  it('disables the button and ignores clicks', () => {
    const handleClick = vi.fn()
    render(
      <GlassButton disabled onClick={handleClick}>
        Enviar
      </GlassButton>,
    )
    const button = screen.getByRole('button', { name: 'Enviar' })
    expect(button).toBeDisabled()
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('calls onClick on click', () => {
    const handleClick = vi.fn()
    render(<GlassButton onClick={handleClick}>Enviar</GlassButton>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('tilts in 3D with the pointer and resets on leave', async () => {
    render(<GlassButton>Empieza</GlassButton>)
    const button = screen.getByRole('button', { name: 'Empieza' })
    vi.spyOn(button, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 200,
      bottom: 100,
      width: 200,
      height: 100,
      toJSON: () => ({}),
    } as DOMRect)

    act(() => {
      button.dispatchEvent(
        new MouseEvent('pointermove', { bubbles: true, clientX: 200, clientY: 50 }),
      )
    })

    await waitFor(() => {
      expect(button.style.getPropertyValue('--ry')).toBe('9.00deg')
      expect(button.style.getPropertyValue('--rx')).toBe('0.00deg')
    })

    fireEvent.pointerOut(button, { relatedTarget: document.body })

    await waitFor(() => {
      expect(button.style.getPropertyValue('--rx')).toBe('0deg')
      expect(button.style.getPropertyValue('--ry')).toBe('0deg')
    })
  })

  it('keeps icon and text inside a single flex label', () => {
    const { container } = render(
      <GlassButton>
        Empieza
        <svg data-testid="icon" />
      </GlassButton>,
    )
    const label = container.querySelector('.glass-btn-label')
    expect(label).toBeInTheDocument()
    expect(label).toHaveTextContent('Empieza')
    expect(label?.querySelector('svg')).toBeInTheDocument()
  })
})

describe('GlassFilterDefs', () => {
  it('defines the refraction filter used by the buttons', () => {
    const { container } = render(<GlassFilterDefs />)
    const filter = container.querySelector('filter#glass-distortion')
    expect(filter).toBeInTheDocument()
    expect(filter?.querySelector('feTurbulence')).toBeInTheDocument()
    expect(filter?.querySelector('feDisplacementMap')).toBeInTheDocument()
  })
})
