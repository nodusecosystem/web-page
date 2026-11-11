'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { alternateLocalePath } from '@/lib/constants/services'
import type { Locale } from '@/lib/i18n/dictionaries'

type LanguageLinksProps = {
  label: string
  currentLocale: Locale
  options: { code: Locale; label: string }[]
}

export function LanguageLinks({ label, currentLocale, options }: Readonly<LanguageLinksProps>) {
  const pathname = usePathname()

  return (
    <nav aria-label={label} className="flex items-center gap-3 text-sm text-white/60">
      <span>{label}:</span>
      {options.map((option) => (
        <Link
          key={option.code}
          href={alternateLocalePath(pathname, option.code)}
          hrefLang={option.code}
          aria-current={option.code === currentLocale ? 'page' : undefined}
          className="transition-colors hover:text-teal-light aria-[current=page]:font-semibold aria-[current=page]:text-white"
        >
          {option.label}
        </Link>
      ))}
    </nav>
  )
}
