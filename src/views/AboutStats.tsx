import { AnimatedCounter } from '@/components/animations/AnimatedCounter'
import { Container } from '@/components/ui/Container'
import { GlowCursor } from '@/components/ui/GlowCursor'
import { Section } from '@/components/ui/Section'
import { getDictionary } from '@/lib/i18n/dictionaries'

export async function AboutStats() {
  const dict = await getDictionary()
  const { stats } = dict.about

  return (
    <Section className="relative overflow-hidden bg-dark text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-teal-light/15 blur-3xl"
      />
      <GlowCursor>
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {stats.heading}
            </h2>
            <p className="mt-4 text-lg text-white/70">{stats.subheading}</p>
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.items.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl font-bold text-teal-light sm:text-4xl">
                  <AnimatedCounter value={stat.value} />
                </dd>
                <p className="mt-2 text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </dl>
        </Container>
      </GlowCursor>
    </Section>
  )
}
