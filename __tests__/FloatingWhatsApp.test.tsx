import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp'
import { buildWhatsAppLink } from '@/lib/constants/site'
import esDict from '@/lib/i18n/es.json'

const WHATSAPP_PROPS = {
  href: buildWhatsAppLink(esDict.site.whatsappMessage),
  ariaLabel: esDict.floatingWhatsApp.ariaLabel,
  tooltip: esDict.floatingWhatsApp.tooltip,
}

describe('FloatingWhatsApp', () => {
  it('renders a link to WhatsApp with the pre-filled message', () => {
    render(<FloatingWhatsApp {...WHATSAPP_PROPS} />)
    const link = screen.getByRole('link', { name: /whatsapp/i })
    expect(link).toHaveAttribute('href', WHATSAPP_PROPS.href)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('includes the tooltip with the pre-filled message', () => {
    render(<FloatingWhatsApp {...WHATSAPP_PROPS} />)
    expect(screen.getByText(esDict.floatingWhatsApp.tooltip)).toBeInTheDocument()
  })

  it('pulses once on appearance and again every 10 seconds', () => {
    vi.useFakeTimers()
    try {
      render(<FloatingWhatsApp {...WHATSAPP_PROPS} />)
      const firstPulse = screen.getByTestId('whatsapp-pulse')
      expect(firstPulse).toHaveClass('motion-safe:animate-ping-once')

      act(() => {
        vi.advanceTimersByTime(9_999)
      })
      expect(screen.getByTestId('whatsapp-pulse')).toBe(firstPulse)

      act(() => {
        vi.advanceTimersByTime(1)
      })
      const nextPulse = screen.getByTestId('whatsapp-pulse')
      expect(nextPulse).not.toBe(firstPulse)
      expect(nextPulse).toHaveClass('motion-safe:animate-ping-once')
    } finally {
      vi.useRealTimers()
    }
  })

  it('tracks a whatsapp_click lead event when clicked', () => {
    const calls: unknown[][] = []
    const target = window as Window & { gtag?: (...args: unknown[]) => void }
    target.gtag = (...args: unknown[]) => calls.push(args)
    render(<FloatingWhatsApp {...WHATSAPP_PROPS} />)

    fireEvent.click(screen.getByRole('link', { name: /whatsapp/i }))

    expect(calls).toEqual([
      ['event', 'whatsapp_click', { lead_channel: 'whatsapp', placement: 'floating_button' }],
    ])
    delete target.gtag
  })
})
