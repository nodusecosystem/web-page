'use client'

import { create } from 'zustand'

export type Booking = {
  day: number
  time: string
  label: string
}

type BookingState = {
  booking: Booking | null
  setBooking: (booking: Booking) => void
}

export const useBookingStore = create<BookingState>((set) => ({
  booking: null,
  setBooking: (booking) => set({ booking }),
}))
