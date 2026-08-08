import { ArrowRight, Check } from 'lucide-react'
import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SERVICES } from '@/lib/constants/services'

export function Services() {
  return (
    <Section id="servicios" className="bg-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Badge>Servicios</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Planes mensuales que cubren toda tu estrategia digital
          </h2>
          <p className="mt-4 text-lg text-navy/60">
            Cuatro áreas de especialización, un solo objetivo: resultados medibles. Elige lo que tu
            negocio necesita hoy y escala cuando quieras.
          </p>
        </div>

        <StaggerChildren className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <StaggerItem key={service.id} className="h-full">
                <Card variant="bordered" className="flex h-full flex-col gap-5">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-light text-deep-blue">
                    <Icon aria-hidden className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy/60">{service.description}</p>
                  </div>
                  <ul className="flex flex-col gap-2 border-t border-navy/10 pt-5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-navy/70">
                        <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contacto"
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-deep-blue transition-colors hover:text-navy"
                  >
                    Solicitar información
                    <ArrowRight aria-hidden className="h-4 w-4" />
                  </a>
                </Card>
              </StaggerItem>
            )
          })}
        </StaggerChildren>
      </Container>
    </Section>
  )
}
