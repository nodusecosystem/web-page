'use client'

import StrokeText from '@/components/ui/reactbits/StrokeText'
import ShinyText from '@/components/ui/reactbits/ShinyText'
import { useIsMobile } from '@/lib/use-mobile'
import { cn } from '@/lib/cn'

type AnimatedHeadingProps = {
  line1: string
  line2?: string
  line3?: string
  fontSize: number
  className?: string
  dark?: boolean
  align?: 'left' | 'center'
}

export function AnimatedHeading({
  line1,
  line2,
  line3,
  fontSize,
  className,
  dark = false,
  align = 'left',
}: Readonly<AnimatedHeadingProps>) {
  const isMobile = useIsMobile()
  const alignClass = align === 'center' ? 'text-center' : 'text-left'
  const fillColor = dark ? '#000F13' : '#ffffff'
  const lines = [line1, line2, line3]
    .filter(Boolean)
    .flatMap((part) => (part ?? '').split('\n'))
    .map((part) => part.trim())
    .filter(Boolean)

  if (lines.length === 0) return null

  if (isMobile) {
    return (
      <span className={cn('block', className)}>
        {lines.map((line, index) => (
          <ShinyText
            key={`${line}-${index}`}
            text={line}
            color={fillColor}
            shineColor="#5BC7D0"
            speed={2}
            spread={120}
            direction="left"
          />
        ))}
      </span>
    )
  }

  return (
    <>
      {lines.map((line, index) => (
        <StrokeText
          key={`${line}-${index}`}
          text={line}
          strokeColor="#5BC7D0"
          fillColor={fillColor}
          strokeWidth={1.4}
          fontSize={fontSize}
          letterSpacing={-3}
          fontWeight={800}
          drawDuration={1.4}
          fillDelay={0.35 + index * 0.2}
          stagger={0.03}
          trigger="mount"
          fillMode="wipe"
          className={cn('block', alignClass)}
        />
      ))}
    </>
  )
}
