import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ContactForm } from '@/views/ContactForm'
import esDict from '@/lib/i18n/es.json'

const FORM_STRINGS = esDict.contact.form
const FORM_SERVICES = esDict.services.items
const FORM_RESPONSE_TIME = esDict.site.responseTime

function renderForm() {
  return render(
    <ContactForm
      strings={FORM_STRINGS}
      services={FORM_SERVICES}
      responseTime={FORM_RESPONSE_TIME}
    />,
  )
}

describe('ContactForm', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows validation errors when submitting empty fields', () => {
    renderForm()
    fireEvent.click(screen.getByRole('button', { name: FORM_STRINGS.submit }))

    expect(screen.getByText(/El nombre debe tener al menos/)).toBeInTheDocument()
    expect(screen.getByText(FORM_STRINGS.messages.emailInvalid)).toBeInTheDocument()
    expect(screen.getByText(/El mensaje debe tener al menos/)).toBeInTheDocument()
  })

  it('clears the field error while typing', () => {
    renderForm()
    fireEvent.click(screen.getByRole('button', { name: FORM_STRINGS.submit }))
    expect(screen.getByText(FORM_STRINGS.messages.emailInvalid)).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText(FORM_STRINGS.fields.email.label), {
      target: { value: 'ana@example.com' },
    })
    expect(screen.queryByText(FORM_STRINGS.messages.emailInvalid)).not.toBeInTheDocument()
  })

  it('submits the form and shows the success state', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)
    vi.useFakeTimers()

    try {
      renderForm()
      fireEvent.change(screen.getByLabelText(FORM_STRINGS.fields.name.label), {
        target: { value: 'Ana Pérez' },
      })
      fireEvent.change(screen.getByLabelText(FORM_STRINGS.fields.email.label), {
        target: { value: 'ana@example.com' },
      })
      fireEvent.change(screen.getByLabelText(FORM_STRINGS.fields.budget.label), {
        target: { value: '1000-2500' },
      })
      fireEvent.change(screen.getByLabelText(FORM_STRINGS.fields.message.label), {
        target: { value: 'Quiero un plan mensual de estrategia digital para mi empresa.' },
      })

      fireEvent.click(screen.getByRole('button', { name: FORM_STRINGS.submit }))
      await act(async () => {
        await vi.advanceTimersByTimeAsync(1300)
      })

      expect(consoleSpy).toHaveBeenCalledWith('Contact form payload (mock):', expect.any(Object))
      expect(screen.getByText(FORM_STRINGS.successTitle)).toBeInTheDocument()
    } finally {
      consoleSpy.mockRestore()
    }
  })
})
