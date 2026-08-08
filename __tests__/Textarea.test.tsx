import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Textarea } from '@/components/ui/Textarea'

describe('Textarea', () => {
  it('associates the label with the textarea', () => {
    render(<Textarea id="mensaje" label="Mensaje" />)
    const textarea = screen.getByLabelText('Mensaje')
    expect(textarea).toHaveAttribute('id', 'mensaje')
  })

  it('does not render error attributes when there is no error', () => {
    render(<Textarea id="mensaje" label="Mensaje" />)
    const textarea = screen.getByLabelText('Mensaje')
    expect(textarea).not.toHaveAttribute('aria-invalid')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('marks the field as invalid and announces the error', () => {
    render(<Textarea id="mensaje" label="Mensaje" error="El mensaje es demasiado corto" />)
    const textarea = screen.getByLabelText('Mensaje')
    expect(textarea).toHaveAttribute('aria-invalid', 'true')
    expect(textarea).toHaveAttribute('aria-describedby', 'mensaje-error')

    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('El mensaje es demasiado corto')
    expect(alert).toHaveAttribute('id', 'mensaje-error')
  })
})
