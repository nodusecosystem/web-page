import { afterEach, describe, expect, it, vi } from 'vitest'
import { submitOnboarding } from '@/app/[lang]/onboarding/actions'
import { EMPTY_ONBOARDING_FORM } from '@/lib/constants/onboarding'

const WEBHOOK = 'https://n8n.example.com/webhook/onboarding-submit'
const SECRET = 'test-secret-token'

describe('submitOnboarding', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    delete process.env.N8N_ONBOARDING_WEBHOOK_URL
    delete process.env.N8N_ONBOARDING_WEBHOOK_SECRET
  })

  it('throws a clear error when the webhook URL is missing', async () => {
    process.env.N8N_ONBOARDING_WEBHOOK_SECRET = SECRET

    await expect(submitOnboarding(EMPTY_ONBOARDING_FORM)).rejects.toThrow(
      'N8N_ONBOARDING_WEBHOOK_URL is not configured',
    )
  })

  it('throws a clear error when the secret is missing', async () => {
    process.env.N8N_ONBOARDING_WEBHOOK_URL = WEBHOOK

    await expect(submitOnboarding(EMPTY_ONBOARDING_FORM)).rejects.toThrow(
      'N8N_ONBOARDING_WEBHOOK_SECRET is not configured',
    )
  })

  it('posts all fields with the auth header and returns ok', async () => {
    process.env.N8N_ONBOARDING_WEBHOOK_URL = WEBHOOK
    process.env.N8N_ONBOARDING_WEBHOOK_SECRET = SECRET
    const fetchMock = vi.fn<(url: string, init?: RequestInit) => Promise<Response>>(
      async () => new Response('ok', { status: 200 }),
    )
    vi.stubGlobal('fetch', fetchMock)

    const form = { ...EMPTY_ONBOARDING_FORM, marca: 'Nodus S.A.S.' }
    await expect(submitOnboarding(form)).resolves.toEqual({ ok: true })

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Nodus-Key': SECRET },
      body: JSON.stringify(form),
    })
    const sentBody = fetchMock.mock.calls[0]?.[1]?.body
    expect(typeof sentBody).toBe('string')
    if (typeof sentBody === 'string') {
      expect(Object.keys(JSON.parse(sentBody) as Record<string, string>)).toHaveLength(68)
    }
  })

  it('throws the n8n error text when the webhook rejects (e.g. wrong secret)', async () => {
    process.env.N8N_ONBOARDING_WEBHOOK_URL = WEBHOOK
    process.env.N8N_ONBOARDING_WEBHOOK_SECRET = 'wrong-secret'
    vi.stubGlobal('fetch', vi.fn(async () => new Response('Unauthorized', { status: 401 })))

    await expect(submitOnboarding(EMPTY_ONBOARDING_FORM)).rejects.toThrow('Unauthorized')
  })
})
