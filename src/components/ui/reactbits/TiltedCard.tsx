'use client'

import { useEffect, useRef, type CSSProperties, type MouseEvent, type ReactNode } from 'react'
import { createSpringAnimator, type SpringConfig } from '@/lib/spring'
import { useIsMobile } from '@/lib/use-mobile'

type TiltedCardProps = {
  imageSrc: string
  altText?: string
  containerHeight?: CSSProperties['height']
  containerWidth?: CSSProperties['width']
  imageHeight?: CSSProperties['height']
  imageWidth?: CSSProperties['width']
  scaleOnHover?: number
  rotateAmplitude?: number
  overlayContent?: ReactNode
}

// Mismos parámetros que el useSpring de framer-motion de la versión original.
const SPRING: SpringConfig = { stiffness: 100, damping: 30, mass: 2 }
const ROTATE_X = 0
const ROTATE_Y = 1
const SCALE = 2

/** Mismo formato que framer-motion: omite los valores por defecto y usa `none` en reposo. */
function toTransform(rotateX: number, rotateY: number, scale: number): string {
  const parts = [
    scale === 1 ? '' : `scale(${scale})`,
    rotateX === 0 ? '' : `rotateX(${rotateX}deg)`,
    rotateY === 0 ? '' : `rotateY(${rotateY}deg)`,
  ].filter(Boolean)
  return parts.length ? parts.join(' ') : 'none'
}

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  overlayContent = null,
}: Readonly<TiltedCardProps>) {
  const ref = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const animatorRef = useRef<ReturnType<typeof createSpringAnimator> | null>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const animator = createSpringAnimator([0, 0, 1], SPRING, ([rotateX, rotateY, scale]) => {
      if (innerRef.current) innerRef.current.style.transform = toTransform(rotateX, rotateY, scale)
    })
    animatorRef.current = animator
    return () => animator.stop()
  }, [])

  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={altText}
      className={
        isMobile
          ? 'absolute top-0 left-0 rounded-[15px] object-cover'
          : 'absolute top-0 left-0 rounded-[15px] object-cover will-change-transform [transform:translateZ(0)]'
      }
      style={{ width: imageWidth, height: imageHeight }}
    />
  )

  if (isMobile) {
    return (
      <figure
        className="relative flex h-full w-full flex-col items-center justify-center"
        style={{ height: containerHeight, width: containerWidth }}
      >
        <div className="relative h-full w-full">
          {image}
          {overlayContent ? (
            <div className="absolute top-0 left-0 z-[2] h-full w-full">{overlayContent}</div>
          ) : null}
        </div>
      </figure>
    )
  }

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const offsetX = event.clientX - rect.left - rect.width / 2
    const offsetY = event.clientY - rect.top - rect.height / 2
    animatorRef.current?.set(ROTATE_X, (offsetY / (rect.height / 2)) * -rotateAmplitude)
    animatorRef.current?.set(ROTATE_Y, (offsetX / (rect.width / 2)) * rotateAmplitude)
  }

  const handleMouseEnter = () => animatorRef.current?.set(SCALE, scaleOnHover)

  const handleMouseLeave = () => {
    animatorRef.current?.set(SCALE, 1)
    animatorRef.current?.set(ROTATE_X, 0)
    animatorRef.current?.set(ROTATE_Y, 0)
  }

  return (
    <figure
      ref={ref}
      className="relative flex h-full w-full flex-col items-center justify-center [perspective:800px]"
      style={{ height: containerHeight, width: containerWidth }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={innerRef}
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={{ width: imageWidth, height: imageHeight, transform: 'none' }}
      >
        {image}
        {overlayContent ? (
          <div className="absolute top-0 left-0 z-[2] h-full w-full will-change-transform [transform:translateZ(30px)]">
            {overlayContent}
          </div>
        ) : null}
      </div>
    </figure>
  )
}
