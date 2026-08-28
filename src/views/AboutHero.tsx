import { ArrowRight } from 'lucide-react'
import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { FadeIn } from '@/components/animations/FadeIn'
import { HeroBackground } from '@/components/animations/HeroBackground'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { getDictionary } from '@/lib/i18n/dictionaries'

export async function AboutHero() {
  const dict = await getDictionary()
  const { hero } = dict.about

  return (
    <section className="relative overflow-hidden bg-dark text-white">
      <HeroBackground />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-120 w-120 rounded-full bg-teal-light/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-104 w-104 rounded-full bg-teal-light/20 blur-3xl"
      />

      <Container className="relative grid items-center gap-14 pt-32 pb-20 sm:pt-40 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pb-28">
        <FadeIn>
          <div className="flex flex-col items-start gap-6">
            <h1 className="font-display">
              <AnimatedHeading
                line1={hero.titleStart}
                line2={`${hero.titleAccent}`}
                fontSize={80}
                className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl xl:text-6xl"
              />
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/70">{hero.description}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/services" size="lg" variant="solid">
                {hero.ctaPrimary}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Button>
              <Button href="/contact" size="lg" variant="outline">
                {hero.ctaSecondary}
              </Button>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <figure className="relative mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <blockquote className="font-display text-xl leading-relaxed font-semibold text-white/90">
              “{dict.site.slogan}”
            </blockquote>
            <figcaption className="mt-4 text-sm text-white/60">{hero.quoteCaption}</figcaption>
          </figure>
        </FadeIn>
      </Container>
    </section>
  )
}
