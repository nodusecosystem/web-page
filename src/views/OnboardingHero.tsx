import { FadeIn } from '@/components/animations/FadeIn'
import { Container } from '@/components/ui/Container'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { Clock, ShieldCheck } from 'lucide-react'

export async function OnboardingHero() {
  const dict = await getDictionary()
  const { hero } = dict.onboarding

  return (
    <section className="relative overflow-hidden bg-dark text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-teal-light/20 blur-3xl"
      />
      <Container className="relative pt-28 pb-16 sm:pt-36 sm:pb-20">
        <FadeIn immediate>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <p className="text-xs font-bold tracking-[0.2em] text-teal-light uppercase">
              {hero.eyebrow}
            </p>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {hero.title}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/70">{hero.subheading}</p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
              <p className="inline-flex cursor-default items-center gap-2">
                <Clock aria-hidden className="h-4 w-4 shrink-0 text-teal-light" />
                {hero.timeBadge}
              </p>
              <p className="inline-flex cursor-default items-center gap-2">
                <ShieldCheck aria-hidden className="h-4 w-4 shrink-0 text-teal-light" />
                {hero.privacyNote}
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
