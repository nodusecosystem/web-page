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

  it('renders the hint and links it with aria-describedby', () => {
    render(
      <Input
        id="email"
        label="Email"
        hint="Priorizamos respuestas a cuentas de empresa."
      />,
    )
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-describedby', 'email-hint')

    const hint = screen.getByText('Priorizamos respuestas a cuentas de empresa.')
    expect(hint).toHaveAttribute('id', 'email-hint')
  })

  it('describes the field with both hint and error when present', () => {
    render(<Input id="email" label="Email" hint="Usa tu correo de empresa" error="Email inválido" />)
    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'aria-describedby',
      'email-hint email-error',
    )
  })
})
