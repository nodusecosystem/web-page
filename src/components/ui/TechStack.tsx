import { Container } from '@/components/ui/Container'
import { TECH_STACK } from '@/lib/constants/tech-stack'

const MARQUEE_ITEMS = [...TECH_STACK, ...TECH_STACK]

export function TechStack() {
  return (
    <section className="overflow-hidden py-10 sm:py-12">
      <Container>
        <p className="text-center text-sm font-semibold tracking-wider text-navy/50 uppercase">
          Tecnologías y plataformas que dominamos
        </p>
      </Container>
      <div className="group relative mt-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
          {MARQUEE_ITEMS.map((tech, index) => {
            const Icon = tech.icon
            return (
              <li
                key={`${tech.id}-${index}`}
                className="flex items-center gap-2.5 rounded-full border border-navy/10 bg-white px-5 py-2.5 shadow-sm"
              >
                <Icon aria-hidden className="h-4 w-4 text-deep-blue" />
                <span className="text-sm font-semibold whitespace-nowrap text-navy/70">
                  {tech.name}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
