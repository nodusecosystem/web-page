import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FAQSection } from '@/components/ui/FAQSection'
import { FAQ_ITEMS } from '@/lib/constants/faq'

describe('FAQSection', () => {
  it('renders all FAQ questions', () => {
    render(<FAQSection />)
    for (const item of FAQ_ITEMS) {
      expect(screen.getByText(item.question)).toBeInTheDocument()
    }
  })

  it('opens the accordion item when its question is clicked', () => {
    render(<FAQSection />)
    const summary = screen.getByText(FAQ_ITEMS[0].question)
    const details = summary.closest('details')
    expect(details).not.toHaveAttribute('open')

    fireEvent.click(summary)
    expect(details).toHaveAttribute('open')
  })

  it('includes the FAQPage JSON-LD structured data', () => {
    render(<FAQSection />)
    const script = document.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()

    const schema = JSON.parse(script?.textContent ?? '{}') as {
      '@type'?: string
      mainEntity?: unknown[]
    }
    expect(schema['@type']).toBe('FAQPage')
    expect(schema.mainEntity).toHaveLength(FAQ_ITEMS.length)
  })
})
