import { ArrowRight, Check, FileCheck2 } from 'lucide-react'
import { FadeIn } from '@/components/animations/FadeIn'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SERVICES } from '@/lib/constants/services'
import { cn } from '@/lib/cn'

export function ServiceDetails() {
  return (
    <Section id="detalle" className="bg-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Badge>Oferta de valor</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Cuatro servicios, un plan mensual
          </h2>
          <p className="mt-4 text-lg text-navy/60">
            Cada servicio tiene un alcance y unos entregables definidos. Combínalos según tu
            estrategia y escala cuando quieras.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-16 lg:gap-20">
          {SERVICES.map((service, index) => {
            const Icon = service.icon
            return (
              <FadeIn key={service.id}>
                <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
                  <div
                    className={cn(
                      'flex flex-col items-start gap-5',
                      index % 2 === 1 && 'lg:order-2',
                    )}
                  >
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-light text-deep-blue">
                      <Icon aria-hidden className="h-7 w-7" />
                    </span>
                    <h3 className="font-display text-2xl font-bold tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-base leading-relaxed text-navy/60">{service.description}</p>
                    <a
                      href="/contacto"
                      className="inline-flex items-center gap-1.5 font-semibold text-deep-blue transition-colors hover:text-navy"
                    >
                      Solicitar este servicio
                      <ArrowRight aria-hidden className="h-4 w-4" />
                    </a>
                  </div>

                  <div className={cn('grid gap-6 sm:grid-cols-2', index % 2 === 1 && 'lg:order-1')}>
                    <div className="rounded-2xl border border-navy/10 bg-white p-6">
                      <h4 className="font-display text-sm font-bold tracking-wider text-navy/50 uppercase">
                        Qué incluye
                      </h4>
                      <ul className="mt-4 flex flex-col gap-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-navy/70">
                            <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl bg-navy p-6 text-white">
                      <h4 className="font-display flex items-center gap-2 text-sm font-bold tracking-wider text-turquoise uppercase">
                        <FileCheck2 aria-hidden className="h-4 w-4" />
                        Entregables del plan
                      </h4>
                      <ul className="mt-4 flex flex-col gap-3">
                        {service.deliverables.map((deliverable) => (
                          <li key={deliverable} className="flex items-start gap-2 text-sm text-white/80">
                            <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
