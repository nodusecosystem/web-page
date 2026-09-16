'use client'

import { AlertCircle, CheckCircle2, ChevronDown, Clock, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import Link from 'next/link'
import { useState, type ChangeEvent, type SubmitEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { GlowCursor } from '@/components/ui/GlowCursor'
import { Input } from '@/components/ui/Input'
import { Section } from '@/components/ui/Section'
import { Textarea } from '@/components/ui/Textarea'
import { cn } from '@/lib/cn'
import { EMPTY_CONTACT_FORM } from '@/lib/constants/contact'
import { CONTACT_COUNTRY, CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/constants/site'
import { localePath } from '@/lib/format'
import type { Locale } from '@/lib/i18n/dictionaries'
import type { ContactFormData, ContactFormErrors, FormStatus } from '@/lib/types'
import { validateContactForm, type ValidationMessages } from '@/lib/validation'

const FIELD_CLASSES =
  'h-11 w-full appearance-none rounded-lg border border-dark/15 bg-white px-3.5 text-sm text-dark transition-colors focus:border-teal-light focus:outline-none focus:ring-2 focus:ring-teal-light/20'

type FormFieldStrings = {
  label: string
  placeholder: string
}

type ContactFormStrings = {
  heading: string
  subheading: string
  remoteBadge: string
  businessHours: { day: string; hours: string }[]
  responsePrefix: string
  fields: {
    name: FormFieldStrings
    email: FormFieldStrings
    company: FormFieldStrings
    service: FormFieldStrings
    budget: FormFieldStrings
    message: FormFieldStrings
  }
  budgetOptions: { value: string; label: string }[]
  consent: {
    label: string
    linkLabel: string
  }
  messages: ValidationMessages
  submit: string
  sending: string
  sendAnother: string
  successTitle: string
  successDescription: string
  submitError: string
}

type ContactFormProps = {
  strings: ContactFormStrings
  services: { id: string; title: string }[]
  responseTime: string
  locale: Locale
  heading?: string
  subheading?: string
}

export function ContactForm({
  strings,
  services,
  responseTime,
  locale,
  heading,
  subheading,
}: Readonly<ContactFormProps>) {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_CONTACT_FORM)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleChange =
    (field: Exclude<keyof ContactFormData, 'consent'>) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { value } = event.target
      setFormData((current) => ({ ...current, [field]: value }))
      if (errors[field]) {
        setErrors((current) => ({ ...current, [field]: undefined }))
      }
    }

  const handleConsentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    setFormData((current) => ({ ...current, consent: checked }))
    if (errors.consent) {
      setErrors((current) => ({ ...current, consent: undefined }))
    }
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationErrors = validateContactForm(formData, strings.messages)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setStatus('submitting')
    await new Promise((resolve) => setTimeout(resolve, 1200))
    console.log('Contact form payload (mock):', formData)
    setStatus('success')
  }

  const resetForm = () => {
    setFormData(EMPTY_CONTACT_FORM)
    setErrors({})
    setStatus('idle')
  }

  const isSubmitting = status === 'submitting'

  return (
    <Section id="contacto" className="relative overflow-hidden bg-dark text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-teal-light/20 blur-3xl"
      />
      <GlowCursor>
        <Container className="relative grid gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {heading ?? strings.heading}
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-white/70">
            {subheading ?? strings.subheading}
          </p>
          <ul className="flex flex-col gap-5">
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-3 text-white/80 transition-colors hover:text-teal-light"
              >
                <Mail aria-hidden className="h-5 w-5 text-teal-light" />
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a
                href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-white/80 transition-colors hover:text-teal-light"
              >
                <Phone aria-hidden className="h-5 w-5 text-teal-light" />
                {CONTACT_PHONE}
              </a>
            </li>
            <li className="flex items-center gap-3 text-white/80">
              <MapPin aria-hidden className="h-5 w-5 text-teal-light" />
              {CONTACT_COUNTRY} · {strings.remoteBadge}
            </li>
            <li>
              <p className="flex items-center gap-3 text-white/80">
                <Clock aria-hidden className="h-5 w-5 text-teal-light" />
                <span>
                  {strings.businessHours.map((schedule) => (
                    <span key={schedule.day} className="block">
                      <strong className="font-semibold text-white/90">{schedule.day}:</strong>{' '}
                      {schedule.hours}
                    </span>
                  ))}
                </span>
              </p>
            </li>
          </ul>
          <p className="rounded-xl bg-white/5 px-4 py-3 text-sm text-white/60">
            {strings.responsePrefix} {responseTime}
          </p>
        </div>

        <Card className="text-dark">
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <CheckCircle2 aria-hidden className="h-14 w-14 text-teal-light" />
              <h3 className="font-display text-2xl font-bold">{strings.successTitle}</h3>
              <p className="max-w-md text-dark/60">{strings.successDescription}</p>
              <Button type="button" variant="ghost" onClick={resetForm}>
                {strings.sendAnother}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  id="name"
                  label={strings.fields.name.label}
                  placeholder={strings.fields.name.placeholder}
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange('name')}
                  error={errors.name}
                />
                <Input
                  id="email"
                  label={strings.fields.email.label}
                  type="email"
                  placeholder={strings.fields.email.placeholder}
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  error={errors.email}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  id="company"
                  label={strings.fields.company.label}
                  placeholder={strings.fields.company.placeholder}
                  autoComplete="organization"
                  value={formData.company}
                  onChange={handleChange('company')}
                />
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="service" className="text-sm font-semibold text-dark">
                    {strings.fields.service.label}
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      value={formData.service}
                      onChange={handleChange('service')}
                      className={FIELD_CLASSES}
                    >
                      <option value="">{strings.fields.service.placeholder}</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      aria-hidden
                      className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-dark/40"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="budget" className="text-sm font-semibold text-dark">
                  {strings.fields.budget.label}
                </label>
                <div className="relative">
                  <select
                    id="budget"
                    value={formData.budget}
                    onChange={handleChange('budget')}
                    className={FIELD_CLASSES}
                  >
                    <option value="">{strings.fields.budget.placeholder}</option>
                    {strings.budgetOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-dark/40"
                  />
                </div>
              </div>
              <Textarea
                id="message"
                label={strings.fields.message.label}
                placeholder={strings.fields.message.placeholder}
                value={formData.message}
                onChange={handleChange('message')}
                error={errors.message}
              />
              <div className="flex flex-col gap-1.5">
                <div className="flex items-start gap-2.5">
                  <input
                    id="consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={handleConsentChange}
                    aria-invalid={errors.consent ? true : undefined}
                    aria-describedby={errors.consent ? 'consent-error' : undefined}
                    className={cn(
                      'mt-0.5 h-4 w-4 shrink-0 rounded accent-teal-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-light',
                      errors.consent && 'outline outline-red-500',
                    )}
                  />
                  <label htmlFor="consent" className="text-sm leading-relaxed text-dark/70">
                    {strings.consent.label}{' '}
                    <Link
                      href={localePath(locale, '/politica-de-privacidad')}
                      className="font-semibold text-teal-light underline-offset-2 hover:underline"
                    >
                      {strings.consent.linkLabel}
                    </Link>
                    .
                  </label>
                </div>
                {errors.consent ? (
                  <p id="consent-error" role="alert" className="text-sm text-red-600">
                    {errors.consent}
                  </p>
                ) : null}
              </div>
              {status === 'error' ? (
                <p role="alert" className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle aria-hidden className="h-4 w-4 shrink-0" />
                  {strings.submitError}
                </p>
              ) : null}
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
                    {strings.sending}
                  </>
                ) : (
                  <>
                    <Send aria-hidden className="h-4 w-4" />
                    {strings.submit}
                  </>
                )}
              </Button>
            </form>
          )}
        </Card>
        </Container>
      </GlowCursor>
    </Section>
  )
}
