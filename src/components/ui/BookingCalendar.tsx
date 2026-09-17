'use client'

import { CalendarDays, ChevronLeft, ChevronRight, Video } from 'lucide-react'
import { useState, type ChangeEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useBookingStore } from '@/lib/booking-store'
import { cn } from '@/lib/cn'
import { format } from '@/lib/format'

const CALENDAR_DAYS: { day: number; disabled?: boolean }[] = [
  { day: 10 },
  { day: 11 },
  { day: 12 },
  { day: 13 },
  { day: 14 },
  { day: 15, disabled: true },
  { day: 16, disabled: true },
  { day: 17 },
  { day: 18 },
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

const MIN_TIME = '09:00'
const MAX_TIME = '17:00'
const DEFAULT_DAY = 18

type BookingCalendarStrings = {
  month: string
  weekdays: string[]
  timeZoneLabel: string
  availableTitle: string
  dayLabel: string
  timeLabel: string
  timeHint: string
  timeRangeError: string
  callTitle: string
  callDetail: string
  confirm: string
}

export function BookingCalendar({ strings }: Readonly<{ strings: BookingCalendarStrings }>) {
  const setBooking = useBookingStore((state) => state.setBooking)
  const [selectedDay, setSelectedDay] = useState(DEFAULT_DAY)
  const [selectedTime, setSelectedTime] = useState(MIN_TIME)
  const [timeError, setTimeError] = useState<string | undefined>(undefined)

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value)
    if (timeError) setTimeError(undefined)
  }

  const handleConfirm = () => {
    if (selectedTime < MIN_TIME || selectedTime > MAX_TIME) {
      setTimeError(strings.timeRangeError)
      return
    }
    setBooking({
      day: selectedDay,
      time: selectedTime,
      label: format(strings.dayLabel, { day: selectedDay }),
    })
    document.getElementById('contacto')?.scrollIntoView?.({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-dark/10 bg-white shadow-lg">
      <div className="grid lg:grid-cols-[1.2fr_1fr]">
        <div className="border-b border-dark/10 p-6 sm:p-8 lg:border-r lg:border-b-0">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 font-display text-lg font-bold">
              <CalendarDays aria-hidden className="h-5 w-5 text-teal-light" />
              {strings.month}
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
            {strings.weekdays.map((weekday) => (
              <span key={weekday} className="text-center text-xs font-semibold text-dark/40">
                {weekday}
              </span>
            ))}
            {CALENDAR_DAYS.map(({ day, disabled }) => (
              <button
                key={day}
                type="button"
                disabled={disabled}
                aria-pressed={day === selectedDay}
                onClick={() => setSelectedDay(day)}
                className={cn(
                  'flex h-10 items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-light',
                  day === selectedDay && 'bg-teal-light font-bold text-dark',
                  disabled && 'text-dark/20 line-through',
                  !disabled && day !== selectedDay && 'text-dark/70 hover:bg-teal-light/10',
                )}
              >
                {day}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-dark/40">{strings.timeZoneLabel}</p>
        </div>

        <div className="flex flex-col gap-6 p-6 sm:p-8">
          <div>
            <p className="text-sm font-semibold text-dark/50">{strings.availableTitle}</p>
            <p className="font-sans mt-1 text-lg font-bold">
              {format(strings.dayLabel, { day: selectedDay })}
            </p>
          </div>
          <Input
            id="booking-time"
            type="time"
            label={strings.timeLabel}
            hint={strings.timeHint}
            min={MIN_TIME}
            max={MAX_TIME}
            value={selectedTime}
            onChange={handleTimeChange}
            error={timeError}
            className="appearance-auto"
          />
          <div className="rounded-xl bg-teal-light/10 p-4">
            <p className="text-sm font-semibold text-dark">{strings.callTitle}</p>
            <p className="mt-1 text-sm text-dark/60">
              <Video aria-hidden className="mr-1.5 inline h-4 w-4 text-teal-light" />
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
