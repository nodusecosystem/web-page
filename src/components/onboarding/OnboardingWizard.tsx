'use client'

import { ArrowLeft, ArrowRight, CheckCircle2, Save, Send, Trash2 } from 'lucide-react'
import { useEffect, useState, type ChangeEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Input } from '@/components/ui/Input'
import { Section } from '@/components/ui/Section'
import { Select, type SelectOption } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import {
  EMPTY_ONBOARDING_FORM,
  ONBOARDING_GROUPS,
  ONBOARDING_SELECT_FIELDS,
  ONBOARDING_STEPS,
  ONBOARDING_STORAGE_KEY,
  ONBOARDING_TEXTAREA_FIELDS,
  REQUIRED_ONBOARDING_FIELDS,
} from '@/lib/constants/onboarding'
import { format } from '@/lib/format'
import type {
  OnboardingField,
  OnboardingFormData,
  OnboardingFormErrors,
  OnboardingGroupKey,
  OnboardingSelectField,
  OnboardingStepId,
} from '@/lib/types'
import {
  validateOnboardingForm,
  validateOnboardingStep,
  type OnboardingValidationMessages,
} from '@/lib/validation'

export type OnboardingFieldStrings = {
  label: string
  placeholder?: string
  hint?: string
}

export type OnboardingStrings = {
  steps: {
    id: string
    label: string
    title: string
    description: string
  }[]
  groups: Record<OnboardingGroupKey, { title: string; description?: string }>
  fields: Record<OnboardingField, OnboardingFieldStrings>
  selectOptions: Record<OnboardingSelectField, SelectOption[]>
  selectPlaceholder: string
  navigation: {
    back: string
    next: string
    submit: string
    stepOf: string
    saveDraft: string
    discardDraft: string
    draftSaved: string
    startAgain: string
    requiredNote: string
  }
  validation: OnboardingValidationMessages
  success: {
    title: string
    description: string
  }
}

type OnboardingWizardProps = {
  strings: OnboardingStrings
}

const ALL_REQUIRED_FIELDS = new Set<OnboardingField>(
  ONBOARDING_STEPS.flatMap((step) => REQUIRED_ONBOARDING_FIELDS[step]),
)

const EMAIL_FIELDS: Partial<Record<OnboardingField, { type: string; autoComplete: string }>> = {
  emailContacto: { type: 'email', autoComplete: 'email' },
  telefonoContacto: { type: 'tel', autoComplete: 'tel' },
  nombreContacto: { type: 'text', autoComplete: 'name' },
}

