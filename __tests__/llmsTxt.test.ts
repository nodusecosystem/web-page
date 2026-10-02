import { describe, expect, it } from 'vitest'
import { GET } from '@/app/llms.txt/route'
import { SITE_URL } from '@/lib/constants/site'
import { buildLlmsTxt } from '@/lib/llms'

const PAGE_PATHS = ['', '/about', '/services', '/contact']

describe('llms.txt', () => {
  const content = buildLlmsTxt()
  const lines = content.split('\n')

  it('follows the llms.txt v2 structure', () => {
    expect(lines[0]).toBe('# NODUS ECOSYSTEM: digital strategy')
    expect(lines[1]).toBe('')
    expect(lines[2]).toMatch(/^> /)
    expect(lines[3]).toMatch(/^> /)
    expect(content).toContain('## Páginas principales (ES)')
    expect(content).toContain('## Main pages (EN)')
    expect(content).toContain('## Optional')
  })

  it.each(PAGE_PATHS)('links the %s page in both locales with absolute URLs', (path) => {
    expect(content).toContain(`](${SITE_URL}/es${path})`)
    expect(content).toContain(`](${SITE_URL}/en${path})`)
  })

  it('lists services, case results and key facts in both languages', () => {
    for (const heading of [
      '## Servicios (ES)',
      '## Services (EN)',
      '## Casos y resultados (ES)',
      '## Case results (EN)',
      '## Datos clave (ES)',
      '## Key facts (EN)',
    ]) {
      expect(content).toContain(heading)
    }
  })

  it('includes the contact channels', () => {
    expect(content).toContain('nodusecosystem@gmail.com')
    expect(content).toContain('+57 310 6769289')
    expect(content).toContain('https://www.linkedin.com/company/nodusecosystem')
  })

  it('does not link the noindex legal pages', () => {
    expect(content).not.toContain('/aviso-legal')
    expect(content).not.toContain('/politica-de-privacidad')
    expect(content).not.toContain('/politica-de-cookies')
  })

  it('serves markdown from the route handler', async () => {
    const response = GET()

    expect(response.headers.get('Content-Type')).toBe('text/markdown; charset=utf-8')
    await expect(response.text()).resolves.toBe(content)
  })
})
