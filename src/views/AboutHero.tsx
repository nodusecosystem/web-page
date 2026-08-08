import { ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations/FadeIn'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SLOGAN } from '@/lib/constants/site'

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-pattern" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-deep-blue/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-cyan/20 blur-3xl"
      />

      <Container className="relative grid items-center gap-14 pt-32 pb-20 sm:pt-40 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pb-28">
        <FadeIn>
          <div className="flex flex-col items-start gap-6">
            <Badge className="bg-white/10 text-turquoise">Nosotros</Badge>
            <h1 className="font-display text-4xl leading-tight font-bold tracking-tight sm:text-5xl xl:text-6xl">
              Somos tu <span className="text-gradient-brand">partner de aceleración</span> digital
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/70">
              nodus nació con una idea simple: las empresas no necesitan más actividad digital,
              necesitan resultados. Unimos estrategia, datos, tecnología y ejecución mensual para
              acelerar el crecimiento de negocios ambiciosos.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/servicios" size="lg" variant="secondary">
                Ver servicios
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Button>
              <Button href="/contacto" size="lg" variant="outline">
                Hablemos
              </Button>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <figure className="relative mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <blockquote className="font-display text-xl leading-relaxed font-semibold text-white/90">
              “{SLOGAN}”
            </blockquote>
            <figcaption className="mt-4 text-sm text-white/60">
              La promesa que cumplimos cada mes con cada cliente.
            </figcaption>
          </figure>
        </FadeIn>
      </Container>
    </section>
  )
}
