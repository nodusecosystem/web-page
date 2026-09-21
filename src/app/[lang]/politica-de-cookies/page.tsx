import type { Metadata } from 'next'
import { lang } from 'next/root-params'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { legalMetadata } from '@/lib/legal'
import { LegalPage } from '@/views/LegalPage'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary()
  const locale = await lang()

  return legalMetadata({
    documentKey: 'cookies',
    locale,
    title: dict.legal.cookies.title,
    description: dict.legal.cookies.description,
  })
}

export default function CookiePolicyPage() {
  return <LegalPage documentKey="cookies" />
}
