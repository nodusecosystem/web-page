import { FadeIn } from '@/components/animations/FadeIn'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { RESPONSE_TIME } from '@/lib/constants/site'

export function ContactHero() {
  return (
    <section className="bg-light">
      <Container className="pt-28 pb-16 sm:pt-36 sm:pb-20">
        <FadeIn>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <Badge>Contacto</Badge>
            <h1 className="font-display text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
              Hablemos de tu crecimiento
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-navy/60">
              Cuéntanos dónde está tu negocio hoy y dónde quieres llegar. Te proponemos un plan
              mensual claro, con objetivos medibles y sin permanencia.
            </p>
            <p className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-deep-blue shadow-sm">
              {RESPONSE_TIME}
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
