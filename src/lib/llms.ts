import en from '@/lib/i18n/en.json'
import es from '@/lib/i18n/es.json'
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from '@/lib/constants/site'

type Locale = 'es' | 'en'

type LlmsDictionary = {
  site: {
    description: string
    slogan: string
  }
  llms: {
    intro: string
    keyFacts: string[]
  }
  layout: {
    nav: {
      links: { label: string; href: string }[]
    }
  }
  services: {
    items: { title: string; description: string }[]
  }
  socialProof: {
    cases: { client: string; industry: string; result: string }[]
  }
  metadata: {
    about: { description: string }
    services: { description: string }
    contact: { description: string }
  }
}

const DICTIONARIES: Record<Locale, LlmsDictionary> = { es, en }

const SECTION_TITLES: Record<
  Locale,
  { pages: string; services: string; cases: string; facts: string }
> = {
  es: {
    pages: 'Páginas principales',
    services: 'Servicios',
    cases: 'Casos y resultados',
    facts: 'Datos clave',
  },
  en: {
    pages: 'Main pages',
    services: 'Services',
    cases: 'Case results',
    facts: 'Key facts',
  },
}

const pageUrl = (locale: Locale, path: string): string =>
  `${SITE_URL}/${locale}${path === '/' ? '' : path}`

const pageDescriptions = (dict: LlmsDictionary): Record<string, string> => ({
  '/': dict.site.description,
  '/about': dict.metadata.about.description,
  '/services': dict.metadata.services.description,
  '/contact': dict.metadata.contact.description,
})

function buildLocaleSection(locale: Locale, dict: LlmsDictionary): string[] {
  const titles = SECTION_TITLES[locale]
  const descriptions = pageDescriptions(dict)
  const suffix = `(${locale.toUpperCase()})`

  const pages = dict.layout.nav.links.map(
    (link) =>
      `- [${link.label}](${pageUrl(locale, link.href)}): ${descriptions[link.href] ?? dict.site.description}`,
  )
  const services = dict.services.items.map((item) => `- **${item.title}**: ${item.description}`)
  const cases = dict.socialProof.cases.map(
    (entry) => `- **${entry.client}** (${entry.industry}): ${entry.result}`,
  )
  const facts = dict.llms.keyFacts.map((fact) => `- ${fact}`)

  return [
    `## ${titles.pages} ${suffix}`,
    '',
    ...pages,
    '',
    `## ${titles.services} ${suffix}`,
    '',
    ...services,
    '',
    `## ${titles.cases} ${suffix}`,
    '',
    ...cases,
    '',
    `## ${titles.facts} ${suffix}`,
    '',
    ...facts,
    '',
  ]
}

export function buildLlmsTxt(): string {
  const esDict = DICTIONARIES.es
  const enDict = DICTIONARIES.en

  return [
    `# ${SITE_NAME}`,
    '',
    `> ${esDict.site.description} ${esDict.site.slogan}.`,
    `> ${enDict.site.description} ${enDict.site.slogan}.`,
    '',
    esDict.llms.intro,
    '',
    enDict.llms.intro,
    '',
    ...buildLocaleSection('es', esDict),
    ...buildLocaleSection('en', enDict),
    '## Contacto / Contact',
    '',
    `- Email: ${CONTACT_EMAIL}`,
    `- WhatsApp: ${CONTACT_PHONE}`,
    `- LinkedIn: ${SOCIAL_LINKS.linkedin}`,
    `- Instagram: ${SOCIAL_LINKS.instagram}`,
    `- Facebook: ${SOCIAL_LINKS.facebook}`,
    '',
    '## Optional',
    '',
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    `- [Versión en español](${SITE_URL}/es) · [English version](${SITE_URL}/en)`,
    '',
  ].join('\n')
}
