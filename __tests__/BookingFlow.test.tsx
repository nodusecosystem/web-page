import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { BookingCalendar } from '@/components/ui/BookingCalendar'
import { useBookingStore } from '@/lib/booking-store'
import { buildWhatsAppLink } from '@/lib/constants/site'
import { sendContactEmail } from '@/lib/emailjs'
import { ContactForm } from '@/views/ContactForm'
import esDict from '@/lib/i18n/es.json'

vi.mock('@/lib/emailjs', () => ({
  sendContactEmail: vi.fn(),
}))

const FORM_STRINGS = esDict.contact.form
const SCHEDULER = esDict.contact.scheduler
const sendContactEmailMock = vi.mocked(sendContactEmail)

const TODAY = new Date(2026, 8, 17, 12)
const TODAY_ISO = TODAY.toISOString()

function renderBookingExperience() {
  return render(
    <>
      <BookingCalendar strings={SCHEDULER} locale="es" today={TODAY_ISO} />
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
    vi.useFakeTimers()
    vi.setSystemTime(TODAY)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts on today with the next whole hour', () => {
    renderBookingExperience()

    expect(screen.getByRole('button', { name: '17' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByLabelText(SCHEDULER.timeLabel)).toHaveValue('13:00')
  })

  it('blocks days before today and weekends', () => {
    renderBookingExperience()

    expect(screen.getByRole('button', { name: '10' })).toBeDisabled()
    expect(screen.getByRole('button', { name: '19' })).toBeDisabled()
    expect(screen.getByRole('button', { name: '20' })).toBeDisabled()
    expect(screen.getByRole('button', { name: '17' })).toBeEnabled()
  })

  it('shows the confirmed slot in the form', () => {
    renderBookingExperience()

    fireEvent.click(screen.getByRole('button', { name: '21' }))
    fireEvent.change(screen.getByLabelText(SCHEDULER.timeLabel), { target: { value: '11:00' } })
    fireEvent.click(screen.getByRole('button', { name: SCHEDULER.confirm }))

    expect(screen.getByText(`${FORM_STRINGS.bookingTitle}:`)).toBeInTheDocument()
    expect(
      screen.getByText(`21 de septiembre ${FORM_STRINGS.bookingConnector} 11:00`),
    ).toBeInTheDocument()
  })

  it('navigates across months without a limit', () => {
    renderBookingExperience()

    expect(screen.getByText('septiembre de 2026')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: SCHEDULER.previousMonthLabel })).toBeDisabled()

    fireEvent.click(screen.getByRole('button', { name: SCHEDULER.nextMonthLabel }))
    expect(screen.getByText('octubre de 2026')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: SCHEDULER.previousMonthLabel })).toBeEnabled()

    fireEvent.click(screen.getByRole('button', { name: SCHEDULER.nextMonthLabel }))
    fireEvent.click(screen.getByRole('button', { name: SCHEDULER.nextMonthLabel }))
    expect(screen.getByText('diciembre de 2026')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: SCHEDULER.previousMonthLabel }))
    expect(screen.getByText('noviembre de 2026')).toBeInTheDocument()
  })

  it('rejects a time outside the 09:00-17:00 range', () => {
    renderBookingExperience()

    fireEvent.change(screen.getByLabelText(SCHEDULER.timeLabel), { target: { value: '18:00' } })
    fireEvent.click(screen.getByRole('button', { name: SCHEDULER.confirm }))

    expect(screen.getByText(SCHEDULER.timeRangeError)).toBeInTheDocument()
    expect(screen.queryByText(new RegExp(FORM_STRINGS.bookingTitle))).not.toBeInTheDocument()
  })

  it('includes the confirmed slot in the submitted payload', async () => {
    renderBookingExperience()

    fireEvent.click(screen.getByRole('button', { name: '21' }))
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

    await act(async () => {})

    expect(screen.getByText(FORM_STRINGS.successTitle)).toBeInTheDocument()
    expect(sendContactEmailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Ana Pérez',
        email: 'ana@example.com',
        bookingDay: '21 de septiembre',
        bookingTime: '11:00',
      }),
    )
  })
})
