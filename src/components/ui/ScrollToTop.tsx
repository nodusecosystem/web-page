'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

const SCROLL_THRESHOLD = 300

type ScrollToTopProps = {
  ariaLabel?: string
}

export function ScrollToTop({ ariaLabel = 'Volver al inicio' }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > SCROLL_THRESHOLD)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label={ariaLabel}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-24 right-[34px] z-40 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-teal-light text-dark shadow-lg transition-colors hover:bg-white md:right-[38px] md:bottom-24"
        >
          <ArrowUp aria-hidden className="h-5 w-5" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}
