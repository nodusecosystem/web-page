import { PROFESSIONAL_SERVICE_SCHEMA } from '@/lib/constants/schema'
import { ContactForm } from '@/views/ContactForm'
import { Hero } from '@/views/Hero'
import { Methodology } from '@/views/Methodology'
import { Services } from '@/views/Services'
import { SocialProof } from '@/views/SocialProof'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Methodology />
      <SocialProof />
      <ContactForm />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PROFESSIONAL_SERVICE_SCHEMA) }}
      />
    </>
  )
}
