import type { Metadata } from 'next'
import { PageTransition } from '@/components/animations/PageTransition'
import { getDictionary, getLocale } from '@/lib/i18n/dictionaries'
import { legalMetadata } from '@/lib/legal'
import { LegalPage } from '@/views/LegalPage'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary()
  const locale = await getLocale()

  return legalMetadata({
    documentKey: 'cookies',
    locale,
    title: dict.legal.cookies.title,
    description: dict.legal.cookies.description,
  })
}

export default function CookiePolicyPage() {
  return (
    <PageTransition>
      <LegalPage documentKey="cookies" />
    </PageTransition>
  )
}
