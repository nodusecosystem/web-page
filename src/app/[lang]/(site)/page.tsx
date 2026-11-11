import type { Metadata } from 'next'
import { PageTransition } from '@/components/animations/PageTransition'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildWhatsAppLink } from '@/lib/constants/site'
import { getDictionary, getLocale } from '@/lib/i18n/dictionaries'
import { homeSchema } from '@/lib/schema'
import { buildPageMetadata, samePath } from '@/lib/seo/metadata'
import { ContactForm } from '@/views/ContactForm'
import { Hero } from '@/views/Hero'
import { Methodology } from '@/views/Methodology'
import { ServicesHome } from '@/views/ServicesHome'
import { SocialProof } from '@/views/SocialProof'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary()
  const locale = await getLocale()

  return buildPageMetadata({
    locale,
    paths: samePath(''),
    title: { absolute: dict.metadata.home.title },
    description: dict.site.description,
  })
}

export default async function HomePage() {
  const dict = await getDictionary()
  const locale = await getLocale()

  return (
    <PageTransition>
      <Hero />
      <ServicesHome />
      <Methodology />
      <SocialProof />
      <ContactForm
        strings={dict.contact.form}
        responseTime={dict.site.responseTime}
        whatsappHref={buildWhatsAppLink(dict.site.whatsappMessage)}
        locale={locale}
      />
      <JsonLd data={homeSchema(dict, locale)} />
    </PageTransition>
  )
}
