import { FadeIn } from '@/components/animations/FadeIn'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { getDictionary } from '@/lib/i18n/dictionaries'

export async function ContactHero() {
  const dict = await getDictionary()
  const { hero } = dict.contact

  return (
    <section className="bg-light">
      <Container className="pt-28 pb-16 sm:pt-36 sm:pb-20">
        <FadeIn>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <Badge>{hero.badge}</Badge>
            <h1 className="font-display text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
              {hero.heading}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-navy/60">{hero.subheading}</p>
            <p className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-deep-blue shadow-sm">
              {dict.site.responseTime}
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
