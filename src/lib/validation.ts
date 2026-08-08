import { EMAIL_REGEX, MIN_MESSAGE_LENGTH, MIN_NAME_LENGTH } from '@/lib/constants/contact'
import type { ContactFormData, ContactFormErrors } from '@/lib/types'

export function validateContactForm(form: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (form.name.trim().length < MIN_NAME_LENGTH) {
    errors.name = `El nombre debe tener al menos ${MIN_NAME_LENGTH} caracteres`
  }

  if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = 'Introduce un email válido'
  }

  if (form.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = `El mensaje debe tener al menos ${MIN_MESSAGE_LENGTH} caracteres`
  }

  return errors
}
