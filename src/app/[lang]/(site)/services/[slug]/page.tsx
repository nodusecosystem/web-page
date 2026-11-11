import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { lang } from 'next/root-params'
import { PageTransition } from '@/components/animations/PageTransition'
import { JsonLd } from '@/components/seo/JsonLd'
import { FAQSection } from '@/components/ui/FAQSection'
import {
  SERVICE_PAGE_IDS,
  SERVICE_SLUGS,
  findServicePageBySlug,
  servicePagePath,
  type ServicePageId,
} from '@/lib/constants/services'
import { getDictionary, getLocale, hasLocale, type Dictionary, type Locale } from '@/lib/i18n/dictionaries'
import { serviceLandingSchema } from '@/lib/schema'
import { buildBreadcrumbs, navLabel } from '@/lib/seo/breadcrumbs'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { CTASection } from '@/views/CTASection'
import { ServiceLanding } from '@/views/ServiceLanding'

export const dynamicParams = false

type ServicePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const locale = await lang()
  if (!hasLocale(locale)) return []
  return SERVICE_PAGE_IDS.map((id) => ({ slug: SERVICE_SLUGS[id][locale] }))
}

async function resolveServicePage(params: ServicePageProps['params']): Promise<{
  id: ServicePageId
  locale: Locale
}> {
  const { slug } = await params
  const locale = await getLocale()
  const id = findServicePageBySlug(locale, slug)
  if (!id) notFound()
  return { id, locale }
}

const landingBreadcrumbs = (dict: Dictionary, locale: Locale, id: ServicePageId) =>
  buildBreadcrumbs(dict, [
    { name: navLabel(dict, '/services'), path: '/services' },
    { name: dict.servicePages.items[id].navLabel, path: servicePagePath(id, locale) },
  ])

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { id, locale } = await resolveServicePage(params)
  const dict = await getDictionary()
  const page = dict.servicePages.items[id]

  return buildPageMetadata({
    locale,
    paths: { es: servicePagePath(id, 'es'), en: servicePagePath(id, 'en') },
    title: page.metaTitle,
    description: page.metaDescription,
  })
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { id, locale } = await resolveServicePage(params)
  const dict = await getDictionary()
  const breadcrumbs = landingBreadcrumbs(dict, locale, id)
  const page = dict.servicePages.items[id]

  return (
    <PageTransition>
      <ServiceLanding id={id} breadcrumbs={breadcrumbs} />
      <FAQSection items={page.faq} heading={dict.servicePages.common.faqHeading} />
      <CTASection heading={page.ctaHeading} subheading={page.ctaSubheading} />
      <JsonLd data={serviceLandingSchema(dict, locale, id, breadcrumbs)} />
    </PageTransition>
  )
}
