import type { Locale } from '@/lib/i18n/dictionaries'

export const SERVICE_PAGE_IDS = [
  'pauta-digital',
  'desarrollo-web',
  'automatizacion-ia',
  'crm-arm',
  'posicionamiento-seo',
  'estrategia-de-contenido',
] as const

export type ServicePageId = (typeof SERVICE_PAGE_IDS)[number]

export const SERVICE_SLUGS: Record<ServicePageId, Record<Locale, string>> = {
  'pauta-digital': { es: 'pauta-digital', en: 'paid-media' },
  'desarrollo-web': { es: 'desarrollo-web', en: 'web-development' },
  'automatizacion-ia': { es: 'automatizacion-ia', en: 'ai-automation' },
  'crm-arm': { es: 'crm-arm', en: 'crm-arm' },
  'posicionamiento-seo': { es: 'posicionamiento-seo', en: 'seo' },
  'estrategia-de-contenido': { es: 'estrategia-de-contenido', en: 'content-strategy' },
}

export const PLAN_SERVICE_PAGES: Record<string, ServicePageId[]> = {
  estrategia: ['estrategia-de-contenido'],
  'pauta-digital': ['pauta-digital'],
  desarrollo: ['desarrollo-web', 'posicionamiento-seo'],
  automatizacion: ['automatizacion-ia', 'crm-arm'],
}

export const servicePagePath = (id: ServicePageId, locale: Locale): string =>
  `/services/${SERVICE_SLUGS[id][locale]}`

export const findServicePageBySlug = (locale: Locale, slug: string): ServicePageId | undefined =>
  SERVICE_PAGE_IDS.find((id) => SERVICE_SLUGS[id][locale] === slug)

const isLocaleCode = (value: string | undefined): value is Locale => value === 'es' || value === 'en'

export function alternateLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split('/')
  const current = segments[1]
  segments[1] = target

  if (segments[2] === 'services' && segments[3] && isLocaleCode(current)) {
    const id = findServicePageBySlug(current, segments[3])
    if (id) segments[3] = SERVICE_SLUGS[id][target]
  }

  return segments.join('/') || '/'
}
