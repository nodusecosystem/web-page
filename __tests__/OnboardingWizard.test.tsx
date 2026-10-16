import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { submitOnboarding } from '@/app/[lang]/onboarding/actions'
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard'
import { ONBOARDING_STEPS, ONBOARDING_STORAGE_KEY } from '@/lib/constants/onboarding'
import esDict from '@/lib/i18n/es.json'

vi.mock('@/app/[lang]/onboarding/actions', () => ({
  submitOnboarding: vi.fn(),
}))

const submitMock = vi.mocked(submitOnboarding)

const STRINGS = esDict.onboarding
const FIELDS = STRINGS.fields

function fillField(label: string, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } })
}

function requiredLabel(field: keyof typeof FIELDS) {
  return `${FIELDS[field].label} *`
}

function fillBrandStep() {
  fillField(requiredLabel('nombreContacto'), 'Ana Pérez')
  fillField(requiredLabel('emailContacto'), 'ana@empresa.com')
  fillField(requiredLabel('telefonoContacto'), '+57 310 0000000')
  fillField(requiredLabel('marca'), 'Nodus S.A.S.')
  fillField(requiredLabel('frase'), 'Ayudamos a empresas a conseguir clientes')
  fillField(requiredLabel('web'), 'nodusecosystem.com')
  fillField(requiredLabel('ubicacionZona'), 'Colombia — COT')
  fillField(requiredLabel('servicioEstrella'), 'estrella1')
  fillField(requiredLabel('incluyeNoIncluye'), 'Incluye estrategia. No incluye community.')
  fillField(requiredLabel('precio'), '2.000 USD')
  fillField(requiredLabel('casosLink'), 'https://tuweb.com/casos')
  fillField(requiredLabel('clienteIdeal'), 'Dueños de negocios locales')
  fillField(requiredLabel('aptos'), 'Servicios profesionales')
  fillField(requiredLabel('noAptos'), 'Proyectos sin ventas')
}

function fillWebStep() {
  fillField(requiredLabel('webObjetivo'), 'Captar leads calificados')
  fillField(requiredLabel('webTipo'), 'corporativa')
}

function fillAutomationStep() {
  fillField(requiredLabel('requisitoMinimo'), 'Que facture +3.000 USD/mes')
  fillField(requiredLabel('nombreBot'), 'Soy Ana de Nodus')
  fillField(requiredLabel('tono'), 'Cálido, directo, experto')
  fillField(requiredLabel('frasesReales'), '¡Hola! Qué bueno que escribiste')
  fillField(requiredLabel('origenLeads'), 'IG DM, WhatsApp')
  fillField(requiredLabel('quienHaceLlamada'), 'Yo hago la sesión')
  fillField(requiredLabel('duracionSesion'), '30')
  fillField(requiredLabel('calendario'), 'https://calendly.com/nodus')
  fillField(requiredLabel('horarioZona'), 'Lun-Vie 9am-6pm — COT')
  fillField(requiredLabel('crm'), 'ghl')
  fillField(requiredLabel('canalBot'), 'whatsapp')
  fillField(requiredLabel('precioChatOLlamada'), 'solo-llamada')
}

function renderWizard() {
  return render(<OnboardingWizard strings={STRINGS} locale="es" />)
}

