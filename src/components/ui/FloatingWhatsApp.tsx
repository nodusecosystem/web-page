'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { WhatsAppIcon } from '@/components/ui/social-icons'

type FloatingWhatsAppProps = {
  href: string
  ariaLabel: string
  tooltip: string
}

export function FloatingWhatsApp({ href, ariaLabel, tooltip }: Readonly<FloatingWhatsAppProps>) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={reduceMotion ? false : { opacity: 1 }}
      transition={reduceMotion ? undefined : { delay: 1, duration: 0.4, ease: 'easeOut' }}
      className="group fixed bottom-5 right-7 z-40 flex items-center gap-3 md:right-8 md:bottom-6"
    >
      <span
        aria-hidden
        className="pointer-events-none hidden translate-x-2 rounded-full bg-dark px-4 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 md:block"
      >
        {tooltip}
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-teal-light text-dark shadow-lg transition-transform duration-200 group-hover:scale-105">
        <span aria-hidden className="absolute inset-0 hidden animate-ping rounded-full bg-teal-light opacity-60 sm:block" />
        <WhatsAppIcon className="relative" />
      </span>
    </motion.a>
  )
}
