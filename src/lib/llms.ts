import en from '@/lib/i18n/en.json'
import es from '@/lib/i18n/es.json'
import { SERVICE_PAGE_IDS, servicePagePath } from '@/lib/constants/services'
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CRM_URL,
  RELATED_SEARCH_TERMS,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  SOCIAL_LINKS,
} from '@/lib/constants/site'

type Locale = 'es' | 'en'
type LlmsDictionary = typeof es | typeof en

const SECTION_TITLES: Record<
  Locale,
  {
    pages: string
    services: string
    cases: string
    facts: string
    faq: string
    includes: string
    process: string
    audience: string
  }
> = {
  es: {
    pages: 'Páginas principales',
    services: 'Servicios',
    cases: 'Casos y resultados',
    facts: 'Datos clave',
    faq: 'Preguntas frecuentes',
    includes: 'Qué incluye',
    process: 'Proceso',
    audience: 'Para quién es',
  },
  en: {
    pages: 'Main pages',
    services: 'Services',
    cases: 'Case results',
    facts: 'Key facts',
    faq: 'Frequently asked questions',
    includes: 'What it includes',
    process: 'Process',
    audience: 'Who it is for',
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

const faqLines = (items: { question: string; answer: string }[]): string[] =>
  items.flatMap((item) => [`### ${item.question}`, '', item.answer, ''])

function buildLocaleSection(locale: Locale, dict: LlmsDictionary): string[] {
  const titles = SECTION_TITLES[locale]
  const descriptions = pageDescriptions(dict)
  const suffix = `(${locale.toUpperCase()})`
  const { items } = dict.servicePages

  const pages = dict.layout.nav.links.map(
    (link) =>
      `- [${link.label}](${pageUrl(locale, link.href)}): ${descriptions[link.href] ?? dict.site.description}`,
  )
  const services = SERVICE_PAGE_IDS.map(
    (id) =>
      `- [${items[id].navLabel}](${pageUrl(locale, servicePagePath(id, locale))}): ${items[id].metaDescription}`,
  )
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
    `## ${titles.faq} ${suffix}`,
    '',
    ...faqLines(dict.faq.items),
  ]
}

function buildHeader(): string[] {
  return [
    `# ${SITE_NAME}`,
    '',
    `> ${es.site.description} ${es.site.slogan}.`,
    `> ${en.site.description} ${en.site.slogan}.`,
    '',
    es.llms.intro,
    '',
    en.llms.intro,
    '',
    `Términos de búsqueda relacionados: ${RELATED_SEARCH_TERMS.es.join(', ')}.`,
    `Related search terms: ${RELATED_SEARCH_TERMS.en.join(', ')}.`,
    '',
  ]
}

const CONTACT_LINES = [
  '## Contacto / Contact',
  '',
  `- Email: ${CONTACT_EMAIL}`,
  `- WhatsApp: ${CONTACT_PHONE}`,
  `- LinkedIn: ${SOCIAL_LINKS.linkedin}`,
  `- Instagram: ${SOCIAL_LINKS.instagram}`,
  `- Facebook: ${SOCIAL_LINKS.facebook}`,
  `- Nodus CRM (ARM): ${CRM_URL}`,
  '',
]

export function buildLlmsTxt(): string {
  return [
    ...buildHeader(),
    ...buildLocaleSection('es', es),
    ...buildLocaleSection('en', en),
    ...CONTACT_LINES,
    '## Optional',
    '',
    `- [Full content / Contenido completo](${SITE_URL}/llms-full.txt)`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    `- [Versión en español](${SITE_URL}/es) · [English version](${SITE_URL}/en)`,
    '',
  ].join('\n')
}

function buildServiceDetail(locale: Locale, dict: LlmsDictionary): string[] {
  const titles = SECTION_TITLES[locale]

  return SERVICE_PAGE_IDS.flatMap((id) => {
    const page = dict.servicePages.items[id]
    return [
      `## ${page.titleStart} ${page.titleAccent}`,
      '',
      `URL: ${pageUrl(locale, servicePagePath(id, locale))}`,
      '',
      page.intro,
      '',
      `### ${page.definition.heading}`,
      '',
      ...page.definition.paragraphs.flatMap((paragraph) => [paragraph, '']),
      `### ${titles.includes}`,
      '',
      ...page.includes.map((item) => `- **${item.title}**: ${item.description}`),
      '',
      `### ${titles.process}`,
      '',
      ...page.process.map((step, index) => `${index + 1}. **${step.title}**: ${step.description}`),
      '',
      `### ${titles.audience}`,
      '',
      page.audience.text,
      '',
      ...page.audience.items.map((item) => `- ${item}`),
      '',
      `### ${titles.faq}`,
      '',
      ...page.faq.flatMap((item) => [`**${item.question}**`, '', item.answer, '']),
    ]
  })
}

export function buildLlmsFullTxt(): string {
  return [
    `# ${SITE_NAME} (${SITE_TAGLINE}): contenido completo / full content`,
    '',
    ...buildHeader().slice(2),
    '# Español',
    '',
    ...buildServiceDetail('es', es),
    `## ${SECTION_TITLES.es.faq}`,
    '',
    ...faqLines(es.faq.items),
    '# English',
    '',
    ...buildServiceDetail('en', en),
    `## ${SECTION_TITLES.en.faq}`,
    '',
    ...faqLines(en.faq.items),
    ...CONTACT_LINES,
  ].join('\n')
}
