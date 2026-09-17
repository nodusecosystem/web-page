import { beforeEach, describe, expect, it, vi } from 'vitest'
import { sendContactEmail, type ContactEmailParams } from '@/lib/emailjs'

const { sendMock } = vi.hoisted(() => {
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'service_test'
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'template_test'
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'public_test'

  return {
    sendMock: vi.fn().mockResolvedValue({ status: 200, text: 'OK' }),
  }
})

vi.mock('@emailjs/browser', () => ({
  default: { send: sendMock },
}))

const BASE_PARAMS: ContactEmailParams = {
  name: 'Ana Pérez',
  email: 'ana@example.com',
  website: '',
  challenge: '',
  message: '',
  bookingDay: '',
  bookingTime: '',
  locale: 'es',
}

describe('sendContactEmail', () => {
  beforeEach(() => {
    sendMock.mockClear()
  })

  it('sends "Cualquier día" when there is no booking', async () => {
    await sendContactEmail(BASE_PARAMS)

    expect(sendMock).toHaveBeenCalledWith(
      'service_test',
      'template_test',
      expect.objectContaining({ booking: 'Cualquier día' }),
      { publicKey: 'public_test' },
    )
  })

  it('sends the selected day and time when there is a booking', async () => {
    await sendContactEmail({ ...BASE_PARAMS, bookingDay: '20 de agosto', bookingTime: '11:00' })

    expect(sendMock).toHaveBeenCalledWith(
      'service_test',
      'template_test',
      expect.objectContaining({ booking: '20 de agosto · 11:00' }),
      { publicKey: 'public_test' },
    )
  })

  it('fills the optional fields with fallbacks', async () => {
    await sendContactEmail(BASE_PARAMS)

    expect(sendMock).toHaveBeenCalledWith(
      'service_test',
      'template_test',
      expect.objectContaining({
        website: 'No indicado',
        challenge: 'No indicado',
        message: 'Sin detalles adicionales',
      }),
      { publicKey: 'public_test' },
    )
  })
})
