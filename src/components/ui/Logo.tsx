import Image from 'next/image'
import { cn } from '@/lib/cn'

export type LogoVariant = 'horizontal' | 'isotipo'
export type LogoTheme = 'light' | 'dark'

type LogoMeta = {
  src: string
  width: number
  height: number
}

const LOGO_META: Record<LogoVariant, Record<LogoTheme, LogoMeta>> = {
  horizontal: {
    light: { src: '/images/nodus-logo-horizontal.png', width: 2000, height: 529 },
    dark: { src: '/images/nodus-logo-primary.png', width: 2000, height: 2373 },
  },
  isotipo: {
    light: { src: '/images/nodus-isotipo.png', width: 2000, height: 2000 },
    dark: { src: '/images/nodus-isotipo-blanco.png', width: 2000, height: 2250 },
  },
}

const DEFAULT_SIZES: Record<LogoVariant, string> = {
  horizontal: '160px',
  isotipo: '(min-width: 640px) 288px, 224px',
}

type LogoProps = {
  variant?: LogoVariant
  theme?: LogoTheme
  preload?: boolean
  unoptimized?: boolean
  className?: string
  sizes?: string
}

export function Logo({
  variant = 'horizontal',
  theme = 'light',
  preload = false,
  unoptimized = false,
  className,
  sizes,
}: LogoProps) {
  const { src, width, height } = LOGO_META[variant][theme]

  return (
    <Image
      src={src}
      alt="nodus: digital strategy"
      width={width}
      height={height}
      preload={preload}
      loading={preload ? 'eager' : undefined}
      fetchPriority={preload ? 'high' : undefined}
      unoptimized={unoptimized}
      sizes={sizes ?? DEFAULT_SIZES[variant]}
      className={cn('h-auto w-auto', className)}
    />
  )
}