export function OnboardingWizard({ strings }: Readonly<OnboardingWizardProps>) {
  const [stepIndex, setStepIndex] = useState(0)
  const [formData, setFormData] = useState<OnboardingFormData>(EMPTY_ONBOARDING_FORM)
  const [errors, setErrors] = useState<OnboardingFormErrors>({})
  const [status, setStatus] = useState<'idle' | 'success'>('idle')
  const [draftSaved, setDraftSaved] = useState(false)

  const stepId: OnboardingStepId = ONBOARDING_STEPS[stepIndex] ?? 'brand'
  const totalSteps = ONBOARDING_STEPS.length
  const progress = Math.round(((stepIndex + 1) / totalSteps) * 100)

  useEffect(() => {
    // Difiere la lectura al post-hidratación para no desincronizar el HTML
    // prerenderizado en servidor con el borrador guardado en el navegador.
    const timer = window.setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(ONBOARDING_STORAGE_KEY)
        if (!raw) return
        const parsed = JSON.parse(raw) as Partial<OnboardingFormData>
        setFormData({ ...EMPTY_ONBOARDING_FORM, ...parsed })
      } catch {
        window.localStorage.removeItem(ONBOARDING_STORAGE_KEY)
      }
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const handleChange =
    (field: OnboardingField) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { value } = event.target
      setFormData((current) => ({ ...current, [field]: value }))
      setDraftSaved(false)
      if (errors[field]) {
        setErrors((current) => ({ ...current, [field]: undefined }))
      }
    }

  const handleNext = () => {
    const stepErrors = validateOnboardingStep(stepId, formData, strings.validation)
    setErrors(stepErrors)
    if (Object.keys(stepErrors).length === 0) {
      setStepIndex((current) => Math.min(current + 1, totalSteps - 1))
    }
  }

  const handleBack = () => {
    setErrors({})
    setStepIndex((current) => Math.max(current - 1, 0))
  }

  const handleSaveDraft = () => {
    window.localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(formData))
    setDraftSaved(true)
  }

  const handleDiscardDraft = () => {
    window.localStorage.removeItem(ONBOARDING_STORAGE_KEY)
    setFormData(EMPTY_ONBOARDING_FORM)
    setErrors({})
    setDraftSaved(false)
    setStepIndex(0)
  }

  const handleSubmit = () => {
    const formErrors = validateOnboardingForm(formData, strings.validation)
    setErrors(formErrors)
    if (Object.keys(formErrors).length > 0) {
      const firstFailing = ONBOARDING_STEPS.findIndex((step) =>
        Object.keys(validateOnboardingStep(step, formData, strings.validation)).length > 0,
      )
      if (firstFailing >= 0) setStepIndex(firstFailing)
      return
    }
    // TODO: enviar a n8n cuando se defina el webhook (Server Action + N8N_ONBOARDING_WEBHOOK_URL).
    // Por ahora el formulario valida, guarda borrador y muestra el estado de éxito en local.
    setStatus('success')
  }

  const handleStartAgain = () => {
    window.localStorage.removeItem(ONBOARDING_STORAGE_KEY)
    setFormData(EMPTY_ONBOARDING_FORM)
    setErrors({})
    setDraftSaved(false)
    setStatus('idle')
    setStepIndex(0)
  }

  const renderField = (field: OnboardingField) => {
    const copy = strings.fields[field]
    const label = ALL_REQUIRED_FIELDS.has(field) ? `${copy.label} *` : copy.label
    const error = errors[field]
    const common = {
      id: `onboarding-${field}`,
      label,
      placeholder: copy.placeholder,
      hint: copy.hint,
      error,
      value: formData[field],
      onChange: handleChange(field),
    }

    if (ONBOARDING_SELECT_FIELDS.includes(field)) {
      const selectField = field as OnboardingSelectField
      return (
        <Select
          {...common}
          options={strings.selectOptions[selectField]}
          placeholder={strings.selectPlaceholder}
        />
      )
    }

    if (ONBOARDING_TEXTAREA_FIELDS.includes(field)) {
      return <Textarea {...common} rows={4} />
    }

    const native = EMAIL_FIELDS[field] ?? { type: 'text', autoComplete: 'off' }
    return <Input {...common} type={native.type} autoComplete={native.autoComplete} />
  }

  if (status === 'success') {
    return (
      <Section id="onboarding">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Card>
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <CheckCircle2 aria-hidden className="h-14 w-14 text-teal-light" />
                <h2 className="font-display text-2xl font-bold">{strings.success.title}</h2>
                <p className="max-w-md text-dark/60">{strings.success.description}</p>
                <Button type="button" variant="ghost" onClick={handleStartAgain}>
                  {strings.navigation.startAgain}
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <Section id="onboarding">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <ol className="grid gap-2 sm:grid-cols-3">
            {strings.steps.map((step, index) => {
              const isCurrent = index === stepIndex
              const isDone = index < stepIndex
              return (
                <li
                  key={step.id}
                  aria-current={isCurrent ? 'step' : undefined}
                  className={
                    isCurrent
                      ? 'rounded-xl border border-teal-light bg-teal-light/10 px-4 py-3'
                      : 'rounded-xl border border-dark/10 bg-white px-4 py-3'
                  }
                >
                  <p className="text-xs font-bold tracking-wider text-dark/50 uppercase">
                    {step.label}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-dark">
                    {isDone ? `✓ ${step.title}` : step.title}
                  </p>
                </li>
              )
            })}
          </ol>

          <div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-dark">
                {format(strings.navigation.stepOf, {
                  current: stepIndex + 1,
                  total: totalSteps,
                })}
              </p>
              <p className="text-xs text-dark/50">{strings.navigation.requiredNote}</p>
            </div>
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              className="mt-2 h-2 overflow-hidden rounded-full bg-dark/10"
            >
              <div className="h-full rounded-full bg-teal-light" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {ONBOARDING_GROUPS.filter((group) => group.step === stepId).map((group) => {
            const groupCopy = strings.groups[group.key]
            return (
              <Card key={group.key}>
                <h2 className="font-display text-xl font-bold">{groupCopy.title}</h2>
                {groupCopy.description ? (
                  <p className="mt-1 text-sm leading-relaxed text-dark/60">
                    {groupCopy.description}
                  </p>
                ) : null}
                <div className="mt-6 flex flex-col gap-5">
                  {group.fields.map((field) => (
                    <div key={field}>{renderField(field)}</div>
                  ))}
                </div>
              </Card>
            )
          })}

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              {stepIndex > 0 ? (
                <Button type="button" variant="outline" onClick={handleBack}>
                  <ArrowLeft aria-hidden className="h-4 w-4" />
                  {strings.navigation.back}
                </Button>
              ) : (
                <span />
              )}
              {stepIndex < totalSteps - 1 ? (
                <Button type="button" onClick={handleNext}>
                  {strings.navigation.next}
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="button" onClick={handleSubmit}>
                  <Send aria-hidden className="h-4 w-4" />
                  {strings.navigation.submit}
                </Button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 border-t border-dark/10 pt-4">
              <Button type="button" variant="ghost" size="sm" onClick={handleSaveDraft}>
                <Save aria-hidden className="h-4 w-4" />
                {strings.navigation.saveDraft}
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={handleDiscardDraft}>
                <Trash2 aria-hidden className="h-4 w-4" />
                {strings.navigation.discardDraft}
              </Button>
              {draftSaved ? (
                <p role="status" className="text-xs text-dark/60">
                  {strings.navigation.draftSaved}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
