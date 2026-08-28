import type { Metadata } from 'next'
import { lang } from 'next/root-params'
import { SITE_NAME, SITE_URL } from '@/lib/constants/site'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { professionalServiceSchema } from '@/lib/schema'
import { ContactForm } from '@/views/ContactForm'
import { Hero } from '@/views/Hero'
import { Methodology } from '@/views/Methodology'
import { ServicesHome } from '@/views/ServicesHome'
import { SocialProof } from '@/views/SocialProof'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary()
  const locale = await lang()

  return {
    alternates: {
      canonical: `/${locale}`,
      languages: { es: '/es', en: '/en' },
    },
    openGraph: {
      title: SITE_NAME,
      description: dict.site.description,
      url: `${SITE_URL}/${locale}`,
    },
  }
}

export default async function HomePage() {
  const dict = await getDictionary()

  return (
    <>
      <Hero />
      <ServicesHome />
      <Methodology />
      <SocialProof />
      <ContactForm
        strings={dict.contact.form}
        services={dict.services.items}
        responseTime={dict.site.responseTime}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema(dict)) }}
      />
    </>
  )
}
