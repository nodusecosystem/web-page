import type { Metadata } from 'next'
import { PageTransition } from '@/components/animations/PageTransition'
import { JsonLd } from '@/components/seo/JsonLd'
import { TechStack } from '@/components/ui/TechStack'
import { getDictionary, getLocale } from '@/lib/i18n/dictionaries'
import { staticPageSchema } from '@/lib/schema'
import { buildPageMetadata, samePath } from '@/lib/seo/metadata'
import { AboutHero } from '@/views/AboutHero'
import { CTASection } from '@/views/CTASection'
import { MissionVisionValues } from '@/views/MissionVisionValues'
import { Philosophy } from '@/views/Philosophy'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary()
  const locale = await getLocale()

  return buildPageMetadata({
    locale,
    paths: samePath('/about'),
    title: dict.metadata.about.title,
    description: dict.metadata.about.description,
  })
}

export default async function AboutPage() {
  const dict = await getDictionary()
  const locale = await getLocale()

  return (
    <PageTransition>
      <AboutHero />
      <MissionVisionValues />
      <Philosophy />
      <TechStack />
      <CTASection />
      <JsonLd data={staticPageSchema(dict, locale, 'about')} />
    </PageTransition>
  )
}
