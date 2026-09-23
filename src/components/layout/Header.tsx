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
import { useGlassPointer } from '@/lib/use-glass-pointer'

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

const LIGHT_TOP_PAGES = new Set(['/contact'])

const HEADER_MATCH_POINT = 24

const HEADER_THEME_RE = /rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/

export function Header({
  links,
  cta,
  ariaLabels,
  homeHref,
  currentLocale,
  langToggle,
}: Readonly<HeaderProps>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isPastViewport, setIsPastViewport] = useState(false)
  const pathname = usePathname()
  const [isLightTop, setIsLightTop] = useState(() =>
    LIGHT_TOP_PAGES.has(`/${pathname.split('/')[2] ?? ''}`),
  )
  const langRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const rafRef = useRef(0)
  const { handlePointerMove: handleNavPointerMove } = useGlassPointer(navRef)

  useEffect(() => {
    const readViewport = () => {
      rafRef.current = 0
      setIsPastViewport(window.scrollY > window.innerHeight * 0.3)
    }
    const scheduleRead = () => {
      if (!rafRef.current) rafRef.current = window.requestAnimationFrame(readViewport)
    }
    const initTimer = window.setTimeout(readViewport, 0)

    window.addEventListener('scroll', scheduleRead, { passive: true })
    window.addEventListener('resize', scheduleRead)
    return () => {
      window.clearTimeout(initTimer)
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', scheduleRead)
      window.removeEventListener('resize', scheduleRead)
    }
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('main section')
    const applySectionTheme = (section: HTMLElement) => {
      const background = window.getComputedStyle(section).backgroundColor
      const match = HEADER_THEME_RE.exec(background)
      if (match) {
        const [, red, green, blue, alpha = '1'] = match
        const luminance = 0.2126 * Number(red) + 0.7152 * Number(green) + 0.0722 * Number(blue)
        setIsLightTop(Number(alpha) < 0.5 || luminance > 128)
        return
      }
      const bodyMatch = HEADER_THEME_RE.exec(
        window.getComputedStyle(document.body).backgroundColor,
      )
      if (bodyMatch) {
        const [, r, g, b, alpha = '1'] = bodyMatch
        const luminance = 0.2126 * Number(r) + 0.7152 * Number(g) + 0.0722 * Number(b)
        setIsLightTop(Number(alpha) < 0.5 || luminance > 128)
      } else {
        setIsLightTop(true)
      }
    }

    const applyOnLoad = () => {
      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= HEADER_MATCH_POINT && rect.bottom >= HEADER_MATCH_POINT) {
          applySectionTheme(section)
          break
        }
      }
    }
    applyOnLoad()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            applySectionTheme(entry.target as HTMLElement)
            break
          }
        }
      },
      { rootMargin: '0px 0px -88% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
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

  const headerIsLight = !isPastViewport && isLightTop

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
        className={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
          headerIsLight ? 'text-teal-light hover:bg-teal-light/10' : 'text-white hover:bg-white/10',
        )}
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
            className="absolute top-full right-0 z-10 mt-2 w-40 overflow-hidden rounded-xl border border-teal-light/25 bg-dark/90 p-1.5 shadow-lg backdrop-blur-xl"
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
                      ? 'font-semibold text-teal-light'
                      : 'text-white/70 hover:bg-white/10',
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
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'transition-colors duration-300',
          isPastViewport ? 'glass-panel-strong' : 'border-transparent bg-transparent',
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
          <Link
            href={homeHref}
            aria-label={ariaLabels.logo}
            className="shrink-0"
            onClick={closeMenu}
          >
            <Logo
              variant="horizontal"
              theme={headerIsLight ? 'light' : 'dark'}
              className="h-10 w-auto sm:h-12"
            />
          </Link>

          <nav
            ref={navRef}
            onPointerMove={handleNavPointerMove}
            aria-label={ariaLabels.nav}
            className="glass-surface glass-nav variant-outline hidden md:flex"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-teal-light/10 hover:text-teal-light"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            {langDropdown}

            <div className="hidden md:flex">
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
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors md:hidden',
                headerIsLight ? 'text-teal-light hover:bg-teal-light/10' : 'text-white hover:bg-white/10',
              )}
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
            className="md:hidden"
          >
            <div className="glass-panel-strong w-full">
              <Container className="flex flex-col gap-1 py-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="rounded-lg px-3 py-2.5 text-base font-medium text-white hover:bg-teal-light/10"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2">
                  <Button href={cta.href} onClick={closeMenu} className="w-full">
                    {cta.label}
                  </Button>
                </div>
              </Container>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
