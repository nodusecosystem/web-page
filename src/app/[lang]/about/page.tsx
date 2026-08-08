import type { Metadata } from 'next'
import { lang } from 'next/root-params'
import { TechStack } from '@/components/ui/TechStack'
import { SITE_NAME, SITE_URL } from '@/lib/constants/site'
import { getDictionary, type Locale } from '@/lib/i18n/dictionaries'
import { aboutPageSchema } from '@/lib/schema'
import { AboutHero } from '@/views/AboutHero'
import { AboutStats } from '@/views/AboutStats'
import { CTASection } from '@/views/CTASection'
import { MissionVisionValues } from '@/views/MissionVisionValues'
import { Philosophy } from '@/views/Philosophy'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary()
  const locale = await lang()

  return {
    title: dict.metadata.about.title,
    description: dict.metadata.about.description,
    alternates: {
      canonical: `/${locale}/about`,
      languages: { es: '/es/about', en: '/en/about' },
    },
    openGraph: {
      title: `${dict.metadata.about.title} | ${SITE_NAME}`,
      description: dict.metadata.about.description,
      url: `${SITE_URL}/${locale}/about`,
    },
  }
}

export default async function AboutPage() {
  const dict = await getDictionary()
  const locale = await lang()

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema(dict, locale as Locale)) }}
      />
    </>
  )
}
