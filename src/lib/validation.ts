import { EMAIL_REGEX, MIN_MESSAGE_LENGTH, MIN_NAME_LENGTH } from '@/lib/constants/contact'
import { format } from '@/lib/format'
import type { ContactFormData, ContactFormErrors } from '@/lib/types'

export type ValidationMessages = {
  nameTooShort: string
  emailInvalid: string
  messageTooShort: string
}

export function validateContactForm(
  form: ContactFormData,
  messages: ValidationMessages,
): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (form.name.trim().length < MIN_NAME_LENGTH) {
    errors.name = format(messages.nameTooShort, { min: MIN_NAME_LENGTH })
  }

  if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = messages.emailInvalid
  }

  if (form.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = format(messages.messageTooShort, { min: MIN_MESSAGE_LENGTH })
  }

  return errors
}
