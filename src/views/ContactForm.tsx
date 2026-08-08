'use client'

import { AlertCircle, CheckCircle2, ChevronDown, Clock, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Input } from '@/components/ui/Input'
import { Section } from '@/components/ui/Section'
import { Textarea } from '@/components/ui/Textarea'
import { EMPTY_CONTACT_FORM } from '@/lib/constants/contact'
import { CONTACT_CITY, CONTACT_COUNTRY, CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/constants/site'
import type { ContactFormData, ContactFormErrors, FormStatus } from '@/lib/types'
import { validateContactForm, type ValidationMessages } from '@/lib/validation'

const FIELD_CLASSES =
  'h-11 w-full appearance-none rounded-lg border border-navy/15 bg-white px-3.5 text-sm text-navy transition-colors focus:border-deep-blue focus:outline-none focus:ring-2 focus:ring-deep-blue/20'

type FormFieldStrings = {
  label: string
  placeholder: string
}

type ContactFormStrings = {
  badge: string
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
  heading?: string
  subheading?: string
}

export function ContactForm({
  strings,
  services,
  responseTime,
  heading,
  subheading,
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_CONTACT_FORM)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleChange =
    (field: keyof ContactFormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { value } = event.target
      setFormData((current) => ({ ...current, [field]: value }))
      if (errors[field]) {
        setErrors((current) => ({ ...current, [field]: undefined }))
      }
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
    <Section id="contacto" className="relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-turquoise/20 blur-3xl"
      />
      <Container className="relative grid gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <Badge className="bg-white/10 text-turquoise">{strings.badge}</Badge>
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
                className="flex items-center gap-3 text-white/80 transition-colors hover:text-turquoise"
              >
                <Mail aria-hidden className="h-5 w-5 text-turquoise" />
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a
                href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-white/80 transition-colors hover:text-turquoise"
              >
                <Phone aria-hidden className="h-5 w-5 text-turquoise" />
                {CONTACT_PHONE}
              </a>
            </li>
            <li className="flex items-center gap-3 text-white/80">
              <MapPin aria-hidden className="h-5 w-5 text-turquoise" />
              {CONTACT_CITY}, {CONTACT_COUNTRY} · {strings.remoteBadge}
            </li>
            <li>
              <p className="flex items-center gap-3 text-white/80">
                <Clock aria-hidden className="h-5 w-5 text-turquoise" />
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

        <Card className="bg-white text-navy">
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <CheckCircle2 aria-hidden className="h-14 w-14 text-teal" />
              <h3 className="font-display text-2xl font-bold">{strings.successTitle}</h3>
              <p className="max-w-md text-navy/60">{strings.successDescription}</p>
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
                  <label htmlFor="service" className="text-sm font-semibold text-navy">
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
                      className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-navy/40"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="budget" className="text-sm font-semibold text-navy">
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
                    className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-navy/40"
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
    </Section>
  )
}
