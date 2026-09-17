import { Eye, Target } from 'lucide-react'
import { FadeIn } from '@/components/animations/FadeIn'
import { ABOUT_VALUE_ICONS } from '@/lib/constants/icons'
import { getDictionary } from '@/lib/i18n/dictionaries'
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
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {purpose.heading}
          </h2>
          <p className="mt-4 text-lg text-dark/60">{purpose.subheading}</p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <FadeIn className="h-full">
            <Card variant="bordered" className="flex h-full flex-col gap-5">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-light/10 text-teal-light">
                <Target aria-hidden className="h-6 w-6" />
              </span>
              <h3 className="font-display text-lg font-bold">{purpose.missionTitle}</h3>
              <p className="text-sm leading-relaxed text-dark/60">{purpose.mission}</p>
            </Card>
          </FadeIn>

          <FadeIn delay={0.1} className="h-full">
            <Card variant="bordered" className="flex h-full flex-col gap-5">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-light/10 text-teal-light">
                <Eye aria-hidden className="h-6 w-6" />
              </span>
              <h3 className="font-display text-lg font-bold">{purpose.visionTitle}</h3>
              <p className="text-sm leading-relaxed text-dark/60">{purpose.vision}</p>
            </Card>
          </FadeIn>
        </div>

        <div className="mt-16">
          <h3 className="text-center font-display text-2xl font-bold tracking-tight">
            {purpose.valuesTitle}
          </h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {purpose.values.map((value, index) => {
              const Icon = ABOUT_VALUE_ICONS[value.id]
              return (
                <FadeIn key={value.id} delay={index * 0.1} className="h-full">
                  <Card variant="bordered" className="flex h-full flex-col gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-dark text-teal-light">
                      {Icon ? <Icon aria-hidden className="h-5 w-5" /> : null}
                    </span>
                    <h4 className="font-display text-base font-bold">{value.title}</h4>
                    <p className="text-sm leading-relaxed text-dark/60">{value.description}</p>
                  </Card>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
