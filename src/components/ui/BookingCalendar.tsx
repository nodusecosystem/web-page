'use client'

import { CalendarDays, ChevronLeft, ChevronRight, Video } from 'lucide-react'
import { useEffect, useState, type ChangeEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useBookingStore } from '@/lib/booking-store'
import { cn } from '@/lib/cn'

const MIN_HOUR = 9
const MAX_HOUR = 17
const MIN_TIME = '09:00'
const MAX_TIME = '17:00'
const WEEKEND_DAYS = [0, 6]
const DAYS_TO_SEARCH = 14

const startOfDay = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate())

const toTimeValue = (hour: number): string => `${String(hour).padStart(2, '0')}:00`

const isSelectable = (date: Date, today: Date): boolean =>
  date.getTime() >= today.getTime() && !WEEKEND_DAYS.includes(date.getDay())

function getMonthDays(year: number, month: number, today: Date): { day: number; disabled: boolean }[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1
    return { day, disabled: !isSelectable(new Date(year, month, day), today) }
  })
}

function getFirstAvailableDay(year: number, month: number, today: Date): number | null {
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  for (let day = 1; day <= daysInMonth; day++) {
    if (isSelectable(new Date(year, month, day), today)) return day
  }

  return null
}

type CalendarState = {
  today: Date
  year: number
  month: number
  selectedDay: number
  time: string
}

function createCalendarState(now: Date): CalendarState {
  const today = startOfDay(now)
  const nextHour = Math.min(Math.max(now.getHours() + 1, MIN_HOUR), MAX_HOUR)

  if (isSelectable(today, today) && now.getHours() + 1 <= MAX_HOUR) {
    return {
      today,
      year: today.getFullYear(),
      month: today.getMonth(),
      selectedDay: today.getDate(),
      time: toTimeValue(nextHour),
    }
  }

  for (let offset = 1; offset <= DAYS_TO_SEARCH; offset++) {
    const candidate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset)

    if (isSelectable(candidate, today)) {
      return {
        today,
        year: candidate.getFullYear(),
        month: candidate.getMonth(),
        selectedDay: candidate.getDate(),
        time: MIN_TIME,
      }
    }
  }

  return {
    today,
    year: today.getFullYear(),
    month: today.getMonth(),
    selectedDay: today.getDate(),
    time: MIN_TIME,
  }
}

const isSameState = (current: CalendarState, next: CalendarState): boolean =>
  current.today.getTime() === next.today.getTime() &&
  current.year === next.year &&
  current.month === next.month &&
  current.selectedDay === next.selectedDay &&
  current.time === next.time

type BookingCalendarStrings = {
  weekdays: string[]
  previousMonthLabel: string
  nextMonthLabel: string
  timeZoneLabel: string
  availableTitle: string
  timeLabel: string
  timeHint: string
  timeRangeError: string
  callTitle: string
  callDetail: string
  confirm: string
}

type BookingCalendarProps = {
  strings: BookingCalendarStrings
  locale: string
  today: string
}

