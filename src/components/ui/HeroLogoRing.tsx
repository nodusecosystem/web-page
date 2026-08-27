'use client'

import SpecularButton from '@/components/ui/reactbits/SpecularButton'
import { useIsMobile } from '@/lib/use-mobile'

export function HeroLogoRing() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div
        aria-hidden
        className="absolute inset-6 rounded-full border border-white/50 bg-dark/30 backdrop-blur"
      />
    )
  }

  return (
    <SpecularButton
      as="div"
      size="none"
      radius={999}
      tint="#000F13"
      tintOpacity={0.3}
      blur={3}
      lineColor="#5BC7D0"
      baseColor="#5BC7D0"
      intensity={10}
      className="pointer-events-none"
      style={{ position: 'absolute', top: 24, right: 24, bottom: 24, left: 24 }}
    />
  )
}
