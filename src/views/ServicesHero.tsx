import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { FadeIn } from '@/components/animations/FadeIn'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

const SERVICES_CHECKLIST = ['Planes mensuales flexibles', 'Sin permanencia', 'Entregables claros']

export function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-pattern" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-deep-blue/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-32 h-[26rem] w-[26rem] rounded-full bg-cyan/20 blur-3xl"
      />

      <Container className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
        <FadeIn>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <Badge className="bg-white/10 text-turquoise">Servicios</Badge>
            <h1 className="font-display text-4xl leading-tight font-bold tracking-tight sm:text-5xl xl:text-6xl">
              Planes mensuales con <span className="text-gradient-brand">entregables claros</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/70">
              Estrategia, pauta, desarrollo y automatización en un solo partner. Sabrás
              exactamente qué recibes cada mes y qué resultado buscamos alcanzar.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/contacto" size="lg" variant="secondary">
                Agenda una llamada
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Button>
              <Button href="#detalle" size="lg" variant="outline">
                Ver entregables
              </Button>
            </div>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {SERVICES_CHECKLIST.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                  <CheckCircle2 aria-hidden className="h-4 w-4 text-turquoise" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
