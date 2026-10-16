'use server'

import type { OnboardingFormData } from '@/lib/types'

export async function submitOnboarding(formData: OnboardingFormData): Promise<{ ok: true }> {
  const webhook = process.env.N8N_ONBOARDING_WEBHOOK_URL
  if (!webhook) {
    throw new Error(
      'N8N_ONBOARDING_WEBHOOK_URL is not configured. Set it in .env.local (see .env.example)',
    )
  }

  // Se envían los 68 campos tal cual (todos string, vacío = "") para que
  // n8n los guarde sin omitir ninguno.
  const response = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || 'Error al enviar a n8n')
  }

  return { ok: true }
}