describe('OnboardingWizard', () => {
  beforeEach(() => {
    window.localStorage.clear()
    submitMock.mockReset()
    submitMock.mockResolvedValue({ ok: true })
  })

  it('keeps the step copy aligned with the step logic order', () => {
    expect(STRINGS.steps.map((step) => step.id)).toEqual(ONBOARDING_STEPS)
  })

  it('renders the three steps and starts on the brand step', () => {
    renderWizard()

    expect(screen.getByText(STRINGS.steps[0].label)).toBeInTheDocument()
    expect(screen.getByText(STRINGS.steps[1].label)).toBeInTheDocument()
    expect(screen.getByText(STRINGS.steps[2].label)).toBeInTheDocument()
    expect(screen.getByLabelText(requiredLabel('nombreContacto'))).toBeInTheDocument()
    expect(screen.queryByLabelText(requiredLabel('webObjetivo'))).not.toBeInTheDocument()
  })

  it('blocks continue and shows required errors on an empty brand step', () => {
    renderWizard()

    fireEvent.click(screen.getByRole('button', { name: STRINGS.navigation.next }))

    expect(screen.getAllByText(STRINGS.validation.required).length).toBeGreaterThan(0)
    expect(screen.getByLabelText(requiredLabel('nombreContacto'))).toBeInTheDocument()
  })

  it('shows a toast notice and focuses the first invalid field when blocked', async () => {
    renderWizard()

    fireEvent.click(screen.getByRole('button', { name: STRINGS.navigation.next }))

    const alert = screen.getByText(
      'Completa los 14 campos obligatorios marcados para continuar',
    )
    expect(alert).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByLabelText(requiredLabel('nombreContacto'))).toHaveFocus()
    })
  })

  it('clears the field error while typing', () => {
    renderWizard()

    fireEvent.click(screen.getByRole('button', { name: STRINGS.navigation.next }))
    expect(screen.getAllByText(STRINGS.validation.required).length).toBeGreaterThan(0)

    fillField(requiredLabel('nombreContacto'), 'Ana Pérez')
    const alerts = screen.getAllByText(STRINGS.validation.required)
    expect(alerts.length).toBeLessThan(14)
  })

  it('dismisses the toast notice with its close button', async () => {
    renderWizard()

    fireEvent.click(screen.getByRole('button', { name: STRINGS.navigation.next }))
    const toastText = 'Completa los 14 campos obligatorios marcados para continuar'
    expect(screen.getByText(toastText)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: STRINGS.navigation.dismiss }))
    await waitFor(() => {
      expect(screen.queryByText(toastText)).not.toBeInTheDocument()
    })
  })

  it('advances to the web step once the brand step is valid and goes back', () => {
    renderWizard()
    fillBrandStep()

    fireEvent.click(screen.getByRole('button', { name: STRINGS.navigation.next }))

    expect(screen.getByLabelText(requiredLabel('webObjetivo'))).toBeInTheDocument()
    expect(screen.queryByLabelText(requiredLabel('nombreContacto'))).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: STRINGS.navigation.back }))
    expect(screen.getByLabelText(requiredLabel('nombreContacto'))).toBeInTheDocument()
  })

  it('saves the draft to localStorage and confirms it', () => {
    renderWizard()
    fillField(requiredLabel('nombreContacto'), 'Ana Pérez')

    fireEvent.click(screen.getByRole('button', { name: STRINGS.navigation.saveDraft }))

    expect(screen.getByText(STRINGS.navigation.draftSaved)).toBeInTheDocument()
    const raw = window.localStorage.getItem(ONBOARDING_STORAGE_KEY)
    expect(raw).toContain('Ana Pérez')
  })

  it('restores a saved draft on mount', async () => {
    window.localStorage.setItem(
      ONBOARDING_STORAGE_KEY,
      JSON.stringify({ nombreContacto: 'Ana Pérez' }),
    )
    renderWizard()

    expect(await screen.findByDisplayValue('Ana Pérez')).toBeInTheDocument()
  })

  it('sends the three steps to n8n and shows the success state', async () => {
    window.localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify({ marca: 'Previa' }))
    renderWizard()
    fillBrandStep()
    fireEvent.click(screen.getByRole('button', { name: STRINGS.navigation.next }))

    fillWebStep()
    fireEvent.click(screen.getByRole('button', { name: STRINGS.navigation.next }))

    fillAutomationStep()
    fireEvent.click(screen.getByRole('button', { name: STRINGS.navigation.submit }))

    expect(await screen.findByText(STRINGS.success.title)).toBeInTheDocument()
    expect(screen.getByText(STRINGS.success.description)).toBeInTheDocument()
    expect(submitMock).toHaveBeenCalledTimes(1)
    const payload = submitMock.mock.calls[0]?.[0] as Record<string, string>
    expect(Object.keys(payload)).toHaveLength(68)
    expect(payload.marca).toBe('Nodus S.A.S.')
    expect(payload.servicioEstrella).toBe('estrella1')
    expect(window.localStorage.getItem(ONBOARDING_STORAGE_KEY)).toBeNull()
    expect(
      screen.getByRole('link', { name: STRINGS.navigation.backToSite }),
    ).toHaveAttribute('href', '/es')
  })

  it('shows an error toast and keeps the draft when n8n fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    submitMock.mockRejectedValueOnce(new Error('n8n down'))

    try {
      renderWizard()
      fillBrandStep()
      fireEvent.click(screen.getByRole('button', { name: STRINGS.navigation.next }))
      fillWebStep()
      fireEvent.click(screen.getByRole('button', { name: STRINGS.navigation.next }))
      fillAutomationStep()
      fireEvent.click(screen.getByRole('button', { name: STRINGS.navigation.submit }))

      expect(await screen.findByText(STRINGS.navigation.submitError)).toBeInTheDocument()
      expect(screen.queryByText(STRINGS.success.title)).not.toBeInTheDocument()
    } finally {
      consoleSpy.mockRestore()
    }
  })

  it('submitting an incomplete last step jumps back to the first failing step', () => {
    renderWizard()
    fillBrandStep()
    fireEvent.click(screen.getByRole('button', { name: STRINGS.navigation.next }))
    fillWebStep()
    fireEvent.click(screen.getByRole('button', { name: STRINGS.navigation.next }))

    fireEvent.click(screen.getByRole('button', { name: STRINGS.navigation.submit }))

    expect(screen.queryByText(STRINGS.success.title)).not.toBeInTheDocument()
    expect(screen.getAllByText(STRINGS.validation.required).length).toBeGreaterThan(0)
  })
})
