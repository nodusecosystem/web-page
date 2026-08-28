'use client'

import type { ComponentPropsWithoutRef } from 'react'
import BorderGlow from '@/components/ui/reactbits/BorderGlow'
import GlassSurface from '@/components/ui/reactbits/GlassSurface'
import { cn } from '@/lib/cn'
import { useIsMobile } from '@/lib/use-mobile'

export type CardVariant = 'default' | 'bordered' | 'elevated' | 'glass'

type CardVariantSpec = {
  inner: string
  glowBackground: string
  colors: string[]
  glowIntensity: number
  fillOpacity: number
  dark: boolean
}

const LIGHT_SPEC: Omit<CardVariantSpec, 'inner'> = {
  glowBackground: 'transparent',
  colors: ['#5BC7D0', '#000F13', '#5BC7D0'],
  glowIntensity: 1.3,
  fillOpacity: 0.8,
  dark: false,
}

const VARIANT_SPECS: Record<CardVariant, CardVariantSpec> = {
  default: { inner: 'text-dark', ...LIGHT_SPEC },
  bordered: { inner: 'text-dark', ...LIGHT_SPEC },
  elevated: { inner: 'text-dark', ...LIGHT_SPEC },
  glass: {
    inner: 'text-white',
    glowBackground: '#000F13',
    colors: ['#5BC7D0', '#ffffff', '#5BC7D0'],
    glowIntensity: 0.9,
    fillOpacity: 0.5,
    dark: true,
  },
}

type CardProps = ComponentPropsWithoutRef<'div'> & {
  variant?: CardVariant
}

export function Card({ variant = 'default', className, ...rest }: CardProps) {
  const variantSpec = VARIANT_SPECS[variant]
  const isMobile = useIsMobile()
  const glassSurface = (
    <GlassSurface
      dark={variantSpec.dark}
      borderRadius={16}
      opacity={0.92}
      blur={10}
      displace={4}
      distortionScale={-70}
      brightness={variantSpec.dark ? 60 : 88}
      backgroundOpacity={
        isMobile
          ? variantSpec.dark
            ? 0.85
            : 0.7
          : variantSpec.dark
            ? 0.25
            : 0.35
      }
      borderWidth={0.05}
    >
      <div className={cn('h-full w-full rounded-2xl p-6', variantSpec.inner, className)} {...rest} />
    </GlassSurface>
  )

  if (isMobile) {
    return <div className="h-full rounded-2xl">{glassSurface}</div>
  }

  return (
    <BorderGlow
      className="h-full"
      backgroundColor={variantSpec.glowBackground}
      colors={variantSpec.colors}
      glowColor="185 55 59"
      borderRadius={16}
      glowIntensity={variantSpec.glowIntensity}
      fillOpacity={variantSpec.fillOpacity}
    >
      {glassSurface}
    </BorderGlow>
  )
}
