'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
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

type HeaderProps = {
  links: HeaderLink[]
  cta: HeaderLink
  ariaLabels: HeaderAriaLabels
  homeHref: string
}

export function Header({ links, cta, ariaLabels, homeHref }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

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
