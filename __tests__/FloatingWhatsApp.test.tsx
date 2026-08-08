import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
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
})
