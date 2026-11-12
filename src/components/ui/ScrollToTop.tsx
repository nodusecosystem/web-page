'use client'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { usePresence } from '@/lib/use-presence'

const SCROLL_THRESHOLD = 300
const EXIT_MS = 250

type ScrollToTopProps = {
  ariaLabel?: string
}

export function ScrollToTop({ ariaLabel = 'Volver al inicio' }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { mounted, leaving } = usePresence(isVisible, EXIT_MS)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > SCROLL_THRESHOLD)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  if (!mounted) return null

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={ariaLabel}
      className={cn(
        'fixed bottom-24 right-[34px] z-40 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-teal-light text-dark shadow-lg hover:bg-white md:right-[38px] md:bottom-24',
        '[transition:opacity_250ms_ease-out,translate_250ms_ease-out,background-color_150ms_ease] starting:translate-y-4 starting:opacity-0',
        leaving && 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <ArrowUp aria-hidden className="h-5 w-5" />
    </button>
  )
}
