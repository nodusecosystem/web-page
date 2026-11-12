import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { GA_MEASUREMENT_ID } from '@/lib/constants/site'
import { INTERNAL_TRAFFIC_STORAGE_KEY } from '@/lib/consent'

const getInjectedScripts = (): HTMLScriptElement[] =>
  Array.from(document.body.querySelectorAll('script[data-nscript="afterInteractive"]'))

describe('GoogleAnalytics', () => {
  afterEach(() => {
    for (const script of getInjectedScripts()) script.remove()
    vi.unstubAllEnvs()
  })

  it('does not load the tag outside production', () => {
    vi.stubEnv('NODE_ENV', 'development')
    render(<GoogleAnalytics />)
    expect(getInjectedScripts()).toHaveLength(0)
  })

  it('loads gtag.js and configures the measurement ID in production', () => {
    vi.stubEnv('NODE_ENV', 'production')
    render(<GoogleAnalytics />)

    const scripts = getInjectedScripts()
    const loader = scripts.find((script) => script.src.includes('googletagmanager.com/gtag/js'))
    expect(loader).toHaveAttribute('src', expect.stringContaining(GA_MEASUREMENT_ID))

    const config = scripts.find((script) => script.textContent?.includes("gtag('config'"))
    expect(config?.textContent).toContain("gtag('consent', 'default'")
    expect(config?.textContent).toContain('analytics_storage')
    expect(config?.textContent).toContain(`gtag('config', '${GA_MEASUREMENT_ID}', internal ?`)

    const code = config?.textContent ?? ''

    const run = (search: string, stored: Record<string, string> = {}) => {
      const storage = new Map(Object.entries(stored))
      const dataLayer: unknown[] = []
      const fakeWindow = {
        dataLayer,
        location: { search },
        localStorage: {
          getItem: (key: string) => storage.get(key) ?? null,
          setItem: (key: string, value: string) => void storage.set(key, value),
          removeItem: (key: string) => void storage.delete(key),
        },
      }
      new Function('window', 'dataLayer', 'URLSearchParams', code)(fakeWindow, dataLayer, URLSearchParams)
      const calls = dataLayer.map((entry) => Array.from(entry as ArrayLike<unknown>))
      return { calls, storage }
    }

    expect(run('').calls.find((call) => call[0] === 'config')?.[2]).toEqual({})
    const optIn = run('?traffic_type=internal')
    expect(optIn.calls.find((call) => call[0] === 'config')?.[2]).toEqual({ traffic_type: 'internal' })
    expect(optIn.storage.get(INTERNAL_TRAFFIC_STORAGE_KEY)).toBe('1')
    expect(run('', { [INTERNAL_TRAFFIC_STORAGE_KEY]: '1' }).calls.find((call) => call[0] === 'config')?.[2]).toEqual({
      traffic_type: 'internal',
    })
    expect(
      run('?traffic_type=external', { [INTERNAL_TRAFFIC_STORAGE_KEY]: '1' }).calls.find((call) => call[0] === 'config')?.[2],
    ).toEqual({})
  })
})
