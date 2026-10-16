'use server'

import type { OnboardingFormData } from '@/lib/types'

const N8N_AUTH_HEADER = 'X-Nodus-Key'

export async function submitOnboarding(formData: OnboardingFormData): Promise<{ ok: true }> {
  const webhook = process.env.N8N_ONBOARDING_WEBHOOK_URL
  if (!webhook) {
    throw new Error(
      'N8N_ONBOARDING_WEBHOOK_URL is not configured. Set it in .env.local (see .env.example)',
    )
  }
  const secret = process.env.N8N_ONBOARDING_WEBHOOK_SECRET
  if (!secret) {
    throw new Error(
      'N8N_ONBOARDING_WEBHOOK_SECRET is not configured. Set it in .env.local (see .env.example)',
    )
  }

  // Se envían los 68 campos tal cual (todos string, vacío = "") para que
  // n8n los guarde sin omitir ninguno. El secreto viaja solo servidor → n8n,
  // nunca llega al navegador.
  const response = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', [N8N_AUTH_HEADER]: secret },
    body: JSON.stringify(formData),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || 'Error al enviar a n8n')
  }

  return { ok: true }
}
