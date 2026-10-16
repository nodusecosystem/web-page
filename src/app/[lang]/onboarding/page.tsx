import type { Metadata } from 'next'
import { lang } from 'next/root-params'
import { PageTransition } from '@/components/animations/PageTransition'
import { SITE_NAME, SITE_URL } from '@/lib/constants/site'
import { getDictionary, type Locale } from '@/lib/i18n/dictionaries'
import { OnboardingHero } from '@/views/OnboardingHero'
import { OnboardingView } from '@/views/OnboardingView'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary()
  const locale = (await lang()) as Locale

  return {
    title: dict.metadata.onboarding.title,
    description: dict.metadata.onboarding.description,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `/${locale}/onboarding`,
      languages: { es: '/es/onboarding', en: '/en/onboarding', 'x-default': '/es/onboarding' },
    },
    openGraph: {
      title: `${dict.metadata.onboarding.title} | ${SITE_NAME}`,
      description: dict.metadata.onboarding.description,
      url: `${SITE_URL}/${locale}/onboarding`,
    },
  }
}

export default function OnboardingPage() {
  return (
    <PageTransition>
      <OnboardingHero />
      <OnboardingView />
    </PageTransition>
  )
}
