import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  /** Posición en su grid para la cascada; el grid fija `--reveal-cols` por breakpoint. */
  index?: number
}

/**
 * Aparece al entrar en pantalla, ligado al scroll (`.scroll-reveal` en
 * globals.css). Solo CSS: el contenido llega visible en el HTML.
 */
export function ScrollReveal({ children, className, index }: Readonly<ScrollRevealProps>) {
  return (
    <div
      className={cn('scroll-reveal', className)}
      style={index ? ({ '--reveal-index': index } as CSSProperties) : undefined}
    >
      {children}
    </div>
  )
}
