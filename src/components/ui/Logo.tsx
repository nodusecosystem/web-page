import { HorizontalLogo } from '@/components/ui/brand/HorizontalLogo'
import { IsotipoLogo } from '@/components/ui/brand/IsotipoLogo'
import { cn } from '@/lib/cn'

export type LogoVariant = 'horizontal' | 'isotipo'
export type LogoTheme = 'light' | 'dark'

type LogoProps = {
  variant?: LogoVariant
  theme?: LogoTheme
  className?: string
}

export function Logo({ variant = 'horizontal', theme = 'light', className }: Readonly<LogoProps>) {
  const classes = cn('h-auto w-auto', className)

  if (variant === 'isotipo') {
    return <IsotipoLogo theme={theme} className={classes} />
  }

  return <HorizontalLogo theme={theme} className={classes} />
}
