import { lang } from 'next/root-params'
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard'
import { getDictionary, type Locale } from '@/lib/i18n/dictionaries'

export async function OnboardingView() {
  const dict = await getDictionary()
  const locale = (await lang()) as Locale

  return <OnboardingWizard strings={dict.onboarding} locale={locale} />
}
