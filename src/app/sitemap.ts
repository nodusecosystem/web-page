import type { MetadataRoute } from 'next'
import { SERVICE_PAGE_IDS, servicePagePath } from '@/lib/constants/services'
import { DEFAULT_LOCALE, LOCALES } from '@/lib/i18n/dictionaries'
import { absoluteUrl, samePath, type LocalizedPaths } from '@/lib/seo/metadata'

type SitemapRoute = {
  paths: LocalizedPaths
  lastModified: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

const CONTENT_UPDATED_AT = '2026-11-11'

const PAGE_ROUTES: SitemapRoute[] = [
  { paths: samePath(''), lastModified: CONTENT_UPDATED_AT, changeFrequency: 'monthly', priority: 1 },
  { paths: samePath('/services'), lastModified: CONTENT_UPDATED_AT, changeFrequency: 'monthly', priority: 0.9 },
  ...SERVICE_PAGE_IDS.map((id) => ({
    paths: { es: servicePagePath(id, 'es'), en: servicePagePath(id, 'en') },
    lastModified: CONTENT_UPDATED_AT,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  })),
  { paths: samePath('/about'), lastModified: CONTENT_UPDATED_AT, changeFrequency: 'monthly', priority: 0.7 },
  { paths: samePath('/contact'), lastModified: CONTENT_UPDATED_AT, changeFrequency: 'monthly', priority: 0.8 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    PAGE_ROUTES.map((route) => ({
      url: absoluteUrl(locale, route.paths[locale]),
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          es: absoluteUrl('es', route.paths.es),
          en: absoluteUrl('en', route.paths.en),
          'x-default': absoluteUrl(DEFAULT_LOCALE, route.paths[DEFAULT_LOCALE]),
        },
      },
    })),
  )
}
