import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Input } from '@/components/ui/Input'

describe('Input', () => {
  it('associates the label with the input field', () => {
    render(<Input id="nombre" label="Nombre" />)
    const input = screen.getByLabelText('Nombre')
    expect(input).toHaveAttribute('id', 'nombre')
  })

  it('passes through native input attributes', () => {
    render(<Input id="email" label="Email" type="email" placeholder="tu@email.com" />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveAttribute('placeholder', 'tu@email.com')
  })

  it('does not render error attributes when there is no error', () => {
    render(<Input id="nombre" label="Nombre" />)
    const input = screen.getByLabelText('Nombre')
    expect(input).not.toHaveAttribute('aria-invalid')
    expect(input).not.toHaveAttribute('aria-describedby')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('marks the field as invalid and announces the error', () => {
    render(<Input id="nombre" label="Nombre" error="Este campo es obligatorio" />)
    const input = screen.getByLabelText('Nombre')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', 'nombre-error')

    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Este campo es obligatorio')
    expect(alert).toHaveAttribute('id', 'nombre-error')
  })
})
