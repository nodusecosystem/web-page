'use client'

import type { ReactNode } from 'react'
import SpecularButton from '@/components/ui/reactbits/SpecularButton'

export type ButtonVariant = 'solid' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const BUTTON_SPECS: Record<
  ButtonVariant,
  { tintOpacity: number; lineColor: string; textColor: string; tint: string; blur: number }
> = {
  solid: {
    tint: '#5BC7D0',
    tintOpacity: 1,
    lineColor: '#ffffff',
    textColor: '#000F13',
    blur: 0,
  },
  outline: {
    tint: '#000F13',
    tintOpacity: 0.35,
    lineColor: '#5BC7D0',
    textColor: '#5BC7D0',
    blur: 5,
  },
  ghost: {
    tint: '#000F13',
    tintOpacity: 0.2,
    lineColor: '#5BC7D0',
    textColor: '#000F13',
    blur: 5,
  },
}

type ButtonProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
}

export function Button({
  children,
  variant = 'solid',
  size = 'md',
  className,
  href,
  type,
  disabled,
  onClick,
}: Readonly<ButtonProps>) {
  const spec = BUTTON_SPECS[variant]

  return (
    <SpecularButton
      size={size}
      href={href}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
      radius={999}
      blur={spec.blur}
      tint={spec.tint}
      tintOpacity={spec.tintOpacity}
      lineColor={spec.lineColor}
      textColor={spec.textColor}
      baseColor={spec.lineColor}
      intensity={3}
      thickness={1.4}
      autoAnimate
      glass
    >
      {children}
    </SpecularButton>
  )
}
