import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { FAQSection } from '@/components/ui/FAQSection'
import esDict from '@/lib/i18n/es.json'

vi.mock('next/root-params', () => ({
  lang: () => Promise.resolve('es'),
}))

describe('FAQSection', () => {
  it('renders all FAQ questions', async () => {
    render(await FAQSection())
    for (const item of esDict.faq.items) {
      expect(screen.getByText(item.question)).toBeInTheDocument()
    }
  })

  it('opens the accordion item when its question is clicked', async () => {
    render(await FAQSection())
    const summary = screen.getByText(esDict.faq.items[0].question)
    const details = summary.closest('details')
    expect(details).not.toHaveAttribute('open')

    fireEvent.click(summary)
    expect(details).toHaveAttribute('open')
  })

  it('includes the FAQPage JSON-LD structured data', async () => {
    render(await FAQSection())
    const script = document.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()

    const schema = JSON.parse(script?.textContent ?? '{}') as {
      '@type'?: string
      mainEntity?: unknown[]
    }
    expect(schema['@type']).toBe('FAQPage')
    expect(schema.mainEntity).toHaveLength(esDict.faq.items.length)
  })
})
