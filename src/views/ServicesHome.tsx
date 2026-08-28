import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { ServicesGrid } from '@/components/ui/ServicesGrid'
import { getDictionary } from '@/lib/i18n/dictionaries'

export async function ServicesHome() {
  const dict = await getDictionary()
  const { services } = dict

  return (
    <Section id="servicios" className="bg-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {services.heading}
          </h2>
          <p className="mt-4 text-lg text-dark/60">{services.subheading}</p>
        </div>

        <ServicesGrid services={services.items} ctaLink={services.ctaLink} />
      </Container>
    </Section>
  )
}
