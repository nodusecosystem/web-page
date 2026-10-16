import { describe, expect, it } from 'vitest'
import { EMPTY_ONBOARDING_FORM } from '@/lib/constants/onboarding'
import type { OnboardingFormData } from '@/lib/types'
import { validateOnboardingForm, validateOnboardingStep } from '@/lib/validation'

const MESSAGES = {
  required: 'Este campo es obligatorio',
  emailInvalid: 'Introduce un email válido',
}

const REQUIRED_VALUES: OnboardingFormData = {
  ...EMPTY_ONBOARDING_FORM,
  nombreContacto: 'Ana Pérez',
  emailContacto: 'ana@empresa.com',
  telefonoContacto: '+57 310 0000000',
  marca: 'Inversiones Nodus S.A.S. → Nodus Ecosystem',
  frase: 'Ayudamos a empresas a conseguir clientes con pauta y automatización',
  web: 'nodusecosystem.com — IG @nodus',
  ubicacionZona: 'Colombia y LATAM — Hora Bogotá (COT)',
  servicioEstrella: 'estrella1',
  incluyeNoIncluye: 'Incluye estrategia y dashboard. No incluye community diario.',
  precio: '2.000 USD — pago anticipado',
  casosLink: 'https://tuweb.com/casos',
  clienteIdeal: 'Dueños de negocios locales que ya venden',
  aptos: 'Servicios profesionales',
  noAptos: 'Proyectos sin ventas',
  webObjetivo: 'Captar leads calificados',
  webTipo: 'corporativa',
  requisitoMinimo: 'Que facture +3.000 USD/mes',
  nombreBot: 'Soy Ana de Nodus',
  tono: 'Cálido, directo, experto',
  frasesReales: '¡Hola! Qué bueno que escribiste',
  origenLeads: 'IG DM, WhatsApp',
  quienHaceLlamada: 'Yo hago la sesión de diagnóstico',
  duracionSesion: '30',
  calendario: 'https://calendly.com/nodus',
  horarioZona: 'Lun-Vie 9am-6pm — COT',
  crm: 'ghl',
  canalBot: 'whatsapp',
  precioChatOLlamada: 'solo-llamada',
}

describe('validateOnboardingStep', () => {
  it('reports every required brand field when the step is empty', () => {
    const errors = validateOnboardingStep('brand', EMPTY_ONBOARDING_FORM, MESSAGES)

    for (const field of [
      'nombreContacto',
      'emailContacto',
      'telefonoContacto',
      'marca',
      'frase',
      'web',
      'ubicacionZona',
      'servicioEstrella',
      'incluyeNoIncluye',
      'precio',
      'casosLink',
      'clienteIdeal',
      'aptos',
      'noAptos',
    ] as const) {
      expect(errors[field]).toBe(MESSAGES.required)
    }
    expect(errors.historia).toBeUndefined()
    expect(errors.metrica).toBeUndefined()
  })

  it('rejects an invalid contact email', () => {
    const errors = validateOnboardingStep(
      'brand',
      { ...REQUIRED_VALUES, emailContacto: 'no-es-un-email' },
      MESSAGES,
    )

    expect(errors.emailContacto).toBe(MESSAGES.emailInvalid)
  })

  it('accepts a complete brand step', () => {
    expect(validateOnboardingStep('brand', REQUIRED_VALUES, MESSAGES)).toEqual({})
  })

  it('only requires objetivo and tipo in the web step', () => {
    const errors = validateOnboardingStep('web', EMPTY_ONBOARDING_FORM, MESSAGES)

    expect(errors).toEqual({
      webObjetivo: MESSAGES.required,
      webTipo: MESSAGES.required,
    })
  })

  it('reports every required automation field when the step is empty', () => {
    const errors = validateOnboardingStep('automation', EMPTY_ONBOARDING_FORM, MESSAGES)

    for (const field of [
      'requisitoMinimo',
      'nombreBot',
      'tono',
      'frasesReales',
      'origenLeads',
      'quienHaceLlamada',
      'duracionSesion',
      'calendario',
      'horarioZona',
      'crm',
      'canalBot',
      'precioChatOLlamada',
    ] as const) {
      expect(errors[field]).toBe(MESSAGES.required)
    }
    expect(errors.algoMas).toBeUndefined()
    expect(errors.tokenCRM).toBeUndefined()
  })
})

describe('validateOnboardingForm', () => {
  it('aggregates the errors of the three steps', () => {
    const errors = validateOnboardingForm(EMPTY_ONBOARDING_FORM, MESSAGES)

    expect(Object.keys(errors)).toHaveLength(14 + 2 + 12)
    expect(errors.emailContacto).toBe(MESSAGES.required)
  })

  it('accepts a fully completed form', () => {
    expect(validateOnboardingForm(REQUIRED_VALUES, MESSAGES)).toEqual({})
  })
})
