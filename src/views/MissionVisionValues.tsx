import { Eye, Sparkles, Target } from 'lucide-react'
import { FadeIn } from '@/components/animations/FadeIn'
import { ABOUT_VALUE_ICONS } from '@/lib/constants/icons'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export async function MissionVisionValues() {
  const dict = await getDictionary()
  const { purpose } = dict.about

  return (
    <Section className="bg-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Badge>{purpose.badge}</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {purpose.heading}
          </h2>
          <p className="mt-4 text-lg text-navy/60">{purpose.subheading}</p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <FadeIn className="h-full">
            <Card variant="bordered" className="flex h-full flex-col gap-5">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-light text-deep-blue">
                <Target aria-hidden className="h-6 w-6" />
              </span>
              <h3 className="font-display text-lg font-bold">{purpose.missionTitle}</h3>
              <p className="text-sm leading-relaxed text-navy/60">{purpose.mission}</p>
            </Card>
          </FadeIn>

          <FadeIn delay={0.1} className="h-full">
            <Card variant="bordered" className="flex h-full flex-col gap-5">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-light text-deep-blue">
                <Eye aria-hidden className="h-6 w-6" />
              </span>
              <h3 className="font-display text-lg font-bold">{purpose.visionTitle}</h3>
              <p className="text-sm leading-relaxed text-navy/60">{purpose.vision}</p>
            </Card>
          </FadeIn>

          <FadeIn delay={0.2} className="h-full">
            <Card variant="bordered" className="flex h-full flex-col gap-5">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-light text-deep-blue">
                <Sparkles aria-hidden className="h-6 w-6" />
              </span>
              <h3 className="font-display text-lg font-bold">{purpose.valuesTitle}</h3>
              <ul className="flex flex-col gap-3">
                {purpose.values.map((value) => {
                  const Icon = ABOUT_VALUE_ICONS[value.id]
                  return (
                    <li key={value.id} className="flex items-start gap-2.5">
                      {Icon ? <Icon aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> : null}
                      <span className="text-sm text-navy/70">
                        <strong className="font-semibold text-navy">{value.title}:</strong>{' '}
                        {value.description}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </Card>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}
