import type { Metadata } from 'next'
import { lang } from 'next/root-params'
import { PageTransition } from '@/components/animations/PageTransition'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { legalMetadata } from '@/lib/legal'
import { LegalPage } from '@/views/LegalPage'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary()
  const locale = await lang()

  return legalMetadata({
    documentKey: 'privacy',
    locale,
    title: dict.legal.privacy.title,
    description: dict.legal.privacy.description,
  })
}

export default function PrivacyPolicyPage() {
  return (
    <PageTransition>
      <LegalPage documentKey="privacy" />
    </PageTransition>
  )
}
