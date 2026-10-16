import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard'
import { getDictionary } from '@/lib/i18n/dictionaries'

export async function OnboardingView() {
  const dict = await getDictionary()

  return <OnboardingWizard strings={dict.onboarding} />
}
