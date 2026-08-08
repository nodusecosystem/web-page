import type { ContactFormData } from '@/lib/types'

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
