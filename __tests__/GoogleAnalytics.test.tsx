import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { GA_MEASUREMENT_ID } from '@/lib/constants/site'

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
    expect(config?.textContent).toContain(`gtag('config', '${GA_MEASUREMENT_ID}')`)
  })
})
