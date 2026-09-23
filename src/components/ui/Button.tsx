'use client'

import type { ReactNode } from 'react'
import {
  GlassButton,
  type GlassButtonSize,
  type GlassButtonVariant,
} from '@/components/ui/GlassButton'

export type ButtonVariant = GlassButtonVariant
export type ButtonSize = GlassButtonSize

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
  return (
    <GlassButton
      variant={variant}
      size={size}
      className={className}
      href={href}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </GlassButton>
  )
}
