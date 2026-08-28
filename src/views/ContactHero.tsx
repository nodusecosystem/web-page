import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { FadeIn } from '@/components/animations/FadeIn'
import { Container } from '@/components/ui/Container'
import { getDictionary } from '@/lib/i18n/dictionaries'

export async function ContactHero() {
  const dict = await getDictionary()
  const { hero } = dict.contact

  return (
    <section className="bg-teal-light/5">
      <Container className="pt-28 pb-16 sm:pt-36 sm:pb-20">
        <FadeIn>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <h1 className="font-display">
              <AnimatedHeading
                line1={hero.heading}
                fontSize={72}
                dark
                align="center"
                className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl"
              />
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-dark/60">{hero.subheading}</p>
            <p className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-dark shadow-sm">
              {dict.site.responseTime}
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
