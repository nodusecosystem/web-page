import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ContactForm } from '@/views/ContactForm'

describe('ContactForm', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows validation errors when submitting empty fields', () => {
    render(<ContactForm />)
    fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

    expect(screen.getByText(/El nombre debe tener al menos/)).toBeInTheDocument()
    expect(screen.getByText('Introduce un email válido')).toBeInTheDocument()
    expect(screen.getByText(/El mensaje debe tener al menos/)).toBeInTheDocument()
  })

  it('clears the field error while typing', () => {
    render(<ContactForm />)
    fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }))
    expect(screen.getByText('Introduce un email válido')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ana@example.com' } })
    expect(screen.queryByText('Introduce un email válido')).not.toBeInTheDocument()
  })

  it('submits the form and shows the success state', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)
    vi.useFakeTimers()

    try {
      render(<ContactForm />)
      fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana Pérez' } })
      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ana@example.com' } })
      fireEvent.change(screen.getByLabelText('Presupuesto estimado'), {
        target: { value: '1000-2500' },
      })
      fireEvent.change(screen.getByLabelText('Mensaje'), {
        target: { value: 'Quiero un plan mensual de estrategia digital para mi empresa.' },
      })

      fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }))
      await act(async () => {
        await vi.advanceTimersByTimeAsync(1300)
      })

      expect(consoleSpy).toHaveBeenCalledWith('Contact form payload (mock):', expect.any(Object))
      expect(screen.getByText('¡Mensaje enviado!')).toBeInTheDocument()
    } finally {
      consoleSpy.mockRestore()
    }
  })
})
