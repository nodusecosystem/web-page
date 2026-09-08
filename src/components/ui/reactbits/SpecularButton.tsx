'use client';

import dynamic from 'next/dynamic';
import { useRef, type CSSProperties, type ReactNode, type MouseEventHandler, type Ref } from 'react';
import { useReducedMotion } from 'framer-motion';
import GlassSurface from '@/components/ui/reactbits/GlassSurface';
import { useIsMobile } from '@/lib/use-mobile';

const SpecularFx = dynamic(() => import('@/components/ui/reactbits/SpecularFx'), {
  ssr: false,
});

type ButtonSize = 'sm' | 'md' | 'lg' | 'none';

export interface SpecularButtonProps {
  children?: ReactNode;
  size?: ButtonSize;
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  as?: 'nav' | 'div';
  ariaLabel?: string;
  glass?: boolean;
  style?: CSSProperties;
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'text-[0.85rem] px-[22px] py-[10px]',
  md: 'text-[1rem] px-[30px] py-[14px]',
  lg: 'text-[1.15rem] px-10 py-[18px]',
  none: ''
};

const SpecularButton = ({
  children,
  size = 'lg',
  radius = 18,
  tint = '#5BC7D0',
  tintOpacity = 1,
  blur = 0,
  textColor = '#000F13',
  lineColor = '#ffffff',
  baseColor = '#5BC7D0',
  intensity = 1,
  shineSize = 10,
  shineFade = 40,
  thickness = 1,
  speed = 0.35,
  followMouse = true,
  proximity = 250,
  autoAnimate = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  href,
  as,
  ariaLabel,
  glass = false,
  style: styleProp
}: SpecularButtonProps) => {
  const btnRef = useRef<HTMLElement>(null);
  const fxRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const btnClasses = `relative m-0 flex flex-row cursor-pointer items-center justify-center gap-2 whitespace-nowrap border-none font-medium leading-none tracking-[0.01em] outline-none transition-transform duration-150 active:scale-[0.97] disabled:cursor-default disabled:opacity-55 disabled:active:scale-100 text-center [color:var(--sb-text-color)] [border-radius:var(--sb-radius)] [background:color-mix(in_srgb,var(--sb-tint)_calc(var(--sb-tint-opacity)*100%),transparent)] [backdrop-filter:blur(var(--sb-blur))] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.04),0_8px_24px_rgb(7_25_25_/_0.25)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-teal-light ${size === 'none' ? '' : SIZES[size] ?? SIZES.md}${className ? ` ${className}` : ''}`;
  const btnStyle = {
    '--sb-radius': `${radius}px`,
    '--sb-tint': tint,
    '--sb-tint-opacity': tintOpacity,
    '--sb-blur': `${blur}px`,
    '--sb-text-color': textColor
  } as CSSProperties;

  const fxLayer = (
    <>
      {glass ? (
        <GlassSurface
          dark
          borderRadius={radius}
          className="pointer-events-none z-0"
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
          opacity={0.9}
          blur={12}
          displace={5}
          distortionScale={-90}
          brightness={60}
          borderWidth={0.06}
        />
      ) : null}
      {!isMobile ? (
        <span ref={fxRef} aria-hidden="true" className="pointer-events-none absolute -inset-5 z-1 [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full" />
      ) : null}
      {!isMobile && !reduceMotion ? (
        <SpecularFx
          btnRef={btnRef}
          fxRef={fxRef}
          radius={radius}
          lineColor={lineColor}
          baseColor={baseColor}
          intensity={intensity}
          shineSize={shineSize}
          shineFade={shineFade}
          thickness={thickness}
          speed={speed}
          followMouse={followMouse}
          proximity={proximity}
          autoAnimate={autoAnimate}
        />
      ) : null}
    </>
  );
  const content = (
    <span className="relative z-2 flex flex-row items-center justify-center gap-2 whitespace-nowrap">
      {children}
    </span>
  );

  const shared = {
    className: btnClasses,
    style: { ...btnStyle, ...styleProp } as CSSProperties,
    'aria-label': ariaLabel,
  };

  if (href) {
    return (
      <a ref={btnRef as Ref<HTMLAnchorElement>} href={href} onClick={onClick} {...shared}>
        {fxLayer}
        {content}
      </a>
    );
  }

  if (as === 'nav') {
    return (
      <nav ref={btnRef} onClick={onClick} {...shared}>
        {fxLayer}
        {content}
      </nav>
    );
  }

  if (as === 'div') {
    return (
      <div ref={btnRef as Ref<HTMLDivElement>} onClick={onClick} {...shared}>
        {fxLayer}
        {content}
      </div>
    );
  }

  return (
    <button
      ref={btnRef as Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={btnClasses}
      style={{ ...btnStyle, ...styleProp } as CSSProperties}
    >
      {fxLayer}
      {content}
    </button>
  );
};

export default SpecularButton;
