import { FadeIn } from '@/components/animations/FadeIn'
import { PHILOSOPHY_POINTS } from '@/lib/constants/about'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export function Philosophy() {
  return (
    <Section className="bg-light">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Badge>Filosofía</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            No publicamos por publicar: aceleramos
          </h2>
          <p className="mt-4 text-lg text-navy/60">
            No somos una agencia tradicional que vende posts y «actividad digital». Somos un
            partner de aceleración: medimos, iteramos y escalamos lo que demuestra resultado.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PHILOSOPHY_POINTS.map((point, index) => {
            const Icon = point.icon
            return (
              <FadeIn key={point.id} delay={index * 0.1} className="h-full">
                <Card variant="bordered" className="flex h-full flex-col gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-turquoise">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-base font-bold">{point.title}</h3>
                  <p className="text-sm leading-relaxed text-navy/60">{point.description}</p>
                </Card>
              </FadeIn>
            )
          })}
        </div>

        <FadeIn delay={0.2}>
          <p className="mx-auto mt-12 max-w-2xl border-l-4 border-turquoise pl-5 text-lg font-semibold text-navy/80">
            En nodus no vendemos horas ni tareas: vendemos un resultado mensual, medible y
            transparente.
          </p>
        </FadeIn>
      </Container>
    </Section>
  )
}
