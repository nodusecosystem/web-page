'use client'

import Link from 'next/link'
import { useRef, type MouseEvent, type ReactNode, type Ref } from 'react'
import { cn } from '@/lib/cn'
import { useGlassPointer } from '@/lib/use-glass-pointer'

export type GlassButtonVariant = 'solid' | 'outline' | 'ghost'
export type GlassButtonSize = 'sm' | 'md' | 'lg'

type GlassButtonProps = {
  children: ReactNode
  variant?: GlassButtonVariant
  size?: GlassButtonSize
  className?: string
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
  ariaLabel?: string
}

const RIPPLE_DURATION_MS = 650
const MAX_TILT_DEG = 9

/**
 * Filtro SVG de refracción que usan los botones en `backdrop-filter`.
 * Montar una sola vez cerca de la raíz (layout); no pinta nada.
 */
export function GlassFilterDefs() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute overflow-hidden">
      <defs>
        <filter id="glass-distortion" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.009 0.009"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="3" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale="34"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}

export function GlassButton({
  children,
  variant = 'solid',
  size = 'md',
  className,
  href,
  type = 'button',
  disabled = false,
  onClick,
  ariaLabel,
}: Readonly<GlassButtonProps>) {
  const ref = useRef<HTMLElement>(null)
  const { handlePointerMove, handlePointerLeave } = useGlassPointer(ref, { tilt: MAX_TILT_DEG })

  const spawnRipple = (event: MouseEvent<HTMLElement>) => {
    const node = ref.current
    if (!node || event.detail === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = node.getBoundingClientRect()
    const diameter = Math.max(rect.width, rect.height) * 1.3
    const ripple = document.createElement('span')
    ripple.className = 'glass-btn-ripple'
    ripple.style.width = `${diameter}px`
    ripple.style.height = `${diameter}px`
    ripple.style.left = `${event.clientX - rect.left}px`
    ripple.style.top = `${event.clientY - rect.top}px`
    node.appendChild(ripple)
    window.setTimeout(() => ripple.remove(), RIPPLE_DURATION_MS)
  }

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (disabled) return
    spawnRipple(event)
    onClick?.()
  }

  const classes = cn(
    'glass-surface',
    'glass-btn',
    `variant-${variant}`,
    `size-${size}`,
    className,
  )
  const label = <span className="glass-btn-label">{children}</span>

  if (href) {
    const anchorProps = {
      className: classes,
      'aria-label': ariaLabel,
      onClick: handleClick,
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave,
    }

    if (href.startsWith('/')) {
      return (
        <Link ref={ref as Ref<HTMLAnchorElement>} href={href} {...anchorProps}>
          {label}
        </Link>
      )
    }

    return (
      <a ref={ref as Ref<HTMLAnchorElement>} href={href} {...anchorProps}>
        {label}
      </a>
    )
  }

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
      onClick={handleClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {label}
    </button>
  )
}
