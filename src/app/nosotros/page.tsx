import type { Metadata } from 'next'
import { TechStack } from '@/components/ui/TechStack'
import { ABOUT_PAGE_SCHEMA } from '@/lib/constants/schema'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants/site'
import { AboutHero } from '@/views/AboutHero'
import { AboutStats } from '@/views/AboutStats'
import { CTASection } from '@/views/CTASection'
import { MissionVisionValues } from '@/views/MissionVisionValues'
import { Philosophy } from '@/views/Philosophy'

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Descubre la historia, misión y filosofía de nodus: digital strategy. Un partner de aceleración digital que se mide por resultados, no por actividad.',
  alternates: {
    canonical: '/nosotros',
  },
  openGraph: {
    title: `Nosotros | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/nosotros`,
  },
}

export default function NosotrosPage() {
  return (
    <>
      <AboutHero />
      <MissionVisionValues />
      <Philosophy />
      <AboutStats />
      <TechStack />
      <CTASection />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_PAGE_SCHEMA) }}
      />
    </>
  )
}
