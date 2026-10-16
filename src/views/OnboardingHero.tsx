import { FadeIn } from '@/components/animations/FadeIn'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { getDictionary } from '@/lib/i18n/dictionaries'

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
            <Badge className="border-teal-light/30 bg-teal-light/10 text-teal-light">
              {hero.eyebrow}
            </Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {hero.title}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/70">{hero.subheading}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <p className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-dark shadow-sm">
                {hero.timeBadge}
              </p>
              <p className="rounded-full border border-white/15 px-5 py-2 text-sm text-white/70">
                {hero.privacyNote}
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
