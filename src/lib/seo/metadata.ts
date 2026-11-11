import type { Metadata } from 'next'
import { OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/constants/site'
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/dictionaries'

export type LocalizedPaths = Record<Locale, string>

export const OG_LOCALES: Record<Locale, string> = { es: 'es_LA', en: 'en_US' }

export const samePath = (path: string): LocalizedPaths => ({ es: path, en: path })

export const localizedPath = (locale: Locale, path: string): string => `/${locale}${path}`

export const absoluteUrl = (locale: Locale, path: string): string => `${SITE_URL}${localizedPath(locale, path)}`

type PageMetadataInput = {
  locale: Locale
  paths: LocalizedPaths
  title: string | { absolute: string }
  description: string
  robots?: Metadata['robots']
}

export function buildPageMetadata({
  locale,
  paths,
  title,
  description,
  robots,
}: PageMetadataInput): Metadata {
  const fullTitle = typeof title === 'string' ? `${title} | ${SITE_NAME}` : title.absolute
  const url = localizedPath(locale, paths[locale])
  const otherLocale: Locale = locale === 'es' ? 'en' : 'es'

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        es: localizedPath('es', paths.es),
        en: localizedPath('en', paths.en),
        'x-default': localizedPath(DEFAULT_LOCALE, paths[DEFAULT_LOCALE]),
      },
    },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      locale: OG_LOCALES[locale],
      alternateLocale: [OG_LOCALES[otherLocale]],
      images: [{ url: OG_IMAGE.path, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [OG_IMAGE.path],
    },
    ...(robots ? { robots } : {}),
  }
}

export function siteVerification(): Metadata['verification'] {
  const google = process.env.GOOGLE_SITE_VERIFICATION
  const bing = process.env.BING_SITE_VERIFICATION
  if (!google && !bing) return undefined

  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { 'msvalidate.01': bing } } : {}),
  }
}
