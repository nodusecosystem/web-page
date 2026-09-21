import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { getDictionary } from '@/lib/i18n/dictionaries'
import type { LegalDocumentKey } from '@/lib/legal'

type LegalPageProps = {
  documentKey: LegalDocumentKey
}

export async function LegalPage({ documentKey }: Readonly<LegalPageProps>) {
  const dict = await getDictionary()
  const legalDocument = dict.legal[documentKey]

  return (
    <Section className="bg-teal-light/5 pt-32 sm:pt-40">
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-dark sm:text-4xl">
          {legalDocument.title}
        </h1>
        <p className="mt-3 text-sm text-dark/60">{legalDocument.lastUpdated}</p>

        <div className="mt-10 flex flex-col gap-10">
          {legalDocument.sections.map((section) => (
            <article key={section.heading} className="flex flex-col gap-3">
              <h2 className="font-display text-xl font-bold text-dark">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-dark/70">
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
