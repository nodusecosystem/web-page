import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants/site'
import { LOCALES } from '@/lib/i18n/dictionaries'

const PAGE_ROUTES: {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}[] = [
  { path: '', changeFrequency: 'monthly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return LOCALES.flatMap((locale) =>
    PAGE_ROUTES.map((route) => ({
      url: `${SITE_URL}/${locale}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((otherLocale) => [
            otherLocale,
            `${SITE_URL}/${otherLocale}${route.path}`,
          ]),
        ),
      },
    })),
  )
}
