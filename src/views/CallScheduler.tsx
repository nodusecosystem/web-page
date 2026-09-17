import { BookingCalendar } from '@/components/ui/BookingCalendar'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { getDictionary } from '@/lib/i18n/dictionaries'

export async function CallScheduler() {
  const dict = await getDictionary()
  const { scheduler } = dict.contact

  return (
    <Section id="agendar" className="bg-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {scheduler.heading}
          </h2>
          <p className="mt-4 text-lg text-dark/60">{scheduler.subheading}</p>
        </div>

        <BookingCalendar strings={scheduler} />

        <p className="mt-6 text-center text-sm text-dark/50">{scheduler.footnote}</p>
      </Container>
    </Section>
  )
}
