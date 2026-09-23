import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { AnimatedHeading } from '@/components/animations/AnimatedHeading'

const textOf = (html: string) => html.replace(/<[^>]*>/g, '')

describe('AnimatedHeading', () => {
  it('separates lines with a space in the server HTML so the text reads correctly', () => {
    const html = renderToString(
      <AnimatedHeading line1="Ecosistema digital de" line2="Crecimiento" fontSize={84} />,
    )

    expect(textOf(html)).toBe('Ecosistema digital de Crecimiento')
  })

  it('trims each line and drops empty ones', () => {
    const html = renderToString(
      <AnimatedHeading line1="  Hola  " line2="" line3="Mundo" fontSize={48} />,
    )

    expect(textOf(html)).toBe('Hola Mundo')
  })
})
