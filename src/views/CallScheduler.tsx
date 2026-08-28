import { CalendarDays, ChevronLeft, ChevronRight, Clock, Video } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { cn } from '@/lib/cn'

const CALENDAR_DAYS: { day: number; disabled?: boolean; selected?: boolean }[] = [
  { day: 10 },
  { day: 11 },
  { day: 12 },
  { day: 13 },
  { day: 14 },
  { day: 15, disabled: true },
  { day: 16, disabled: true },
  { day: 17 },
  { day: 18, selected: true },
  { day: 19 },
  { day: 20 },
  { day: 21 },
  { day: 22, disabled: true },
  { day: 23, disabled: true },
  { day: 24 },
  { day: 25 },
  { day: 26 },
  { day: 27 },
  { day: 28 },
  { day: 29, disabled: true },
  { day: 30, disabled: true },
]

const TIME_SLOTS = ['09:30', '11:00', '12:30', '16:00', '17:30']

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

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-dark/10 bg-white shadow-lg">
          <div className="grid lg:grid-cols-[1.2fr_1fr]">
            <div className="border-b border-dark/10 p-6 sm:p-8 lg:border-r lg:border-b-0">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 font-display text-lg font-bold">
                  <CalendarDays aria-hidden className="h-5 w-5 text-teal-light" />
                  {scheduler.month}
                </p>
                <div className="flex gap-2">
                  <span
                    aria-hidden
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-dark/10 text-dark/40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </span>
                  <span
                    aria-hidden
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-dark/10 text-dark/40"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-7 gap-2">
                {scheduler.weekdays.map((weekday) => (
                  <span
                    key={weekday}
                    className="text-center text-xs font-semibold text-dark/40"
                  >
                    {weekday}
                  </span>
                ))}
                {CALENDAR_DAYS.map(({ day, disabled, selected }) => (
                  <span
                    key={day}
                    aria-disabled={disabled || undefined}
                    className={cn(
                      'flex h-10 items-center justify-center rounded-lg text-sm font-medium',
                      selected && 'bg-teal-light font-bold text-dark',
                      disabled && 'text-dark/20 line-through',
                      !selected && !disabled && 'text-dark/70',
                    )}
                  >
                    {day}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-dark/40">{scheduler.timeZoneLabel}</p>
            </div>

            <div className="flex flex-col gap-6 p-6 sm:p-8">
              <div>
                <p className="text-sm font-semibold text-dark/50">{scheduler.availableTitle}</p>
                <p className="font-display mt-1 text-lg font-bold">{scheduler.selectedDay}</p>
              </div>
              <ul className="grid grid-cols-2 gap-3">
                {TIME_SLOTS.map((slot, index) => (
                  <li
                    key={slot}
                    className={cn(
                      'flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-semibold',
                      index === 0
                        ? 'border-teal-light bg-teal-light text-dark'
                        : 'border-dark/10 text-dark/60',
                    )}
                  >
                    <Clock aria-hidden className="h-3.5 w-3.5" />
                    {slot}
                  </li>
                ))}
              </ul>
              <div className="rounded-xl bg-teal-light/10 p-4">
                <p className="text-sm font-semibold text-dark">{scheduler.callTitle}</p>
                <p className="mt-1 text-sm text-dark/60">
                  <Video aria-hidden className="mr-1.5 inline h-4 w-4 text-teal-light" />
                  {scheduler.callDetail}
                </p>
              </div>
              <Button href="#contacto" size="lg" className="w-full">
                {scheduler.confirm}
              </Button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-dark/50">{scheduler.footnote}</p>
      </Container>
    </Section>
  )
}
