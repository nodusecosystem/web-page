import localFont from 'next/font/local'

// WOFF2 generados desde los TTF de marca con fonttools, conservando hinting y
// nombres de glifo (`--hinting --glyph-names`): sin ellos macOS desplaza el
// texto una fracción de píxel.
// Century Gothic va subseteada a latín (U+0000-017F, puntuación general, €,
// ™ y flechas): la web es es/en y el TTF traía griego y cirílico sin uso.
// Modica solo contiene ASCII; las tildes caen en Century Gothic.
const modica = localFont({
  src: '../styles/fonts/modica-medium.woff2',
  weight: '500',
  variable: '--font-modica',
  display: 'swap',
})

const century = localFont({
  src: '../styles/fonts/century-gothic-latin.woff2',
  weight: '400',
  variable: '--font-century',
  display: 'swap',
})

/** Clases que exponen las fuentes de marca como variables CSS (`font-sans`, `font-display`). */
export const fontVariables = `${modica.variable} ${century.variable}`
