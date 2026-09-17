import emailjs from '@emailjs/browser'

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

export type ContactEmailParams = {
  name: string
  email: string
  website: string
  challenge: string
  message: string
  bookingDay: string
  bookingTime: string
  locale: string
}

export async function sendContactEmail(params: ContactEmailParams): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      'EmailJS is not configured. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env.local',
    )
  }

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      name: params.name,
      email: params.email,
      website: params.website || 'No indicado',
      challenge: params.challenge || 'No indicado',
      message: params.message || 'Sin detalles adicionales',
      booking: params.bookingDay
        ? `${params.bookingDay} · ${params.bookingTime}`
        : 'Cualquier día',
      locale: params.locale,
    },
    { publicKey: PUBLIC_KEY },
  )
}
