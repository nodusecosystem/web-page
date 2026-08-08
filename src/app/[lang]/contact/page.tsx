import type { Metadata } from 'next'
import { lang } from 'next/root-params'
import { FAQSection } from '@/components/ui/FAQSection'
import { SITE_NAME, SITE_URL } from '@/lib/constants/site'
import { getDictionary, type Locale } from '@/lib/i18n/dictionaries'
import { contactPageSchema } from '@/lib/schema'
import { CallScheduler } from '@/views/CallScheduler'
import { ContactForm } from '@/views/ContactForm'
import { ContactHero } from '@/views/ContactHero'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary()
  const locale = await lang()

  return {
    title: dict.metadata.contact.title,
    description: dict.metadata.contact.description,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { es: '/es/contact', en: '/en/contact' },
    },
    openGraph: {
      title: `${dict.metadata.contact.title} | ${SITE_NAME}`,
      description: dict.metadata.contact.description,
      url: `${SITE_URL}/${locale}/contact`,
    },
  }
}

export default async function ContactPage() {
  const dict = await getDictionary()
  const locale = await lang()

  return (
    <>
      <ContactHero />
      <ContactForm
        strings={dict.contact.form}
        services={dict.services.items}
        responseTime={dict.site.responseTime}
        heading={dict.contact.altHeading}
        subheading={dict.contact.altSubheading}
      />
      <CallScheduler />
      <FAQSection className="bg-light" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema(dict, locale as Locale)) }}
      />
    </>
  )
}
