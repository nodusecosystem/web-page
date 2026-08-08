import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { FadeIn } from '@/components/animations/FadeIn'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { getDictionary } from '@/lib/i18n/dictionaries'

export async function Hero() {
  const dict = await getDictionary()
  const { hero } = dict

  return (
    <section id="inicio" className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-pattern" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-deep-blue/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-teal/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/3 h-[26rem] w-[26rem] rounded-full bg-cyan/20 blur-3xl"
      />

      <Container className="relative grid items-center gap-16 pt-32 pb-20 sm:pt-40 lg:grid-cols-2 lg:gap-12 lg:pb-28">
        <FadeIn>
          <div className="flex flex-col items-start gap-6">
            <Badge className="bg-white/10 text-turquoise">{hero.badge}</Badge>
            <h1 className="font-display text-4xl leading-tight font-bold tracking-tight sm:text-5xl xl:text-6xl">
              {hero.titleStart} <span className="text-gradient-brand">{hero.titleAccent}</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/70">{hero.description}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="#contacto" size="lg" variant="secondary">
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
                  <CheckCircle2 aria-hidden className="h-4 w-4 text-turquoise" />
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
              className="absolute inset-0 rounded-full bg-linear-to-br from-deep-blue via-teal to-cyan opacity-60 blur-2xl"
            />
            <div
              aria-hidden
              className="absolute inset-6 rounded-full border border-white/10 bg-navy/80 backdrop-blur"
            />
            <Logo
              variant="isotipo"
              theme="dark"
              preload
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
                <dd className="font-display text-2xl font-bold text-turquoise">{stat.value}</dd>
                <p className="mt-1 text-xs text-white/60">{stat.label}</p>
              </div>
            ))}
          </dl>
        </FadeIn>
      </Container>
    </section>
  )
}
