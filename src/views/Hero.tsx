import { ArrowRight, Check } from 'lucide-react'
import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { HeroBackground } from '@/components/animations/HeroBackground'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { HeroLogoRing } from '@/components/ui/HeroLogoRing'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/cn'
import { HERO_STAT_ICONS } from '@/lib/constants/icons'
import { getDictionary } from '@/lib/i18n/dictionaries'

/**
 * Cinco áreas: en móvil y en la columna estrecha (lg), 2 por fila y la última a lo ancho; con más
 * espacio (sm, xl), 3 arriba y 2 centradas abajo en una rejilla de 6 (en una fila de 5, «Automatizaciones»
 * no cabe en la tarjeta).
 */
const STAT_LAYOUT =
  'last:col-span-2 sm:col-span-2 sm:nth-4:col-start-2 lg:col-span-1 lg:nth-4:col-start-auto lg:last:col-span-2 xl:col-span-2 xl:nth-4:col-start-2'

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
        <div>
          <div className="flex flex-col items-start gap-6">
            <h1 className="font-display">
              <AnimatedHeading
                line1={hero.titleStart}
                line2={hero.titleMiddle}
                fontSize={84}
                className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl xl:text-6xl"
              />
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/70">
              {hero.description.map((part, index) =>
                part.highlight ? (
                  <strong
                    key={index}
                    className="text-[1.1em] font-bold tracking-wide text-white uppercase"
                  >
                    {part.text}
                  </strong>
                ) : (
                  <span key={index}>{part.text}</span>
                ),
              )}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="#contacto" size="lg" variant="solid">
                {hero.ctaPrimary}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Button>
              <Button href="#servicios" size="lg" variant="outline">
                {hero.ctaSecondary}
              </Button>
            </div>
          </div>
        </div>

        <div className="motion-safe:animate-fade-in-up">
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
          <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-6 lg:grid-cols-2 xl:grid-cols-6">
            {hero.stats.map((stat) => {
              const Icon = HERO_STAT_ICONS[stat.id] ?? Check
              return (
                <div
                  key={stat.id}
                  className={cn(
                    'flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur',
                    STAT_LAYOUT,
                  )}
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="flex flex-col items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-light/10 text-teal-light">
                      <Icon aria-hidden className="h-6 w-6" />
                    </span>
                    <span className="text-xs text-white/60">{stat.label}</span>
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>
      </Container>
    </section>
  )
}
