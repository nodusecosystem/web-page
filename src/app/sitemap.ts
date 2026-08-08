import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants/site'

const PAGE_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/nosotros', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/servicios', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/contacto', changeFrequency: 'monthly', priority: 0.8 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return PAGE_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path === '/' ? '' : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
