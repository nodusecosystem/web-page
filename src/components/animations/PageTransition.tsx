import { ViewTransition } from 'react'
import type { ReactNode } from 'react'

type PageTransitionProps = {
  children: ReactNode
}

/**
 * Transición de página (View Transitions API vía React): un panel dark con
 * borde diagonal cruza la pantalla y descubre la página nueva. Sin soporte
 * del navegador la navegación ocurre con normalidad, sin animación.
 *
 * El contenido va primero y debe ser el primer hijo de <main> para que
 * enter/exit se activen; el panel es un hermano cuyo grupo se anima desde
 * globals.css y queda oculto en reposo tras el main opaco. El panel
 * persiste entre páginas (React reutiliza el nodo), así que su barrido se
 * declara en `default`; `share` solo aplicaría si se remontara.
 */
export function PageTransition({ children }: Readonly<PageTransitionProps>) {
  return (
    <>
      <ViewTransition enter="page-wipe" exit="page-wipe" default="none">
        {children}
      </ViewTransition>
      <ViewTransition name="page-wipe-panel" share="page-wipe-sweep" default="page-wipe-sweep">
        <div aria-hidden className="page-wipe-panel" />
      </ViewTransition>
    </>
  )
}
