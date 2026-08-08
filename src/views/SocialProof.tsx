import { Quote } from 'lucide-react'
import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { getDictionary } from '@/lib/i18n/dictionaries'

export async function SocialProof() {
  const dict = await getDictionary()
  const { socialProof } = dict

  return (
    <Section id="resultados" className="bg-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Badge>{socialProof.badge}</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {socialProof.heading}
          </h2>
          <p className="mt-4 text-lg text-navy/60">{socialProof.subheading}</p>
        </div>

        <ul
          aria-label={socialProof.clientsAriaLabel}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {socialProof.clients.map((client) => (
            <li key={client} className="font-display text-lg font-bold text-navy/30">
              {client}
            </li>
          ))}
        </ul>

        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {socialProof.cases.map((caseStudy) => (
            <StaggerItem key={caseStudy.id} className="h-full">
              <Card variant="elevated" className="flex h-full flex-col gap-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold">{caseStudy.client}</h3>
                    <p className="text-sm text-navy/50">{caseStudy.industry}</p>
                  </div>
                  <Quote aria-hidden className="h-6 w-6 text-turquoise" />
                </div>
                <p className="text-sm leading-relaxed text-navy/70">{caseStudy.description}</p>
                <dl className="grid grid-cols-2 gap-4 rounded-xl bg-light p-4">
                  {caseStudy.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="sr-only">{metric.label}</dt>
                      <dd className="font-display text-xl font-bold text-deep-blue">{metric.value}</dd>
                      <p className="text-xs text-navy/60">{metric.label}</p>
                    </div>
                  ))}
                </dl>
                <blockquote className="mt-auto border-t border-navy/10 pt-5">
                  <p className="text-sm italic text-navy/70">“{caseStudy.testimonial}”</p>
                  <footer className="mt-2 text-xs font-semibold text-navy/50">
                    {caseStudy.client}
                  </footer>
                </blockquote>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </Section>
  )
}
