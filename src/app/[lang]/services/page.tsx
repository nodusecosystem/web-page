import type { Metadata } from 'next'
import { lang } from 'next/root-params'
import { TechStack } from '@/components/ui/TechStack'
import { SITE_NAME, SITE_URL } from '@/lib/constants/site'
import { getDictionary, type Locale } from '@/lib/i18n/dictionaries'
import { serviceListSchema } from '@/lib/schema'
import { CTASection } from '@/views/CTASection'
import { ServiceDetails } from '@/views/ServiceDetails'
import { ServicesHero } from '@/views/ServicesHero'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary()
  const locale = await lang()

  return {
    title: dict.metadata.services.title,
    description: dict.metadata.services.description,
    alternates: {
      canonical: `/${locale}/services`,
      languages: { es: '/es/services', en: '/en/services' },
    },
    openGraph: {
      title: `${dict.metadata.services.title} | ${SITE_NAME}`,
      description: dict.metadata.services.description,
      url: `${SITE_URL}/${locale}/services`,
    },
  }
}

export default async function ServicesPage() {
  const dict = await getDictionary()
  const locale = await lang()

  return (
    <>
      <ServicesHero />
      <ServiceDetails />
      <TechStack />
      <CTASection />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListSchema(dict, locale as Locale)) }}
      />
    </>
  )
}
