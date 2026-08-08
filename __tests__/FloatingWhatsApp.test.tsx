import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp'
import { WHATSAPP_LINK } from '@/lib/constants/site'

describe('FloatingWhatsApp', () => {
  it('renders a link to WhatsApp with the pre-filled message', () => {
    render(<FloatingWhatsApp />)
    const link = screen.getByRole('link', { name: /whatsapp/i })
    expect(link).toHaveAttribute('href', WHATSAPP_LINK)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('includes the tooltip with the pre-filled message', () => {
    render(<FloatingWhatsApp />)
    expect(
      screen.getByText('Hola nodus, quiero información sobre sus planes mensuales'),
    ).toBeInTheDocument()
  })
})
