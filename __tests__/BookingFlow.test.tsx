import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useBookingStore } from '@/lib/booking-store'
import { buildWhatsAppLink } from '@/lib/constants/site'
import { sendContactEmail } from '@/lib/emailjs'
import { CallScheduler } from '@/views/CallScheduler'
import { ContactForm } from '@/views/ContactForm'
import esDict from '@/lib/i18n/es.json'

vi.mock('next/root-params', () => ({
  lang: () => Promise.resolve('es'),
}))

vi.mock('@/lib/emailjs', () => ({
  sendContactEmail: vi.fn(),
}))

const FORM_STRINGS = esDict.contact.form
const SCHEDULER = esDict.contact.scheduler
const sendContactEmailMock = vi.mocked(sendContactEmail)

async function renderBookingExperience() {
  return render(
    <>
      {await CallScheduler()}
      <ContactForm
        strings={FORM_STRINGS}
        responseTime={esDict.site.responseTime}
        whatsappHref={buildWhatsAppLink(esDict.site.whatsappMessage)}
        locale="es"
      />
    </>,
  )
}

describe('booking flow', () => {
  beforeEach(() => {
    useBookingStore.setState({ booking: null })
    sendContactEmailMock.mockReset()
    sendContactEmailMock.mockResolvedValue(undefined)
  })

  it('shows the confirmed slot in the form', async () => {
    await renderBookingExperience()

    fireEvent.click(screen.getByRole('button', { name: '20' }))
    fireEvent.change(screen.getByLabelText(SCHEDULER.timeLabel), { target: { value: '11:00' } })
    fireEvent.click(screen.getByRole('button', { name: SCHEDULER.confirm }))

    expect(
      screen.getByText(`${FORM_STRINGS.bookingTitle}: 20 de agosto · 11:00`),
    ).toBeInTheDocument()
  })

  it('rejects a time outside the 09:00-17:00 range', async () => {
    await renderBookingExperience()

    fireEvent.change(screen.getByLabelText(SCHEDULER.timeLabel), { target: { value: '18:00' } })
    fireEvent.click(screen.getByRole('button', { name: SCHEDULER.confirm }))

    expect(screen.getByText(SCHEDULER.timeRangeError)).toBeInTheDocument()
    expect(screen.queryByText(new RegExp(FORM_STRINGS.bookingTitle))).not.toBeInTheDocument()
  })

  it('includes the confirmed slot in the submitted payload', async () => {
    await renderBookingExperience()

    fireEvent.click(screen.getByRole('button', { name: '20' }))
    fireEvent.change(screen.getByLabelText(SCHEDULER.timeLabel), { target: { value: '11:00' } })
    fireEvent.click(screen.getByRole('button', { name: SCHEDULER.confirm }))

    fireEvent.change(screen.getByLabelText(FORM_STRINGS.fields.name.label), {
      target: { value: 'Ana Pérez' },
    })
    fireEvent.change(screen.getByLabelText(FORM_STRINGS.fields.email.label), {
      target: { value: 'ana@example.com' },
    })
    fireEvent.click(screen.getByRole('checkbox'))
    fireEvent.click(screen.getByRole('button', { name: FORM_STRINGS.submit }))

    expect(await screen.findByText(FORM_STRINGS.successTitle)).toBeInTheDocument()
    expect(sendContactEmailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Ana Pérez',
        email: 'ana@example.com',
        bookingDay: '20 de agosto',
        bookingTime: '11:00',
      }),
    )
  })
})
