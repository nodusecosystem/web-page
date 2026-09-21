import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from '@/lib/constants/site'

export const LEGAL_DOCUMENTS = {
  notice: '/aviso-legal',
  privacy: '/politica-de-privacidad',
  cookies: '/politica-de-cookies',
} as const

export type LegalDocumentKey = keyof typeof LEGAL_DOCUMENTS

type LegalMetadataInput = {
  documentKey: LegalDocumentKey
  locale: string
  title: string
  description: string
}

export function legalMetadata({
  documentKey,
  locale,
  title,
  description,
}: LegalMetadataInput): Metadata {
  const path = LEGAL_DOCUMENTS[documentKey]

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        es: `/es${path}`,
        en: `/en${path}`,
        'x-default': `/es${path}`,
      },
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/${locale}${path}`,
    },
  }
}
