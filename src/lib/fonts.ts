import localFont from 'next/font/local'

const modica = localFont({
  src: '../styles/fonts/modica-medium.ttf',
  weight: '500',
  variable: '--font-modica',
  display: 'swap',
})

const century = localFont({
  src: '../styles/fonts/Century-Gothic.ttf',
  weight: '400',
  variable: '--font-century',
  display: 'swap',
})

/** Clases que exponen las fuentes de marca como variables CSS (`font-sans`, `font-display`). */
export const fontVariables = `${modica.variable} ${century.variable}`
