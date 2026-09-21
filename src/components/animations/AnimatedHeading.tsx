'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, type CSSProperties } from 'react'
import { useIsMobile } from '@/lib/use-mobile'
import { cn } from '@/lib/cn'

const StrokeText = dynamic(() => import('@/components/ui/reactbits/StrokeText'), {
  ssr: false,
})

const LINE_HEIGHT_RATIO = 1.3

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
  const [isClient, setIsClient] = useState(false)
  const alignClass = align === 'center' ? 'text-center' : 'text-left'
  const fillColor = dark ? '#000F13' : '#ffffff'
  const lineHeight = Math.round(fontSize * LINE_HEIGHT_RATIO)
  const lines = [line1, line2, line3]
    .filter(Boolean)
    .flatMap((part) => (part ?? '').split('\n'))
    .map((part) => part.trim())
    .filter(Boolean)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true)
  }, [])

  if (lines.length === 0) return null

  if (isMobile) {
    return (
      <span className={cn('block', className)}>
        {lines.map((line, index) => (
          <span key={`${line}-${index}`} className="block">
            {line}
          </span>
        ))}
      </span>
    )
  }

  if (!isClient) {
    return (
      <span className={cn('block', className)}>
        {lines.map((line, index) => (
          <span
            key={`${line}-${index}`}
            className="block overflow-visible md:h-[var(--heading-line-height)]"
            style={{ '--heading-line-height': `${lineHeight}px` } as CSSProperties}
          >
            {line}
          </span>
        ))}
      </span>
    )
  }

  return (
    <>
      {lines.map((line, index) => (
        <span
          key={`${line}-${index}`}
          className="block overflow-visible"
          style={{ minHeight: lineHeight }}
        >
          <StrokeText
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
        </span>
      ))}
    </>
  )
}
