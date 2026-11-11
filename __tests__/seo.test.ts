import { describe, expect, it, vi } from 'vitest'
import robots, { AI_CRAWLERS } from '@/app/robots'
import sitemap from '@/app/sitemap'
import { GET as getLlmsFull } from '@/app/llms-full.txt/route'
import {
  SERVICE_PAGE_IDS,
  SERVICE_SLUGS,
  alternateLocalePath,
  findServicePageBySlug,
} from '@/lib/constants/services'
import { SITE_NAME, SITE_URL } from '@/lib/constants/site'
import en from '@/lib/i18n/en.json'
import es from '@/lib/i18n/es.json'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import { homeSchema, serviceLandingSchema } from '@/lib/schema'
import { buildPageMetadata, samePath } from '@/lib/seo/metadata'

vi.mock('next/root-params', () => ({
  lang: () => Promise.resolve('es'),
}))

type GraphNode = Record<string, unknown> & { '@type': string; '@id'?: string }

describe('buildPageMetadata', () => {
  const metadata = buildPageMetadata({
    locale: 'es',
    paths: { es: '/services/pauta-digital', en: '/services/paid-media' },
    title: 'Agencia de pauta digital',
    description: 'Descripción',
  })

  it('emits a complete Open Graph block so pages never lose the layout image', () => {
    expect(metadata.openGraph).toMatchObject({
      type: 'website',
      siteName: SITE_NAME,
      locale: 'es_LA',
      alternateLocale: ['en_US'],
      title: `Agencia de pauta digital | ${SITE_NAME}`,
      url: '/es/services/pauta-digital',
    })
    expect(metadata.openGraph?.images).toEqual([expect.objectContaining({ url: '/images/og-image.jpg' })])
    expect(metadata.twitter).toMatchObject({ title: `Agencia de pauta digital | ${SITE_NAME}`, description: 'Descripción' })
  })

  it('links each locale to its own translated slug', () => {
    expect(metadata.alternates).toEqual({
      canonical: '/es/services/pauta-digital',
      languages: {
        es: '/es/services/pauta-digital',
        en: '/en/services/paid-media',
        'x-default': '/es/services/pauta-digital',
      },
    })
  })

  it('keeps absolute titles untouched and forwards robots', () => {
    const result = buildPageMetadata({
      locale: 'en',
      paths: samePath('/onboarding'),
      title: { absolute: 'Home' },
      description: 'd',
      robots: { index: false, follow: false },
    })
    expect(result.openGraph?.title).toBe('Home')
    expect(result.robots).toEqual({ index: false, follow: false })
  })
})

describe('robots.txt', () => {
  const result = robots()
  const rules = Array.isArray(result.rules) ? result.rules : [result.rules]

  it('explicitly allows AI search and training crawlers', () => {
    const aiRule = rules.find((rule) => Array.isArray(rule.userAgent))
    expect(aiRule?.userAgent).toEqual(AI_CRAWLERS)
    expect(aiRule?.allow).toBe('/')
    expect(AI_CRAWLERS).toEqual(expect.arrayContaining(['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']))
  })

  it('does not block noindex pages, so crawlers can read their robots meta', () => {
    for (const rule of rules) expect(rule.disallow).toBeUndefined()
    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`)
  })
})

describe('sitemap.xml', () => {
  const entries = sitemap()

  it('lists every service landing in both languages with cross-locale alternates', () => {
    for (const id of SERVICE_PAGE_IDS) {
      const entry = entries.find((item) => item.url === `${SITE_URL}/es/services/${SERVICE_SLUGS[id].es}`)
      expect(entry?.alternates?.languages).toMatchObject({
        en: `${SITE_URL}/en/services/${SERVICE_SLUGS[id].en}`,
      })
    }
    expect(entries).toHaveLength((4 + SERVICE_PAGE_IDS.length) * 2)
  })

  it('uses a fixed content date instead of the build time', () => {
    expect(new Set(entries.map((entry) => entry.lastModified))).toEqual(new Set(['2026-11-11']))
  })
})

describe('JSON-LD graph', () => {
  const dict = es as Dictionary

  it('links the website and the page to a single organization entity', () => {
    const nodes = homeSchema(dict, 'es')['@graph'] as GraphNode[]
    const organization = nodes.find((node) => node['@type'] === 'ProfessionalService')
    expect(organization).toMatchObject({
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      logo: expect.objectContaining({ url: `${SITE_URL}/isotipo.png` }),
      alternateName: expect.arrayContaining(['Nodus Digital']),
    })
    expect(organization?.areaServed).toEqual(
      expect.arrayContaining([{ '@type': 'Place', name: 'Latin America' }, { '@type': 'Country', name: 'United States' }]),
    )
    const website = nodes.find((node) => node['@type'] === 'WebSite')
    expect(website?.publisher).toEqual({ '@id': `${SITE_URL}/#organization` })
  })

  it('describes the CRM/ARM landing with Service, DefinedTerm and the Nodus CRM software', () => {
    const nodes = serviceLandingSchema(dict, 'es', 'crm-arm', [])['@graph'] as GraphNode[]
    const types = nodes.map((node) => node['@type'])
    expect(types).toEqual(expect.arrayContaining(['Service', 'DefinedTerm', 'SoftwareApplication', 'BreadcrumbList']))
    const service = nodes.find((node) => node['@type'] === 'Service')
    expect(service?.provider).toEqual({ '@id': `${SITE_URL}/#organization` })
  })
})

describe('locale paths', () => {
  it('translates service slugs when switching language', () => {
    expect(alternateLocalePath('/es/services/automatizacion-ia', 'en')).toBe('/en/services/ai-automation')
    expect(alternateLocalePath('/en/services/seo', 'es')).toBe('/es/services/posicionamiento-seo')
    expect(alternateLocalePath('/es/about', 'en')).toBe('/en/about')
    expect(alternateLocalePath('/es', 'en')).toBe('/en')
  })

  it('resolves slugs per locale only', () => {
    expect(findServicePageBySlug('en', 'paid-media')).toBe('pauta-digital')
    expect(findServicePageBySlug('en', 'pauta-digital')).toBeUndefined()
  })

  it('keeps the same service landing keys in both dictionaries', () => {
    expect(Object.keys(en.servicePages.items)).toEqual([...SERVICE_PAGE_IDS])
    expect(Object.keys(es.servicePages.items)).toEqual([...SERVICE_PAGE_IDS])
  })
})

describe('llms-full.txt', () => {
  it('serves every service landing in both languages as markdown', async () => {
    const response = getLlmsFull()
    const content = await response.text()
    expect(response.headers.get('Content-Type')).toBe('text/markdown; charset=utf-8')
    for (const id of SERVICE_PAGE_IDS) {
      expect(content).toContain(es.servicePages.items[id].definition.heading)
      expect(content).toContain(en.servicePages.items[id].definition.heading)
    }
    expect(content).toContain('ARM (Automatic Relationship Management)')
  })
})
