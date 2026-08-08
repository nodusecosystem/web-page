'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, Globe, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/cn'

type HeaderLink = {
  label: string
  href: string
}

type HeaderAriaLabels = {
  logo: string
  nav: string
  mobileNav: string
  openMenu: string
  closeMenu: string
}

type LangToggleStrings = {
  ariaLabel: string
  es: string
  en: string
}

type HeaderProps = {
  links: HeaderLink[]
  cta: HeaderLink
  ariaLabels: HeaderAriaLabels
  homeHref: string
  currentLocale: string
  langToggle: LangToggleStrings
}

const LANG_OPTIONS: { code: string; labelKey: 'es' | 'en' }[] = [
  { code: 'es', labelKey: 'es' },
  { code: 'en', labelKey: 'en' },
]

export function Header({
  links,
  cta,
  ariaLabels,
  homeHref,
  currentLocale,
  langToggle,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsLangOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  const alternateHref = (locale: string) => {
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/') || '/'
  }

  const langDropdown = (
    <div ref={langRef} className="relative">
      <button
        type="button"
        onClick={() => setIsLangOpen((open) => !open)}
        aria-expanded={isLangOpen}
        aria-haspopup="menu"
        aria-label={langToggle.ariaLabel}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy transition-colors hover:bg-light"
      >
        <Globe aria-hidden className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isLangOpen ? (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 z-10 mt-2 w-40 overflow-hidden rounded-xl border border-navy/10 bg-white p-1.5 shadow-lg"
          >
            {LANG_OPTIONS.map((option) => {
              const isActive = option.code === currentLocale
              return (
                <Link
                  key={option.code}
                  role="menuitem"
                  href={alternateHref(option.code)}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => {
                    setIsLangOpen(false)
                    closeMenu()
                  }}
                  className={cn(
                    'flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'font-semibold text-deep-blue'
                      : 'text-navy/70 hover:bg-light',
                  )}
                >
                  {langToggle[option.labelKey]}
                  {isActive ? <Check aria-hidden className="h-4 w-4" /> : null}
                </Link>
              )
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 transition-shadow duration-300', isScrolled && 'shadow-md')}>
      <div className="border-b border-navy/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
          <a href={homeHref} aria-label={ariaLabels.logo} className="shrink-0" onClick={closeMenu}>
            <Logo variant="horizontal" className="h-8 w-auto sm:h-10" />
          </a>

          <nav aria-label={ariaLabels.nav} className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-navy/80 transition-colors hover:text-deep-blue"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            {langDropdown}

            <div className="hidden md:block">
              <Button href={cta.href} size="sm">
                {cta.label}
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? ariaLabels.closeMenu : ariaLabels.openMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy hover:bg-light md:hidden"
            >
              {isMenuOpen ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
            </button>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.nav
            id="mobile-menu"
            aria-label={ariaLabels.mobileNav}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-b border-navy/10 bg-white md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-navy hover:bg-light"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2">
                <Button href={cta.href} onClick={closeMenu} className="w-full">
                  {cta.label}
                </Button>
              </div>
            </Container>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
