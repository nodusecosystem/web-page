import {
  CONTACT_CITY,
  CONTACT_COUNTRY,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SLOGAN,
  SOCIAL_LINKS,
} from '@/lib/constants/site'
import { SERVICES } from '@/lib/constants/services'

export const PROFESSIONAL_SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/images/og-image.png`,
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE,
  priceRange: '$$',
  areaServed: CONTACT_COUNTRY,
  address: {
    '@type': 'PostalAddress',
    addressLocality: CONTACT_CITY,
    addressCountry: 'ES',
  },
  sameAs: Object.values(SOCIAL_LINKS),
  makesOffer: SERVICES.map((service) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: service.title,
      description: service.description,
    },
  })),
} as const

export const ABOUT_PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: `Nosotros | ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
  url: `${SITE_URL}/nosotros`,
  mainEntity: {
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    slogan: SLOGAN,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    address: {
      '@type': 'PostalAddress',
      addressLocality: CONTACT_CITY,
      addressCountry: 'ES',
    },
    areaServed: CONTACT_COUNTRY,
    knowsAbout: SERVICES.map((service) => service.title),
  },
} as const

export const CONTACT_PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: `Contacto | ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
  url: `${SITE_URL}/contacto`,
  mainEntity: {
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    url: SITE_URL,
    telephone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: CONTACT_CITY,
      addressCountry: 'ES',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: CONTACT_PHONE,
      email: CONTACT_EMAIL,
      availableLanguage: ['Spanish'],
    },
  },
} as const

export const SERVICE_LIST_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Servicios de nodus: digital strategy',
  description: SITE_DESCRIPTION,
  itemListElement: SERVICES.map((service, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Service',
      name: service.title,
      description: service.description,
      provider: {
        '@type': 'ProfessionalService',
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
  })),
} as const
