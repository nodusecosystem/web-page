import type { BusinessHours, ContactFormData } from '@/lib/types'

export const MIN_NAME_LENGTH = 2
export const MIN_MESSAGE_LENGTH = 10
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const EMPTY_CONTACT_FORM: ContactFormData = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  message: '',
}

export const BUDGET_OPTIONS: { value: string; label: string }[] = [
  { value: 'less-1000', label: 'Menos de 1.000 €/mes' },
  { value: '1000-2500', label: '1.000 – 2.500 €/mes' },
  { value: '2500-5000', label: '2.500 – 5.000 €/mes' },
  { value: 'more-5000', label: 'Más de 5.000 €/mes' },
  { value: 'unknown', label: 'Aún no lo sé' },
]

export const BUSINESS_HOURS: BusinessHours[] = [
  { day: 'Lunes a viernes', hours: '09:00 – 18:00' },
  { day: 'Sábados y domingos', hours: 'Cerrado' },
]
