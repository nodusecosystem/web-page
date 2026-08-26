import { FadeIn } from '@/components/animations/FadeIn'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { METHODOLOGY_ICONS } from '@/lib/constants/icons'
import { getDictionary } from '@/lib/i18n/dictionaries'

export async function Methodology() {
  const dict = await getDictionary()
  const { methodology } = dict

  return (
    <Section id="metodologia" className="bg-teal-light/5">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Badge>{methodology.badge}</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {methodology.heading}
          </h2>
          <p className="mt-4 text-lg text-dark/60">{methodology.subheading}</p>
        </div>

        <ol className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {methodology.steps.map((step, index) => {
            const Icon = METHODOLOGY_ICONS[step.id]
            return (
              <li key={step.id}>
                <FadeIn delay={index * 0.1} className="h-full">
                  <Card variant="elevated" className="flex h-full flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-dark text-teal-light">
                        {Icon ? <Icon aria-hidden className="h-5 w-5" /> : null}
                      </span>
                      <span aria-hidden className="font-display text-3xl font-bold text-dark/10">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-dark/60">{step.description}</p>
                    <span className="mt-auto inline-flex w-fit rounded-full bg-teal-light/10 px-3 py-1 text-xs font-semibold text-dark">
                      {step.duration}
                    </span>
                  </Card>
                </FadeIn>
              </li>
            )
          })}
        </ol>
      </Container>
    </Section>
  )
}
