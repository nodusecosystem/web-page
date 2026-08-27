import {
  CONTACT_CITY,
  CONTACT_COUNTRY,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from '@/lib/constants/site'
import type { Dictionary, Locale } from '@/lib/i18n/dictionaries'

const pageUrl = (locale: Locale, path: string): string => `${SITE_URL}/${locale}${path}`

export function professionalServiceSchema(dict: Dictionary) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    description: dict.site.description,
    url: SITE_URL,
    image: `${SITE_URL}/images/og-image.jpg`,
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
    makesOffer: dict.services.items.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
      },
    })),
  }
}

export function aboutPageSchema(dict: Dictionary, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `${dict.metadata.about.title} | ${SITE_NAME}`,
    description: dict.metadata.about.description,
    url: pageUrl(locale, '/about'),
    mainEntity: {
      '@type': 'ProfessionalService',
      name: SITE_NAME,
      description: dict.site.description,
      slogan: dict.site.slogan,
      url: SITE_URL,
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      address: {
        '@type': 'PostalAddress',
        addressLocality: CONTACT_CITY,
        addressCountry: 'ES',
      },
      areaServed: CONTACT_COUNTRY,
      knowsAbout: dict.services.items.map((service) => service.title),
    },
  }
}

export function contactPageSchema(dict: Dictionary, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `${dict.metadata.contact.title} | ${SITE_NAME}`,
    description: dict.metadata.contact.description,
    url: pageUrl(locale, '/contact'),
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
        availableLanguage: [locale === 'es' ? 'Spanish' : 'English'],
      },
    },
  }
}

export function serviceListSchema(dict: Dictionary, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Servicios de nodus: digital strategy',
    description: dict.metadata.services.description,
    itemListElement: dict.services.items.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        provider: {
          '@type': 'ProfessionalService',
          name: SITE_NAME,
          url: pageUrl(locale, '/services'),
        },
      },
    })),
  }
}

export function faqPageSchema(dict: Dictionary) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: dict.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
