import { ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { faqPageSchema } from '@/lib/schema'
import { cn } from '@/lib/cn'

type FAQSectionProps = {
  id?: string
  heading?: string
  subheading?: string
  className?: string
}

export async function FAQSection({ id, heading, subheading, className }: FAQSectionProps = {}) {
  const dict = await getDictionary()
  const { faq } = dict

  return (
    <section id={id} className={cn('scroll-mt-20 py-20 sm:py-28', className)}>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Badge>{faq.badge}</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {heading ?? faq.heading}
          </h2>
          {subheading ? <p className="mt-4 text-lg text-dark/60">{subheading}</p> : null}
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {faq.items.map((item) => (
            <details
              key={item.id}
              className="group rounded-2xl border border-teal-light/25 bg-white p-5 transition-all duration-300 open:border-teal-light open:bg-teal-light/5 open:shadow-md open:glass-highlight"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-dark [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown
                  aria-hidden
                  className="h-5 w-5 shrink-0 text-teal-light transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-dark/60">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(dict)) }}
      />
    </section>
  )
}
