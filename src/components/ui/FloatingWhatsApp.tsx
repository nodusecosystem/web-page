'use client'

import { useEffect, useState } from 'react'
import { WhatsAppIcon } from '@/components/ui/social-icons'
import { trackLead } from '@/lib/analytics'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion'

const PULSE_INTERVAL_MS = 10_000

type FloatingWhatsAppProps = {
  href: string
  ariaLabel: string
  tooltip: string
}

export function FloatingWhatsApp({ href, ariaLabel, tooltip }: Readonly<FloatingWhatsAppProps>) {
  const reduceMotion = usePrefersReducedMotion()
  const [pulse, setPulse] = useState(0)

  // Un pulso al aparecer y otro cada 10 s: un ping infinito obligaba a
  // repintar (y recalcular los backdrop-filter) en cada frame.
  useEffect(() => {
    if (reduceMotion) return
    const timer = window.setInterval(() => setPulse((count) => count + 1), PULSE_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [reduceMotion])

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={() => trackLead('whatsapp', { placement: 'floating_button' })}
      className="group fixed bottom-5 right-7 z-40 flex items-center gap-3 motion-safe:animate-fade-in-late md:right-8 md:bottom-6"
    >
      <span
        aria-hidden
        className="pointer-events-none hidden translate-x-2 rounded-full bg-dark px-4 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 md:block"
      >
        {tooltip}
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-teal-light text-dark shadow-lg transition-transform duration-200 group-hover:scale-105">
        <span
          key={pulse}
          aria-hidden
          data-testid="whatsapp-pulse"
          className={cn(
            'absolute inset-0 hidden rounded-full bg-teal-light opacity-60 motion-safe:animate-ping-once sm:block',
            pulse === 0 && '[animation-delay:1400ms]',
          )}
        />
        <WhatsAppIcon className="relative" />
      </span>
    </a>
  )
}
