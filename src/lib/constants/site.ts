export const SITE_NAME = 'NODUS ECOSYSTEM'
export const SITE_TAGLINE = 'digital strategy'
export const SITE_ALTERNATE_NAMES = ['NODUS', 'Nodus Ecosystem', 'Nodus Digital', 'nodus: digital strategy']
export const SITE_URL = 'https://nodusecosystem.com'
export const SITE_LOGO_PATH = '/isotipo.png'
export const OG_IMAGE = { path: '/images/og-image.jpg', width: 1200, height: 630 } as const

export const CRM_URL = 'https://crm.nodusecosystem.com'

export const GA_MEASUREMENT_ID = 'G-KHHHJZD9LB'

export const CONTACT_EMAIL = 'nodusecosystem@gmail.com'
export const CONTACT_PHONE = '+57 310 6769289'
export const CONTACT_COUNTRY = 'Colombia'
export const CONTACT_COUNTRY_CODE = 'CO'

export const BUSINESS_HOURS = {
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  opens: '09:00',
  closes: '18:00',
} as const

export const SERVICE_AREA = [
  { type: 'Place', name: 'Latin America' },
  { type: 'Place', name: 'North America' },
  { type: 'Country', name: 'Colombia' },
  { type: 'Country', name: 'Mexico' },
  { type: 'Country', name: 'United States' },
  { type: 'Country', name: 'Canada' },
] as const

export const WHATSAPP_NUMBER = '573106769289'

export const buildWhatsAppLink = (message: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/company/nodusecosystem',
  instagram: 'https://www.instagram.com/nodusecosystem',
  facebook: 'https://www.facebook.com/share/19WHZyaD8q/',
}
