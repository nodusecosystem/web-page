export const SITE_NAME = 'nodus: digital strategy'
export const SITE_URL = 'https://nodusecosystem.com'

export const CONTACT_EMAIL = 'nodusecosystem@gmail.com'
export const CONTACT_PHONE = '+57 310 6769289'
export const CONTACT_COUNTRY = 'Colombia'
export const CONTACT_COUNTRY_CODE = 'CO'

export const WHATSAPP_NUMBER = '573106769289'

export const buildWhatsAppLink = (message: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/company/nodusecosystem',
  instagram: 'https://www.instagram.com/nodusecosystem',
  facebook: 'https://www.facebook.com/nodusecosystem',
}
