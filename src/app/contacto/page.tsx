import type { Metadata } from 'next'
import { FAQSection } from '@/components/ui/FAQSection'
import { CONTACT_PAGE_SCHEMA } from '@/lib/constants/schema'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants/site'
import { CallScheduler } from '@/views/CallScheduler'
import { ContactForm } from '@/views/ContactForm'
import { ContactHero } from '@/views/ContactHero'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Escríbenos o agenda una llamada gratuita de estrategia. Te respondemos en menos de 24 horas laborables.',
  alternates: {
    canonical: '/contacto',
  },
  openGraph: {
    title: `Contacto | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/contacto`,
  },
}

export default function ContactoPage() {
  return (
    <>
      <ContactHero />
      <ContactForm
        heading="Cuéntanos sobre tu proyecto"
        subheading="Déjanos tu información, el servicio que te interesa y un rango de presupuesto. Te proponemos un plan a medida en menos de 24 horas laborables."
      />
      <CallScheduler />
      <FAQSection heading="Preguntas frecuentes sobre contratación" className="bg-light" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_PAGE_SCHEMA) }}
      />
    </>
  )
}
