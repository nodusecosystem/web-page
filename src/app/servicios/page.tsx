import type { Metadata } from 'next'
import { TechStack } from '@/components/ui/TechStack'
import { SERVICE_LIST_SCHEMA } from '@/lib/constants/schema'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants/site'
import { CTASection } from '@/views/CTASection'
import { ServiceDetails } from '@/views/ServiceDetails'
import { ServicesHero } from '@/views/ServicesHero'

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Estrategia digital y branding, campañas Meta Ads y Google Ads, desarrollo web con Next.js y automatización. Planes mensuales con entregables claros.',
  alternates: {
    canonical: '/servicios',
  },
  openGraph: {
    title: `Servicios | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/servicios`,
  },
}

export default function ServiciosPage() {
  return (
    <>
      <ServicesHero />
      <ServiceDetails />
      <TechStack />
      <CTASection />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_LIST_SCHEMA) }}
      />
    </>
  )
}
