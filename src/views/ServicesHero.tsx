import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { FadeIn } from '@/components/animations/FadeIn'
import { HeroBackground } from '@/components/animations/HeroBackground'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { getDictionary } from '@/lib/i18n/dictionaries'

export async function ServicesHero() {
  const dict = await getDictionary()
  const { hero } = dict.servicesPage

  return (
    <section className="relative overflow-hidden bg-dark text-white">
      <HeroBackground />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-120 w-120 rounded-full bg-teal-light/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-32 h-104 w-104 rounded-full bg-teal-light/20 blur-3xl"
      />

      <Container className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
        <FadeIn>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <h1 className="font-display">
              <AnimatedHeading
                line1={hero.titleStart}
                line2={hero.titleAccent}
                fontSize={80}
                align="center"
                className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl xl:text-6xl"
              />
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/70">{hero.description}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" size="lg" variant="solid">
                {hero.ctaPrimary}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Button>
              <Button href="#detalle" size="lg" variant="outline">
                {hero.ctaSecondary}
              </Button>
            </div>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {hero.checklist.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                  <CheckCircle2 aria-hidden className="h-4 w-4 text-teal-light" />
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
