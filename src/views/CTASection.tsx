import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

type CTASectionProps = {
  heading?: string
  subheading?: string
}

export function CTASection({
  heading = '¿Listo para acelerar tu crecimiento?',
  subheading = 'Agenda una llamada gratuita de estrategia y te proponemos un plan mensual claro, con objetivos medibles y sin permanencia.',
}: CTASectionProps) {
  return (
    <Section className="relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-turquoise/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-deep-blue/50 blur-3xl"
      />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <h2 className="font-display max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <p className="max-w-xl text-lg text-white/70">{subheading}</p>
        <Button href="/contacto" size="lg" variant="secondary">
          Agenda una llamada
          <ArrowRight aria-hidden className="h-4 w-4" />
        </Button>
      </Container>
    </Section>
  )
}
