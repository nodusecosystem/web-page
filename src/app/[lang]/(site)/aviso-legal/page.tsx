import type { Metadata } from 'next'
import { PageTransition } from '@/components/animations/PageTransition'
import { getDictionary, getLocale } from '@/lib/i18n/dictionaries'
import { legalMetadata } from '@/lib/legal'
import { LegalPage } from '@/views/LegalPage'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary()
  const locale = await getLocale()

  return legalMetadata({
    documentKey: 'notice',
    locale,
    title: dict.legal.notice.title,
    description: dict.legal.notice.description,
  })
}

export default function LegalNoticePage() {
  return (
    <PageTransition>
      <LegalPage documentKey="notice" />
    </PageTransition>
  )
}
