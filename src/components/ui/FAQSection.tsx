import { ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { FAQ_ITEMS, FAQ_SCHEMA } from '@/lib/constants/faq'
import { cn } from '@/lib/cn'

type FAQSectionProps = {
  id?: string
  heading?: string
  subheading?: string
  className?: string
}

export function FAQSection({
  id,
  heading = 'Preguntas frecuentes',
  subheading = 'Todo lo que necesitas saber sobre nuestro esquema de trabajo mensual, tiempos de entrega y garantía.',
  className,
}: FAQSectionProps) {
  return (
    <section id={id} className={cn('scroll-mt-20 py-20 sm:py-28', className)}>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Badge>FAQ</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {heading}
          </h2>
          {subheading ? <p className="mt-4 text-lg text-navy/60">{subheading}</p> : null}
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.id}
              className="group rounded-2xl border border-navy/10 bg-white p-5 transition-shadow open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-navy [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown
                  aria-hidden
                  className="h-5 w-5 shrink-0 text-deep-blue transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-navy/60">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
    </section>
  )
}
