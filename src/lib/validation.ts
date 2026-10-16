import { EMAIL_REGEX, MIN_NAME_LENGTH } from '@/lib/constants/contact'
import {
  ONBOARDING_STEPS,
  REQUIRED_ONBOARDING_FIELDS,
} from '@/lib/constants/onboarding'
import { format } from '@/lib/format'
import type {
  ContactFormData,
  ContactFormErrors,
  OnboardingFormData,
  OnboardingFormErrors,
  OnboardingStepId,
} from '@/lib/types'

export type ValidationMessages = {
  nameTooShort: string
  emailInvalid: string
  consentRequired: string
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

  if (!form.consent) {
    errors.consent = messages.consentRequired
  }

  return errors
}

export type OnboardingValidationMessages = {
  required: string
  emailInvalid: string
}

export function validateOnboardingStep(
  step: OnboardingStepId,
  form: OnboardingFormData,
  messages: OnboardingValidationMessages,
): OnboardingFormErrors {
  const errors: OnboardingFormErrors = {}

  for (const field of REQUIRED_ONBOARDING_FIELDS[step]) {
    if (form[field].trim().length === 0) {
      errors[field] = messages.required
    }
  }

  if (form.emailContacto.trim().length > 0 && !EMAIL_REGEX.test(form.emailContacto.trim())) {
    errors.emailContacto = messages.emailInvalid
  }

  return errors
}

export function validateOnboardingForm(
  form: OnboardingFormData,
  messages: OnboardingValidationMessages,
): OnboardingFormErrors {
  return ONBOARDING_STEPS.reduce<OnboardingFormErrors>(
    (errors, step) => ({ ...errors, ...validateOnboardingStep(step, form, messages) }),
    {},
  )
}
