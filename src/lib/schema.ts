import {
  BUSINESS_HOURS,
  CONTACT_COUNTRY_CODE,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CRM_URL,
  OG_IMAGE,
  SERVICE_AREA,
  SITE_ALTERNATE_NAMES,
  SITE_LOGO_PATH,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from '@/lib/constants/site'
import { SERVICE_PAGE_IDS, servicePagePath, type ServicePageId } from '@/lib/constants/services'
import type { Dictionary, Locale } from '@/lib/i18n/dictionaries'
import { buildBreadcrumbs, navLabel, type Breadcrumb } from '@/lib/seo/breadcrumbs'
import { absoluteUrl } from '@/lib/seo/metadata'

type SchemaNode = Record<string, unknown>

type FaqItem = { question: string; answer: string }

const ORGANIZATION_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`

const ref = (id: string) => ({ '@id': id })
const serviceId = (locale: Locale, id: ServicePageId): string =>
  `${absoluteUrl(locale, servicePagePath(id, locale))}#service`

const areaServed = () => SERVICE_AREA.map(({ type, name }) => ({ '@type': type, name }))

export function organizationNode(dict: Dictionary, locale: Locale): SchemaNode {
  const { items } = dict.servicePages

  return {
    '@type': 'ProfessionalService',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAMES,
    slogan: dict.site.slogan,
    description: dict.site.description,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}${SITE_LOGO_PATH}`, width: 531, height: 496 },
    image: `${SITE_URL}${OG_IMAGE.path}`,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    priceRange: '$$',
    address: { '@type': 'PostalAddress', addressCountry: CONTACT_COUNTRY_CODE },
    areaServed: areaServed(),
    knowsAbout: SERVICE_PAGE_IDS.map((id) => items[id].serviceType),
    knowsLanguage: ['es', 'en'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: CONTACT_PHONE,
      email: CONTACT_EMAIL,
      availableLanguage: ['Spanish', 'English'],
      areaServed: areaServed(),
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: BUSINESS_HOURS.days,
      opens: BUSINESS_HOURS.opens,
      closes: BUSINESS_HOURS.closes,
    },
    sameAs: Object.values(SOCIAL_LINKS),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: dict.servicePages.common.catalogName,
      itemListElement: SERVICE_PAGE_IDS.map((id) => ({
        '@type': 'Offer',
        itemOffered: ref(serviceId(locale, id)),
      })),
    },
  }
}

export function websiteNode(locale: Locale): SchemaNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAMES,
    inLanguage: locale,
    publisher: ref(ORGANIZATION_ID),
  }
}

type WebPageInput = {
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'
  locale: Locale
  path: string
  name: string
  description: string
  breadcrumbs?: Breadcrumb[]
  mainEntity?: string
}

function webPageNodes({
  type = 'WebPage',
  locale,
  path,
  name,
  description,
  breadcrumbs,
  mainEntity,
}: WebPageInput): SchemaNode[] {
  const url = absoluteUrl(locale, path)
  const breadcrumbId = `${url}#breadcrumb`
  const page: SchemaNode = {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale,
    isPartOf: ref(WEBSITE_ID),
    about: ref(ORGANIZATION_ID),
    publisher: ref(ORGANIZATION_ID),
    primaryImageOfPage: `${SITE_URL}${OG_IMAGE.path}`,
    ...(breadcrumbs ? { breadcrumb: ref(breadcrumbId) } : {}),
    ...(mainEntity ? { mainEntity: ref(mainEntity) } : {}),
  }

  if (!breadcrumbs) return [page]

  return [
    page,
    {
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(locale, crumb.path),
      })),
    },
  ]
}

export function serviceNode(dict: Dictionary, locale: Locale, id: ServicePageId): SchemaNode {
  const page = dict.servicePages.items[id]

  return {
    '@type': 'Service',
    '@id': serviceId(locale, id),
    name: page.navLabel,
    serviceType: page.serviceType,
    description: page.metaDescription,
    url: absoluteUrl(locale, servicePagePath(id, locale)),
    provider: ref(ORGANIZATION_ID),
    areaServed: areaServed(),
    availableLanguage: ['Spanish', 'English'],
  }
}

const graph = (nodes: SchemaNode[]) => ({ '@context': 'https://schema.org', '@graph': nodes })

const baseNodes = (dict: Dictionary, locale: Locale): SchemaNode[] => [
  organizationNode(dict, locale),
  websiteNode(locale),
]

export function homeSchema(dict: Dictionary, locale: Locale) {
  return graph([
    ...baseNodes(dict, locale),
    ...webPageNodes({
      locale,
      path: '',
      name: dict.metadata.home.title,
      description: dict.site.description,
    }),
  ])
}

type StaticPageKey = 'about' | 'contact'

const STATIC_PAGE_TYPES: Record<StaticPageKey, WebPageInput['type']> = {
  about: 'AboutPage',
  contact: 'ContactPage',
}

export function staticPageSchema(dict: Dictionary, locale: Locale, key: StaticPageKey) {
  const path = `/${key}`
  const { title, description } = dict.metadata[key]

  return graph([
    ...baseNodes(dict, locale),
    ...webPageNodes({
      type: STATIC_PAGE_TYPES[key],
      locale,
      path,
      name: title,
      description,
      breadcrumbs: buildBreadcrumbs(dict, [{ name: navLabel(dict, path), path }]),
    }),
  ])
}

export function servicesPageSchema(dict: Dictionary, locale: Locale) {
  const path = '/services'
  const breadcrumbs = buildBreadcrumbs(dict, [{ name: navLabel(dict, path), path }])
  const listId = `${absoluteUrl(locale, path)}#services`

  return graph([
    ...baseNodes(dict, locale),
    ...webPageNodes({
      type: 'CollectionPage',
      locale,
      path,
      name: dict.metadata.services.title,
      description: dict.metadata.services.description,
      breadcrumbs,
      mainEntity: listId,
    }),
    {
      '@type': 'ItemList',
      '@id': listId,
      name: dict.servicePages.common.catalogName,
      itemListElement: SERVICE_PAGE_IDS.map((id, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: serviceNode(dict, locale, id),
      })),
    },
  ])
}

export function serviceLandingSchema(
  dict: Dictionary,
  locale: Locale,
  id: ServicePageId,
  breadcrumbs: Breadcrumb[],
) {
  const page = dict.servicePages.items[id]
  const path = servicePagePath(id, locale)
  const extraNodes: SchemaNode[] =
    id === 'crm-arm'
      ? [
          {
            '@type': 'DefinedTerm',
            '@id': `${absoluteUrl(locale, path)}#arm`,
            name: 'ARM (Automatic Relationship Management)',
            description: page.definition.paragraphs[0],
            url: absoluteUrl(locale, path),
          },
          {
            '@type': 'SoftwareApplication',
            '@id': `${CRM_URL}/#software`,
            name: 'Nodus CRM',
            url: CRM_URL,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            publisher: ref(ORGANIZATION_ID),
          },
        ]
      : []

  return graph([
    ...baseNodes(dict, locale),
    ...webPageNodes({
      locale,
      path,
      name: page.metaTitle,
      description: page.metaDescription,
      breadcrumbs,
      mainEntity: serviceId(locale, id),
    }),
    serviceNode(dict, locale, id),
    ...extraNodes,
  ])
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
