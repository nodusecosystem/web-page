import { Eye, Sparkles, Target } from 'lucide-react'
import { FadeIn } from '@/components/animations/FadeIn'
import { ABOUT_MISSION, ABOUT_VALUES, ABOUT_VISION } from '@/lib/constants/about'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export function MissionVisionValues() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Badge>Propósito</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Misión, visión y valores
          </h2>
          <p className="mt-4 text-lg text-navy/60">
            Lo que nos mueve, a dónde vamos y cómo trabajamos cada día con cada cliente.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <FadeIn className="h-full">
            <Card variant="bordered" className="flex h-full flex-col gap-5">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-light text-deep-blue">
                <Target aria-hidden className="h-6 w-6" />
              </span>
              <h3 className="font-display text-lg font-bold">Misión</h3>
              <p className="text-sm leading-relaxed text-navy/60">{ABOUT_MISSION}</p>
            </Card>
          </FadeIn>

          <FadeIn delay={0.1} className="h-full">
            <Card variant="bordered" className="flex h-full flex-col gap-5">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-light text-deep-blue">
                <Eye aria-hidden className="h-6 w-6" />
              </span>
              <h3 className="font-display text-lg font-bold">Visión</h3>
              <p className="text-sm leading-relaxed text-navy/60">{ABOUT_VISION}</p>
            </Card>
          </FadeIn>

          <FadeIn delay={0.2} className="h-full">
            <Card variant="bordered" className="flex h-full flex-col gap-5">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-light text-deep-blue">
                <Sparkles aria-hidden className="h-6 w-6" />
              </span>
              <h3 className="font-display text-lg font-bold">Valores</h3>
              <ul className="flex flex-col gap-3">
                {ABOUT_VALUES.map((value) => {
                  const Icon = value.icon
                  return (
                    <li key={value.id} className="flex items-start gap-2.5">
                      <Icon aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                      <span className="text-sm text-navy/70">
                        <strong className="font-semibold text-navy">{value.title}:</strong>{' '}
                        {value.description}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </Card>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}
