import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { AnimatedCounter } from '@/components/animations/AnimatedCounter'
import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { FadeIn } from '@/components/animations/FadeIn'
import { HeroBackground } from '@/components/animations/HeroBackground'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { HeroLogoRing } from '@/components/ui/HeroLogoRing'
import { Logo } from '@/components/ui/Logo'
import { getDictionary } from '@/lib/i18n/dictionaries'

export async function Hero() {
  const dict = await getDictionary()
  const { hero } = dict

  return (
    <section id="inicio" className="relative overflow-hidden bg-dark text-white">
      <HeroBackground />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-128 w-lg rounded-full bg-teal-light/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-32 h-112 w-md rounded-full bg-teal-light/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/3 h-104 w-104 rounded-full bg-teal-light/10 blur-3xl"
      />

      <Container className="relative grid min-h-svh items-center gap-16 py-20 sm:py-24 lg:grid-cols-2 lg:gap-12">
        <FadeIn>
          <div className="flex flex-col items-start gap-6">
            <h1 className="font-display">
              <AnimatedHeading
                line1={hero.titleStart}
                line2={hero.titleMiddle}
                line3={hero.titleAccent}
                fontSize={84}
                className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl xl:text-6xl"
              />
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/70">{hero.description}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="#contacto" size="lg" variant="solid">
                {hero.ctaPrimary}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Button>
              <Button href="#servicios" size="lg" variant="outline">
                {hero.ctaSecondary}
              </Button>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {hero.checklist.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                  <CheckCircle2 aria-hidden className="h-4 w-4 text-teal-light" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="relative mx-auto flex aspect-square max-w-md items-center justify-center">
            <div
              aria-hidden
              className="absolute inset-0 rounded-full bg-linear-to-br from-teal-light via-teal-light to-white opacity-40 blur-2xl"
            />
            <HeroLogoRing />
            <Logo
              variant="isotipo"
              theme="dark"
              className="relative h-56 w-56 sm:h-72 sm:w-72"
            />
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-sans text-2xl font-bold text-teal-light">
                  <AnimatedCounter value={stat.value} />
                </dd>
                <p className="mt-1 text-xs text-white/60">{stat.label}</p>
              </div>
            ))}
          </dl>
        </FadeIn>
      </Container>
    </section>
  )
}
