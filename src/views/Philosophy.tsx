import { FadeIn } from '@/components/animations/FadeIn'
import { PHILOSOPHY_ICONS } from '@/lib/constants/icons'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export async function Philosophy() {
  const dict = await getDictionary()
  const { philosophy } = dict.about

  return (
    <Section className="bg-teal-light/5">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Badge>{philosophy.badge}</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {philosophy.heading}
          </h2>
          <p className="mt-4 text-lg text-dark/60">{philosophy.subheading}</p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {philosophy.points.map((point, index) => {
            const Icon = PHILOSOPHY_ICONS[point.id]
            return (
              <FadeIn key={point.id} delay={index * 0.1} className="h-full">
                <Card variant="bordered" className="flex h-full flex-col gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-dark text-teal-light">
                    {Icon ? <Icon aria-hidden className="h-5 w-5" /> : null}
                  </span>
                  <h3 className="font-display text-base font-bold">{point.title}</h3>
                  <p className="text-sm leading-relaxed text-dark/60">{point.description}</p>
                </Card>
              </FadeIn>
            )
          })}
        </div>

        <FadeIn delay={0.2}>
          <p className="mx-auto mt-12 max-w-2xl border-l-4 border-teal-light pl-5 text-lg font-semibold text-dark/80">
            {philosophy.quote}
          </p>
        </FadeIn>
      </Container>
    </Section>
  )
}
