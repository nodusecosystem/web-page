import type { Metadata } from 'next'
import { PageTransition } from '@/components/animations/PageTransition'
import { getDictionary, getLocale } from '@/lib/i18n/dictionaries'
import { buildPageMetadata, samePath } from '@/lib/seo/metadata'
import { OnboardingHero } from '@/views/OnboardingHero'
import { OnboardingView } from '@/views/OnboardingView'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary()
  const locale = await getLocale()

  return buildPageMetadata({
    locale,
    paths: samePath('/onboarding'),
    title: dict.metadata.onboarding.title,
    description: dict.metadata.onboarding.description,
    robots: { index: false, follow: false },
  })
}

export default function OnboardingPage() {
  return (
    <PageTransition>
      <OnboardingHero />
      <OnboardingView />
    </PageTransition>
  )
}
