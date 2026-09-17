import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ContactForm } from '@/views/ContactForm'
import { buildWhatsAppLink } from '@/lib/constants/site'
import { sendContactEmail } from '@/lib/emailjs'
import esDict from '@/lib/i18n/es.json'

vi.mock('@/lib/emailjs', () => ({
  sendContactEmail: vi.fn(),
}))

const FORM_STRINGS = esDict.contact.form
const FORM_RESPONSE_TIME = esDict.site.responseTime
const FORM_WHATSAPP_HREF = buildWhatsAppLink(esDict.site.whatsappMessage)
const sendContactEmailMock = vi.mocked(sendContactEmail)

function renderForm() {
  return render(
    <ContactForm
      strings={FORM_STRINGS}
      responseTime={FORM_RESPONSE_TIME}
      whatsappHref={FORM_WHATSAPP_HREF}
      locale="es"
    />,
  )
}

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText(FORM_STRINGS.fields.name.label), {
    target: { value: 'Ana Pérez' },
  })
  fireEvent.change(screen.getByLabelText(FORM_STRINGS.fields.email.label), {
    target: { value: 'ana@example.com' },
  })
  fireEvent.click(screen.getByRole('checkbox'))
}

describe('ContactForm', () => {
  beforeEach(() => {
    sendContactEmailMock.mockReset()
    sendContactEmailMock.mockResolvedValue(undefined)
  })

  it('shows validation errors when submitting empty fields', () => {
    renderForm()
    fireEvent.click(screen.getByRole('button', { name: FORM_STRINGS.submit }))

    expect(screen.getByText(/El nombre debe tener al menos/)).toBeInTheDocument()
    expect(screen.getByText(FORM_STRINGS.messages.emailInvalid)).toBeInTheDocument()
    expect(screen.getByText(FORM_STRINGS.messages.consentRequired)).toBeInTheDocument()
    expect(sendContactEmailMock).not.toHaveBeenCalled()
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

  it('requires data processing consent before submitting', () => {
    renderForm()
    fireEvent.change(screen.getByLabelText(FORM_STRINGS.fields.name.label), {
      target: { value: 'Ana Pérez' },
    })
    fireEvent.change(screen.getByLabelText(FORM_STRINGS.fields.email.label), {
      target: { value: 'ana@example.com' },
    })

    fireEvent.click(screen.getByRole('button', { name: FORM_STRINGS.submit }))
    expect(screen.getByText(FORM_STRINGS.messages.consentRequired)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('checkbox'))
    expect(screen.queryByText(FORM_STRINGS.messages.consentRequired)).not.toBeInTheDocument()
  })

  it('sends the form through EmailJS and shows the success state', async () => {
    renderForm()
    fillRequiredFields()

    fireEvent.click(screen.getByRole('button', { name: FORM_STRINGS.submit }))

    expect(await screen.findByText(FORM_STRINGS.successTitle)).toBeInTheDocument()
    expect(sendContactEmailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Ana Pérez',
        email: 'ana@example.com',
        website: '',
        challenge: '',
        message: '',
        bookingDay: '',
        bookingTime: '',
        locale: 'es',
      }),
    )
  })

  it('shows the submit error when EmailJS fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    sendContactEmailMock.mockRejectedValueOnce(new Error('EmailJS unavailable'))

    try {
      renderForm()
      fillRequiredFields()
      fireEvent.click(screen.getByRole('button', { name: FORM_STRINGS.submit }))

      expect(await screen.findByText(FORM_STRINGS.submitError)).toBeInTheDocument()
    } finally {
      consoleSpy.mockRestore()
    }
  })

  it('renders the direct contact channels including WhatsApp', () => {
    renderForm()

    expect(
      screen.getByRole('link', { name: new RegExp(FORM_STRINGS.directContact.whatsappLabel) }),
    ).toHaveAttribute('href', FORM_WHATSAPP_HREF)
    expect(screen.getByText(FORM_STRINGS.operation.heading)).toBeInTheDocument()
    expect(screen.getByText(FORM_STRINGS.reassurance.expert)).toBeInTheDocument()
    expect(screen.getByText(FORM_STRINGS.reassurance.privacy)).toBeInTheDocument()
  })
})
