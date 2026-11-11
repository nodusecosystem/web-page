import type { Metadata } from 'next'
import { PageTransition } from '@/components/animations/PageTransition'
import { JsonLd } from '@/components/seo/JsonLd'
import { FAQSection } from '@/components/ui/FAQSection'
import { buildWhatsAppLink } from '@/lib/constants/site'
import { getDictionary, getLocale } from '@/lib/i18n/dictionaries'
import { staticPageSchema } from '@/lib/schema'
import { buildPageMetadata, samePath } from '@/lib/seo/metadata'
import { CallScheduler } from '@/views/CallScheduler'
import { ContactForm } from '@/views/ContactForm'
import { ContactHero } from '@/views/ContactHero'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary()
  const locale = await getLocale()

  return buildPageMetadata({
    locale,
    paths: samePath('/contact'),
    title: dict.metadata.contact.title,
    description: dict.metadata.contact.description,
  })
}

export default async function ContactPage() {
  const dict = await getDictionary()
  const locale = await getLocale()

  return (
    <PageTransition>
      <ContactHero />
      <CallScheduler />
      <ContactForm
        strings={dict.contact.form}
        responseTime={dict.site.responseTime}
        whatsappHref={buildWhatsAppLink(dict.site.whatsappMessage)}
        locale={locale}
        heading={dict.contact.altHeading}
        subheading={dict.contact.altSubheading}
      />
      <FAQSection className="bg-teal-light/5" />
      <JsonLd data={staticPageSchema(dict, locale, 'contact')} />
    </PageTransition>
  )
}
