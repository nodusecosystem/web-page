export const SITE_NAME = 'nodus: digital strategy'
export const SITE_URL = 'https://nodusdigital.com'

export const CONTACT_EMAIL = 'hola@nodusdigital.com'
export const CONTACT_PHONE = '+34 600 000 000'
export const CONTACT_CITY = 'Madrid'
export const CONTACT_COUNTRY = 'España'

export const WHATSAPP_NUMBER = '34600000000'

export const buildWhatsAppLink = (message: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/company/nodus-digital-strategy',
  instagram: 'https://www.instagram.com/nodus.digital',
  facebook: 'https://www.facebook.com/nodusdigital',
}
