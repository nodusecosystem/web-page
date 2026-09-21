import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren'
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
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {socialProof.heading}
          </h2>
          <p className="mt-4 text-lg text-dark/60">{socialProof.subheading}</p>
        </div>

        <ul
          aria-label={socialProof.clientsAriaLabel}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {socialProof.clients.map((client) => (
            <li key={client} className="font-display text-lg font-bold text-dark/60">
              {client}
            </li>
          ))}
        </ul>

        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {socialProof.cases.map((caseStudy) => (
            <StaggerItem key={caseStudy.id} className="h-full">
              <Card variant="elevated" className="flex h-full flex-col gap-5">
                <div>
                  <h3 className="font-display text-lg font-bold">{caseStudy.client}</h3>
                  <p className="mt-1 text-sm text-dark/60">{caseStudy.industry}</p>
                </div>
                <p className="text-sm leading-relaxed text-dark/70">{caseStudy.description}</p>
                <p className="rounded-xl border border-teal-light/40 bg-teal-light/20 p-4 text-sm leading-relaxed font-semibold text-dark">
                  {caseStudy.result}
                </p>
                <div className="mt-auto">
                  <p className="text-xs font-semibold tracking-wider text-dark/60 uppercase">
                    {socialProof.detailsTitle}
                  </p>
                  <p className="mt-0.5 text-xs text-dark/60">{caseStudy.period}</p>
                  <dl className="mt-3 flex flex-col gap-2.5">
                    {caseStudy.details.map((detail) => (
                      <div
                        key={detail.label}
                        className="flex items-baseline justify-between gap-4 border-b border-dark/10 pb-2.5 last:border-b-0 last:pb-0"
                      >
                        <dt className="flex-1 text-xs leading-relaxed text-dark/70">
                          {detail.label}
                        </dt>
                        <dd className="text-right text-sm font-semibold text-dark">
                          {detail.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <blockquote className="border-t border-dark/10 pt-5">
                  <p className="text-sm italic text-dark/70">“{caseStudy.testimonial}”</p>
                  <footer className="mt-2 text-xs font-semibold text-dark/60">
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
