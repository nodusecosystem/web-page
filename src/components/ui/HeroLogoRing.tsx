'use client'

import GlassSurface from '@/components/ui/reactbits/GlassSurface'
import SpecularButton from '@/components/ui/reactbits/SpecularButton'
import { useIsMobile } from '@/lib/use-mobile'

export function HeroLogoRing() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div
        aria-hidden
        className="absolute inset-6 rounded-full border border-white/10 bg-dark/80 backdrop-blur"
      />
    )
  }

  return (
    <div aria-hidden className="pointer-events-none absolute top-6 right-6 bottom-6 left-6">
      <GlassSurface
        dark
        borderRadius={999}
        className="z-0 h-full w-full"
        opacity={0.1}
        blur={4}
        displace={8}
        distortionScale={-120}
        brightness={60}
        backgroundOpacity={0.2}
        borderWidth={0.6}
      />
      <SpecularButton
        as="div"
        size="none"
        radius={999}
        tint="#000F13"
        tintOpacity={0}
        blur={0}
        lineColor="#5BC7D0"
        baseColor="#5BC7D0"
        intensity={10}
        className="pointer-events-none"
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 1 }}
      />
    </div>
  )
}
