import type { CSSProperties, ReactNode } from 'react'

export interface GlassSurfaceProps {
  children?: ReactNode
  width?: number | string
  height?: number | string
  borderRadius?: number
  /** Desenfoque del fondo en px */
  blur?: number
  dark?: boolean
  backgroundOpacity?: number
  saturation?: number
  className?: string
  style?: CSSProperties
}

const DARK_SHADOW = `0 0 2px 1px color-mix(in oklch, white, transparent 65%) inset,
  0 0 10px 4px color-mix(in oklch, white, transparent 85%) inset,
  0 4px 16px rgb(0 15 19 / 0.18),
  0 16px 56px rgb(0 15 19 / 0.12)`

const LIGHT_SHADOW = `0 0 2px 1px rgb(0 15 19 / 0.05) inset,
  0 0 10px 4px rgb(0 15 19 / 0.02) inset,
  0 4px 16px rgb(0 15 19 / 0.08),
  0 16px 56px rgb(0 15 19 / 0.05)`

const toLength = (value: number | string) => (typeof value === 'number' ? `${value}px` : value)

/**
 * Vidrio esmerilado solo con CSS. Sustituye a la refracción con filtro SVG
 * por tarjeta: sobre fondos lisos se veía igual y costaba GPU en cada frame.
 */
export default function GlassSurface({
  children,
  width = '100%',
  height = '100%',
  borderRadius = 20,
  blur = 4,
  dark = false,
  backgroundOpacity = 0,
  saturation = 1,
  className = '',
  style = {},
}: Readonly<GlassSurfaceProps>) {
  const backdropFilter = `blur(${blur}px) saturate(${saturation})`

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden transition-opacity duration-[260ms] ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-light ${className}`}
      style={{
        ...style,
        width: toLength(width),
        height: toLength(height),
        borderRadius: `${borderRadius}px`,
        background: dark
          ? `rgb(0 15 19 / ${backgroundOpacity})`
          : `rgb(255 255 255 / ${backgroundOpacity})`,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        boxShadow: dark ? DARK_SHADOW : LIGHT_SHADOW,
      }}
    >
      {children ? (
        <div className="relative z-10 flex h-full w-full items-center justify-center rounded-[inherit]">
          {children}
        </div>
      ) : null}
    </div>
  )
}
