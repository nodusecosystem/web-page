import type { Metadata } from 'next'
import { PageTransition } from '@/components/animations/PageTransition'
import { JsonLd } from '@/components/seo/JsonLd'
import { TechStack } from '@/components/ui/TechStack'
import { getDictionary, getLocale } from '@/lib/i18n/dictionaries'
import { servicesPageSchema } from '@/lib/schema'
import { buildPageMetadata, samePath } from '@/lib/seo/metadata'
import { CTASection } from '@/views/CTASection'
import { ServiceDetails } from '@/views/ServiceDetails'
import { ServicesHero } from '@/views/ServicesHero'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary()
  const locale = await getLocale()

  return buildPageMetadata({
    locale,
    paths: samePath('/services'),
    title: dict.metadata.services.title,
    description: dict.metadata.services.description,
  })
}

export default async function ServicesPage() {
  const dict = await getDictionary()
  const locale = await getLocale()

  return (
    <PageTransition>
      <ServicesHero />
      <ServiceDetails />
      <TechStack />
      <CTASection />
      <JsonLd data={servicesPageSchema(dict, locale)} />
    </PageTransition>
  )
}
