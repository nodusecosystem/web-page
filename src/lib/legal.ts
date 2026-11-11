import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/dictionaries'
import { buildPageMetadata, samePath } from '@/lib/seo/metadata'

export const LEGAL_DOCUMENTS = {
  notice: '/aviso-legal',
  privacy: '/politica-de-privacidad',
  cookies: '/politica-de-cookies',
} as const

export type LegalDocumentKey = keyof typeof LEGAL_DOCUMENTS

type LegalMetadataInput = {
  documentKey: LegalDocumentKey
  locale: Locale
  title: string
  description: string
}

export function legalMetadata({
  documentKey,
  locale,
  title,
  description,
}: LegalMetadataInput): Metadata {
  return buildPageMetadata({
    locale,
    paths: samePath(LEGAL_DOCUMENTS[documentKey]),
    title,
    description,
    robots: { index: false, follow: true },
  })
}