export function BookingCalendar({ strings, locale, today }: Readonly<BookingCalendarProps>) {
  const setBooking = useBookingStore((state) => state.setBooking)
  const [calendar, setCalendar] = useState<CalendarState>(() => createCalendarState(new Date(today)))
  const [timeError, setTimeError] = useState<string | undefined>(undefined)

  useEffect(() => {
    const now = new Date()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCalendar((previous) => {
      const next = createCalendarState(now)
      return isSameState(previous, next) ? previous : next
    })
  }, [])

  const monthLabel = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
    new Date(calendar.year, calendar.month, 1),
  )
  const selectedLabel = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long' }).format(
    new Date(calendar.year, calendar.month, calendar.selectedDay),
  )

  const firstWeekday = (new Date(calendar.year, calendar.month, 1).getDay() + 6) % 7
  const days = getMonthDays(calendar.year, calendar.month, calendar.today)
  const viewMonth = new Date(calendar.year, calendar.month, 1)
  const currentMonth = new Date(calendar.today.getFullYear(), calendar.today.getMonth(), 1)
  const canGoPrevious = viewMonth.getTime() > currentMonth.getTime()

  const changeMonth = (offset: number) => {
    setCalendar((previous) => {
      const target = new Date(previous.year, previous.month + offset, 1)
      const day = getFirstAvailableDay(target.getFullYear(), target.getMonth(), previous.today)

      if (day === null) return previous

      return { ...previous, year: target.getFullYear(), month: target.getMonth(), selectedDay: day }
    })
  }

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setCalendar((previous) => ({ ...previous, time: value }))
    if (timeError) setTimeError(undefined)
  }

  const handleConfirm = () => {
    if (calendar.time < MIN_TIME || calendar.time > MAX_TIME) {
      setTimeError(strings.timeRangeError)
      return
    }
    setBooking({ day: calendar.selectedDay, time: calendar.time, label: selectedLabel })
    document.getElementById('contacto')?.scrollIntoView?.({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-dark/10 bg-white shadow-lg">
      <div className="grid lg:grid-cols-[1.2fr_1fr]">
        <div className="border-b border-dark/10 p-6 sm:p-8 lg:border-r lg:border-b-0">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 font-display text-lg font-bold">
              <CalendarDays aria-hidden className="h-5 w-5 text-teal-light" />
              {monthLabel}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label={strings.previousMonthLabel}
                disabled={!canGoPrevious}
                onClick={() => changeMonth(-1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-dark/10 text-dark/40 transition-colors hover:border-teal-light hover:text-teal-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-light disabled:cursor-default disabled:opacity-40 disabled:hover:border-dark/10 disabled:hover:text-dark/40"
              >
                <ChevronLeft aria-hidden className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label={strings.nextMonthLabel}
                onClick={() => changeMonth(1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-dark/10 text-dark/40 transition-colors hover:border-teal-light hover:text-teal-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-light"
              >
                <ChevronRight aria-hidden className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-2">
            {strings.weekdays.map((weekday) => (
              <span key={weekday} className="text-center text-xs font-semibold text-dark/60">
                {weekday}
              </span>
            ))}
            {Array.from({ length: firstWeekday }, (_, index) => (
              <span key={`blank-${index}`} aria-hidden className="h-10" />
            ))}
            {days.map(({ day, disabled }) => (
              <button
                key={day}
                type="button"
                disabled={disabled}
                aria-pressed={day === calendar.selectedDay}
                onClick={() => setCalendar((previous) => ({ ...previous, selectedDay: day }))}
                className={cn(
                  'flex h-10 items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-light',
                  day === calendar.selectedDay && 'bg-teal-light font-bold text-dark',
                  disabled && 'text-dark/20 line-through',
                  !disabled && day !== calendar.selectedDay && 'text-dark/70 hover:bg-teal-light/10',
                )}
              >
                {day}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-dark/60">{strings.timeZoneLabel}</p>
        </div>

        <div className="flex flex-col gap-6 p-6 sm:p-8">
          <div>
            <p className="text-sm font-semibold text-dark/70">{strings.availableTitle}</p>
            <p className="font-sans mt-1 text-lg font-bold">{selectedLabel}</p>
          </div>
          <Input
            id="booking-time"
            type="time"
            label={strings.timeLabel}
            hint={strings.timeHint}
            min={MIN_TIME}
            max={MAX_TIME}
            step={3600}
            value={calendar.time}
            onChange={handleTimeChange}
            error={timeError}
            className="appearance-auto"
          />
          <div className="rounded-xl border border-teal-light/40 bg-teal-light/20 p-4">
            <p className="text-sm font-semibold text-dark">{strings.callTitle}</p>
            <p className="mt-1 text-sm text-dark/80">
              <Video aria-hidden className="mr-1.5 inline h-4 w-4 text-dark" />
              {strings.callDetail}
            </p>
          </div>
          <Button type="button" size="lg" className="w-full" onClick={handleConfirm}>
            {strings.confirm}
          </Button>
        </div>
      </div>
    </div>
  )
}
